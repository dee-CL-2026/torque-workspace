# Candid Metric to Raw Data Mapping

*Generated: 2026-02-07*

---

## Executive Summary

Candid tracks **184 metrics** across 7 major categories, flowing from **12 raw data sources** through **3 core databases** into Looker dashboards. This document maps each metric category to its underlying raw data sources and transformation pipeline.

---

## Data Architecture Overview

```
RAW DATA (VA Input)          DATABASES              LOOKER DATA SOURCES
┌─────────────────────┐     ┌──────────────────┐    ┌─────────────────────────┐
│ Xero Exports        │     │                  │    │                         │
│ ├─ RECEIVABLE_      │────▶│   SALES DB       │───▶│ Sales_Looker.           │
│ │   DETAIL_RAW      │     │   (32K rows)     │    │ ├─ sales_volume         │
│ ├─ PAYABLE_         │     │                  │    │ ├─ sales_revenue        │
│ │   DETAIL_RAW      │     ├──────────────────┤    │ ├─ sales_pricing        │
│ ├─ AGED_            │────▶│                  │───▶│ ├─ customer_accounts    │
│ │   RECEIVABLES_RAW │     │  PRODUCTION DB   │    │ ├─ customer_channels    │
│ └─ AGED_            │     │   (68K rows)     │    │ └─ sku_analysis         │
│     PAYABLES_RAW    │     │                  │    │                         │
├─────────────────────┤     ├──────────────────┤    │ Production_Looker.      │
│ KMI Production      │     │                  │    │ ├─ production_volume    │
│ ├─ KMI_PACKAGING_   │────▶│                  │───▶│ ├─ production_efficiency│
│ │   RAW (13K rows)  │     │                  │    │ ├─ inventory_status     │
│ ├─ KMI_TAB-CLUB-RAW │     │                  │    │ ├─ inventory_movement   │
│ ├─ KMI_TAB-         │     │                  │    │ └─ operations           │
│ │   IMPERIAL-RAW    │     │                  │    │                         │
│ ├─ KMI_TAB-         │     │                  │    │ Finance_Looker.         │
│ │   GINGER-RAW      │     │                  │    │ ├─ costs_cogs           │
│ └─ KMI_RM_RAW       │     │                  │    │ ├─ margins              │
├─────────────────────┤     │                  │    │ ├─ profitability        │
│ Cash Position       │────▶│                  │───▶│ ├─ cash_position        │
│ └─ Cash in Hand     │     │                  │    │ ├─ ar_aging             │
├─────────────────────┤     ├──────────────────┤    │ └─ ap_aging             │
│ Config/Mapping      │     │                  │    │                         │
│ └─ CONFIG_MAPPING   │────▶│   SALES TOOLS    │    │ Task_Management.        │
└─────────────────────┘     │   (3K rows)      │    │ └─ task_list            │
                            └──────────────────┘    └─────────────────────────┘
```

---

## Category 1: Sales - Volume (M001-M014)

### Metrics Tracked
| ID | Metric | Chart Type | Priority | Phase |
|----|--------|------------|----------|-------|
| M001 | Total Cases Sold (All-time) | Scorecard | Must-Have | Later |
| M002 | Total Cases Sold (YTD) | Scorecard | Must-Have | 1 |
| M003 | Total Cases Sold (MTD) | Scorecard | Must-Have | 2 |
| M004 | Total Cases Sold (WTD) | Scorecard | Nice-to-Have | Later |
| M005 | Total Cases by SKU | Bar Chart | Must-Have | 2 |
| M006 | Total Cases by Channel | Bar Chart | Must-Have | 2 |
| M007 | Total Cases by Market | Bar Chart | Nice-to-Have | Later |
| M008 | Total Cases by Distributor | Bar Chart | Nice-to-Have | Later |
| M009 | Total Cases by Account (Top 10) | Bar Chart | Nice-to-Have | Later |
| M010 | Cases Sold - Daily Trend | Line Chart | Nice-to-Have | Later |
| M011 | Cases Sold - Weekly Trend | Line Chart | Nice-to-Have | Later |
| M012 | Cases Sold - Monthly Trend | Line Chart | Must-Have | 2 |
| M013 | Cases Growth Rate (MoM) | Line Chart | Must-Have | 2 |
| M014 | Cases Growth Rate (YoY) | Line Chart | Nice-to-Have | Later |

### Raw Data Sources → Transformation → Final Table

```
RAW SOURCE                    CLEANED/TRANSFORMED           FINAL TABLE
─────────────────────────────────────────────────────────────────────────
Xero: RECEIVABLE_DETAIL_RAW   RECEIVABLE_DETAIL_CLEAN      SALES_REVENUE_MASTER
(1,548 rows)                  (999 rows)                   (426 rows)
                              ↓                            ↓
Fields:                       Fields:                      Fields:
- Invoice Number              - Invoice_Date               - Transaction_ID
- Invoice Date                - Customer_Name              - Invoice_Date
- Item Code                   - Invoice_Number             - SKU_Name
- Description                 - Line_Description           - Quantity_Cases ← KEY
- Quantity ← RAW QTY          - Item_Code                  - Quantity_Cans
- Unit Price                  - Quantity ← cleaned         - Market
- Gross Amount                                             - Channel
                                                           - Distributor_Name
                                                           - Account_ID
─────────────────────────────────────────────────────────────────────────
Also: ACCOUNT_TRACKING (9,627 rows) - transaction-level detail for drill-downs
```

**Key Calculation:**
- `Quantity_Cases = Quantity_Cans / 24`

### Supporting Config
| Config Table | Purpose |
|--------------|---------|
| CONFIG_MAPPING (593 rows) | Maps Raw_Value → Market, City, Channel, Distributor |
| CONFIG_CONSTANTS (65 rows) | Dropdown values, parameters |

---

## Category 2: Sales - Revenue (M015-M032)

### Metrics Tracked
| ID | Metric | Chart Type | Priority |
|----|--------|------------|----------|
| M016 | Total Revenue (YTD) | Scorecard | Must-Have |
| M017 | Total Revenue (MTD) | Scorecard | Must-Have |
| M019 | Revenue by SKU | Donut Chart | Must-Have |
| M020 | Revenue by Channel | Donut Chart | Must-Have |
| M025 | Revenue - Monthly Trend | Line Chart | Must-Have |
| M026 | Revenue Growth Rate (MoM) | Line Chart | Must-Have |
| M032 | Revenue Mix % (SKU Breakdown) | Donut Chart | Must-Have |

### Raw Data Sources → Final Table

```
PRIMARY SOURCE               TRANSFORMATION              FINAL FIELD
──────────────────────────────────────────────────────────────────────
RECEIVABLE_DETAIL_RAW        cleanReceivableDetailRaw()  
├─ Gross Amount (Source)     → rebuildSalesRevenue       SALES_REVENUE_MASTER
├─ Invoice Total (Source)      MasterFromReceivables()   ├─ Invoice_Value_IDR
└─ Quantity × Unit Price                                 └─ Revenue_IDR

Pre-aggregated:
DECK_METRICS (1,000 rows)
├─ Total_Revenue
├─ Revenue_vs_Prev_Mo_Pct
├─ Revenue_vs_Last_Year_Pct
└─ Gross_Margin_Pct
```

---

## Category 3: Customer - Accounts (M039-M050)

### Metrics Tracked
| ID | Metric | Chart Type | Priority |
|----|--------|------------|----------|
| M039 | Total Outlets (Count) | Scorecard | Must-Have |
| M042 | Active Outlets (90 days) | Scorecard | Must-Have |
| M043 | Dormant Accounts (>90 days) | Scorecard | Must-Have |
| M048 | Top 10 Accounts by Volume | Bar Chart | Must-Have |
| M049 | Top 10 Accounts by Revenue | Bar Chart | Must-Have |

### Raw Data Sources → Final Table

```
PRIMARY SOURCES              TRANSFORMATION              FINAL TABLES
──────────────────────────────────────────────────────────────────────
ACCOUNT_TRACKING (9,627)     Account status snapshot     ACCOUNT_STATUS (1,000)
├─ Transaction_ID            ↓                           ├─ Venue_Account_Name
├─ Date_of_Sale             Days_Since_Last_Order =      ├─ First_Order_Date
├─ Venue_Account_Name        TODAY() - Latest_Order      ├─ Latest_Order_Date
├─ Internal_Venue_Name                                   ├─ Days_Since_Last_Order
├─ Product_Name                                          └─ Status (Active/Dormant/Lost)
├─ Quantity_Cases
└─ Revenue_IDR                                           DORMANT_ACCOUNTS (1,000)
                                                         (filtered: >90 days)
CONFIG_MAPPING (593)
├─ Internal_Venue_Name
├─ Market
├─ Channel
└─ Distributor_Name
```

**Business Rules (from CONFIG_CONSTANTS):**
- Active: Days_Since_Last_Order ≤ 90
- Dormant: 90 < Days_Since_Last_Order ≤ 180
- Lost: Days_Since_Last_Order > 180

---

## Category 4: Production - Volume (M065-M075)

### Metrics Tracked
| ID | Metric | Chart Type | Priority | Phase |
|----|--------|------------|----------|-------|
| M066 | Total Cases Produced (YTD) | Scorecard | Must-Have | 3 |
| M067 | Total Cases Produced (MTD) | Scorecard | Must-Have | 3 |
| M069 | Cases Produced by SKU | Bar Chart | Must-Have | 3 |
| M070 | Cases Produced - Daily Trend | Line Chart | Must-Have | 3 |
| M071 | Cases Produced - Monthly Trend | Line Chart | Must-Have | 3 |

### Raw Data Sources → Final Table

```
PRIMARY SOURCES (KMI)        TRANSFORMATION              FINAL TABLES
──────────────────────────────────────────────────────────────────────
KMI_TAB-CLUB-RAW             buildKmiFgBatchClean()      KMI_FG_BATCH_CLEAN
KMI_TAB-IMPERIAL-RAW         ↓                           ├─ SKU_Code
KMI_TAB-GINGER-RAW           Standardize formats         ├─ Batch_ID
                             Parse dates                 ├─ Production_Date
Each contains:               Calculate totals            ├─ Cases_Produced
├─ SERAH TERIMA PRODUK JADI                              └─ Cans_Produced
├─ PO references
└─ Production quantities                                 PRODUCTION_RUNS_CLEAN
                                                         (component-level detail)
──────────────────────────────────────────────────────────────────────
PRODUCTION_RUNS_RAW (1,000)  PRODUCTION_RUNS_KMI
├─ Batch_ID                  (KMI-specific runs)
├─ Production_Date
├─ SKU_Code
├─ Cases_Produced
└─ Cans_Produced
```

---

## Category 5: Inventory - Status (M083-M096)

### Metrics Tracked
| ID | Metric | Chart Type | Priority | Phase |
|----|--------|------------|----------|-------|
| M083 | Current Stock - Total Cases | Scorecard | Must-Have | 1 |
| M084 | Current Stock by SKU | Bar Chart | Must-Have | 3 |
| M086 | Stock Value (IDR) | Scorecard | Must-Have | 3 |
| M087 | Days of Inventory on Hand (by SKU) | Bar Chart | Must-Have | 3 |
| M089 | Low Stock Alerts (<X days) | Table | Must-Have | 3 |

### Raw Data Sources → Final Table

```
PRIMARY SOURCES              TRANSFORMATION              FINAL TABLES
──────────────────────────────────────────────────────────────────────
KMI_PACKAGING_RAW (13,771)   buildKmiFgStockSummary()    KMI_FG_STOCK_SUMMARY
├─ Tanggal (Date)                                        ├─ SKU_Code
├─ Material                                              ├─ Batch_ID
├─ Stock awal (Opening)                                  ├─ Closing_Cases
├─ Masuk (In)                                            └─ Closing_Cans
├─ Pemakaian produksi (Used)
└─ Stock akhir (Closing)                                 STOCK_SUMMARY
                                                         ├─ Snapshot_Date
KMI_PACKAGING_MOVEMENTS                                  ├─ SKU_Code
(20,391 rows)                                            ├─ Opening_Qty
├─ Movement_Date                                         ├─ Purchases_Qty
├─ Material_Code                                         ├─ Production_Qty
├─ Movement_Type                                         └─ Closing_Qty
├─ Qty
├─ Stock_Opening                                         VIZ_Stock_Cover
└─ Stock_Closing                                         (pre-aggregated for decks)

KMI_FG_SHIPMENTS_RAW (1,000) → KMI_FG_SHIPMENTS_CLEAN
├─ Shipment_Date
├─ SKU_Code
├─ Qty_Cases
└─ Destination
```

**Key Calculation:**
- `Days_Inventory = Stock_On_Hand_Cases / Avg_Daily_Sales`

---

## Category 6: Financial - COGS & Margins (M097-M110)

### Metrics Tracked
| ID | Metric | Chart Type | Priority | Phase |
|----|--------|------------|----------|-------|
| M097 | COGS - Total | Scorecard | Must-Have | 4 |
| M098 | COGS by SKU | Bar Chart | Must-Have | 4 |
| M099 | COGS per Case (by SKU) | Bar Chart | Must-Have | 4 |
| M104 | Gross Margin (IDR) | Scorecard | Must-Have | 4 |
| M105 | Gross Margin % | Scorecard | Must-Have | 1 |
| M106 | Gross Margin by SKU | Bar Chart | Must-Have | 4 |

### Raw Data Sources → Final Table

```
PRIMARY SOURCES              TRANSFORMATION              FINAL TABLES
──────────────────────────────────────────────────────────────────────
PAYABLE_DETAIL_RAW (4,037)   cleanPayableDetailRaw()     PAYABLE_DETAIL_CLEAN
├─ Invoice Date              buildPurchasesSummary       ├─ Invoice_Date
├─ Item Code                 FromPayables()              ├─ Supplier_Name
├─ Description                                           ├─ Line_Description
├─ Quantity                                              ├─ Amount_IDR
├─ Unit Price                                            └─ Cost_Category
└─ Gross Amount

CONFIG_BOM_MASTER (1,000)    BATCH_COGS_MASTER (1,000)
├─ SKU_Code                  ├─ Batch_ID
├─ Component_Code            ├─ Production_Date
├─ Quantity_Per_Can          ├─ SKU_Code
└─ UoM                       ├─ Total_COGS_per_can
                             ├─ Can_Cost
COMPONENT_COST_HISTORY       ├─ Box_Cost
(1,264 rows)                 └─ Filling_Cost
├─ Month_Key
├─ Component_Code            SKU_COSTING_MASTER (1,000)
├─ Cumulative_Qty            ├─ SKU_Code
├─ Cumulative_Cost_IDR       ├─ SKU_Name
└─ Cumulative_Avg_Price      └─ Raw_COGS_IDR

COGS_LOOKUP (1,000)          Pre-aggregated:
├─ SKU_Name                  DECK_METRICS
├─ SKU_Code                  └─ Gross_Margin_Pct
└─ Raw_COGS_IDR
```

**Key Calculation:**
- `Gross_Margin = Revenue_IDR - (Quantity_Cases × COGS_per_Case)`
- `Gross_Margin_% = Gross_Margin / Revenue_IDR × 100`

---

## Category 7: Financial - AR/AP (M123-M144)

### Metrics Tracked
| ID | Metric | Chart Type | Priority | Phase |
|----|--------|------------|----------|-------|
| M123 | Total AR Outstanding | Scorecard | Must-Have | 1 |
| M125-M129 | AR Aging Buckets | Scorecards | Must-Have | 4 |
| M130 | AR Aging - % Distribution | Stacked Bar | Must-Have | 4 |
| M132 | Overdue AR (Amount) | Scorecard | Must-Have | 4 |
| M134 | Total AP Outstanding | Scorecard | Must-Have | 4 |
| M136-M140 | AP Aging Buckets | Scorecards | Must-Have | 4 |

### Raw Data Sources → Final Table

```
PRIMARY SOURCES              TRANSFORMATION              FINAL TABLES
──────────────────────────────────────────────────────────────────────
AGED_RECEIVABLES_RAW (1,000) Direct use (pre-bucketed)  AR_AP_SUMMARY
├─ Contact                   from Xero export           ├─ Snapshot_Date
├─ Current                                              ├─ Metric_Type (AR/AP)
├─ < 1 Month                                            ├─ Contact_Name
├─ 1 Month                                              ├─ Bucket_Current
├─ 2 Months                                             ├─ Bucket_LT_1_Month
├─ 3 Months                                             ├─ Bucket_1_Month
├─ Older                                                ├─ Bucket_2_Months
└─ Total                                                ├─ Bucket_3_Months
                                                        └─ Bucket_Older
AGED_PAYABLES_RAW (968)
├─ Contact
├─ Current
├─ < 1 Month
├─ 1-3 Months
├─ Older
└─ Total
```

**Note:** AR/AP aging data comes directly from Xero exports already bucketed by age.

---

## Category 8: Financial - Cash (M115-M122)

### Metrics Tracked
| ID | Metric | Priority | Phase |
|----|--------|----------|-------|
| M115 | Cash on Hand (Current Balance) | Must-Have | 1 |
| M116 | Cash on Hand by Account | Must-Have | Later |

### Raw Data Sources → Final Table

```
PRIMARY SOURCES              LOCATION                    FIELDS
──────────────────────────────────────────────────────────────────────
Cash in Hand                 Sales DB + Production DB    
(snapshots from Xero/bank)   (both have copies)
                             
├─ Snapshot_Date             Direct use
├─ Balance Type
├─ Bank_Name
├─ Currency
└─ Value ← KEY FIELD
```

---

## Summary: Data Source to Metric Category Mapping

| Raw Data Source | Rows | Feeds Into | Metric Categories |
|-----------------|------|------------|-------------------|
| RECEIVABLE_DETAIL_RAW | 1,548 | SALES_REVENUE_MASTER | Sales Volume, Sales Revenue |
| ACCOUNT_TRACKING | 9,627 | ACCOUNT_STATUS, DORMANT | Customer Accounts, Customer Channels |
| AGED_RECEIVABLES_RAW | 1,000 | AR_AP_SUMMARY | Financial AR |
| AGED_PAYABLES_RAW | 968 | AR_AP_SUMMARY | Financial AP |
| PAYABLE_DETAIL_RAW | 4,037 | PAYABLE_DETAIL_CLEAN | Financial COGS |
| KMI_PACKAGING_RAW | 13,771 | KMI_PACKAGING_MOVEMENTS | Inventory Status |
| KMI_PACKAGING_MOVEMENTS | 20,391 | STOCK_SUMMARY | Inventory Movement |
| KMI_TAB-CLUB/IMPERIAL/GINGER | ~1,234 | PRODUCTION_RUNS | Production Volume |
| CONFIG_MAPPING | 593 | All dimension joins | All Sales/Customer metrics |
| Cash in Hand | 1,000 | Direct use | Financial Cash |
| CONFIG_BOM_MASTER | 1,000 | BATCH_COGS_MASTER | Financial COGS |
| COMPONENT_COST_HISTORY | 1,264 | SKU_COSTING_MASTER | Financial Margins |

---

## Metric Priority Summary

| Priority | Count | Examples |
|----------|-------|----------|
| Must-Have Phase 1 | 12 | Revenue YTD, Gross Margin %, Cash on Hand, Total AR |
| Must-Have Phase 2 | 18 | Cases by SKU, Revenue by Channel, Monthly Trends |
| Must-Have Phase 3 | 10 | Production volumes, Inventory by SKU, Low Stock Alerts |
| Must-Have Phase 4 | 22 | COGS breakdown, AR/AP aging buckets, Margins by SKU |
| Nice-to-Have | 60 | Detailed breakdowns, advanced analytics |
| Future | 62 | Operations, Task Management, Profitability |

---

## Gap Analysis

### Data Currently Available ✅
- Sales volume & revenue (SALES_REVENUE_MASTER, ACCOUNT_TRACKING)
- Customer/account metrics (CONFIG_MAPPING, ACCOUNT_STATUS)
- Production volumes (KMI_FG_BATCH_CLEAN, PRODUCTION_RUNS)
- Inventory status (KMI_FG_STOCK_SUMMARY, STOCK_SUMMARY)
- AR/AP aging (AGED_RECEIVABLES/PAYABLES_RAW)
- Cash position (Cash in Hand)
- COGS components (BATCH_COGS_MASTER, SKU_COSTING_MASTER)

### Data Gaps / Future Needs 🔴
- **Task Management (M174-M184)**: No task tracking system connected
- **Operations - Fulfillment (M159-M165)**: Order status tracking not implemented
- **Operations - Quality (M166-M170)**: Returns/complaints not tracked
- **Price Elasticity (M158)**: Requires price variation data
- **Customer Lifetime Value (M064)**: Requires CLV calculation logic
- **Net Profit/EBITDA (M111-M114)**: Full P&L not wired in

---

*Document maintained in: candid/METRIC-DATA-MAPPING.md*

# Candid Mixers - SKU Library

*Generated: 2026-02-07*
*Source: METRIC-DATA-MAPPING.md, Candid Projections 2025.xlsx*

---

## Executive Summary

Candid Mixers operates with **3 core product lines** and multiple variants including exclusive Finns Beach Club SKUs. Products are sold in cases of 24 cans. This document provides the master SKU reference for all Candid products.

---

## SKU Coding Convention

```
Format: [PRODUCT]-[VARIANT]-[PACK]

Examples:
  CS-STD-24    → Club Soda, Standard, 24-pack case
  IMP-FNN-24   → Imperial, Finns variant, 24-pack case
  GIN-STD-24   → Ginger, Standard, 24-pack case
```

**Product Codes:**
| Code | Product |
|------|---------|
| CS | Club Soda |
| IMP | Imperial (Tonic) |
| GIN | Ginger Beer |
| COC | Coconut Water |
| GRT | Green Tea |
| CHI | Chai |
| BBR | Bali Breeze |
| FNB | Finn's Breeze |

**Variant Codes:**
| Code | Variant |
|------|---------|
| STD | Standard |
| FNN | Finns Beach Club Exclusive |

---

## Core Product Lines

### 1. Club Soda (Soda Water)
| SKU Code | Full Name | Pack Size | Category | Notes |
|----------|-----------|-----------|----------|-------|
| CS-STD-24 | Club Soda | 24 × 250ml | Soda Water | Flagship product |
| CS-FNN-24 | Club Soda (Finns) | 24 × 250ml | Soda Water | Finns Beach Club exclusive |

**Aliases:** "Club Soda", "Soda", "CS"
**Production Source:** KMI_TAB-CLUB-RAW

---

### 2. Imperial (Tonic Water)
| SKU Code | Full Name | Pack Size | Category | Notes |
|----------|-----------|-----------|----------|-------|
| IMP-STD-24 | Imperial | 24 × 250ml | Tonic Water | Premium tonic |
| IMP-FNN-24 | Imperial (Finns) | 24 × 250ml | Tonic Water | Finns Beach Club exclusive |

**Aliases:** "Imperial", "Imperio", "Imp"
**Production Source:** KMI_TAB-IMPERIAL-RAW

---

### 3. Ginger (Ginger Beer)
| SKU Code | Full Name | Pack Size | Category | Notes |
|----------|-----------|-----------|----------|-------|
| GIN-STD-24 | Ginger | 24 × 250ml | Ginger Beer | Spiced ginger mixer |
| GIN-FNN-24 | Ginger (Finns) | 24 × 250ml | Ginger Beer | Finns Beach Club exclusive |

**Aliases:** "Ginger", "Ginger Beer", "G"
**Production Source:** KMI_TAB-GINGER-RAW

---

## Extended Product Lines

### Finns Beach Club Exclusive Range
| SKU Code | Full Name | Pack Size | Category | Notes |
|----------|-----------|-----------|----------|-------|
| BBR-FNN-24 | Bali Breeze (Finns) | 24 × 250ml | Specialty | Finns exclusive blend |
| FNB-STD-24 | Finn's Breeze | 24 × 250ml | Specialty | Signature Finns mixer |

---

### Specialty Mixers (Extended Range)
| SKU Code | Full Name | Pack Size | Category | Notes |
|----------|-----------|-----------|----------|-------|
| COC-STD-24 | Coconut Water | 24 × 250ml | Specialty | Natural coconut water |
| GRT-STD-24 | Green Tea | 24 × 250ml | Specialty | Iced green tea mixer |
| CHI-STD-24 | Chai | 24 × 250ml | Specialty | Spiced chai mixer |

---

## Pack Size Reference

| Unit | Description | Conversion |
|------|-------------|------------|
| Can | Single 250ml can | 1 can |
| Case | Standard case | 24 cans |

**Key Formula:**
```
Quantity_Cases = Quantity_Cans / 24
```

---

## SKU Master Table (Complete)

| SKU Code | SKU Name | Category | Pack Size | Cans/Case | Variant | Status |
|----------|----------|----------|-----------|-----------|---------|--------|
| CS-STD-24 | Club Soda | Soda Water | 24 × 250ml | 24 | Standard | Active |
| CS-FNN-24 | Club Soda (Finns) | Soda Water | 24 × 250ml | 24 | Finns | Active |
| IMP-STD-24 | Imperial | Tonic Water | 24 × 250ml | 24 | Standard | Active |
| IMP-FNN-24 | Imperial (Finns) | Tonic Water | 24 × 250ml | 24 | Finns | Active |
| GIN-STD-24 | Ginger | Ginger Beer | 24 × 250ml | 24 | Standard | Active |
| GIN-FNN-24 | Ginger (Finns) | Ginger Beer | 24 × 250ml | 24 | Finns | Active |
| BBR-FNN-24 | Bali Breeze (Finns) | Specialty | 24 × 250ml | 24 | Finns | Active |
| FNB-STD-24 | Finn's Breeze | Specialty | 24 × 250ml | 24 | Standard | Active |
| COC-STD-24 | Coconut Water | Specialty | 24 × 250ml | 24 | Standard | TBD |
| GRT-STD-24 | Green Tea | Specialty | 24 × 250ml | 24 | Standard | TBD |
| CHI-STD-24 | Chai | Specialty | 24 × 250ml | 24 | Standard | TBD |

---

## Category Summary

| Category | SKU Count | Core Products |
|----------|-----------|---------------|
| Soda Water | 2 | Club Soda (Standard + Finns) |
| Tonic Water | 2 | Imperial (Standard + Finns) |
| Ginger Beer | 2 | Ginger (Standard + Finns) |
| Specialty | 5 | Bali Breeze, Finn's Breeze, Coconut, Green Tea, Chai |
| **Total** | **11** | |

---

## Data Source Mapping

| SKU Category | Production Data Source | Sales Data Source |
|--------------|------------------------|-------------------|
| Club Soda | KMI_TAB-CLUB-RAW | SALES_REVENUE_MASTER |
| Imperial | KMI_TAB-IMPERIAL-RAW | SALES_REVENUE_MASTER |
| Ginger | KMI_TAB-GINGER-RAW | SALES_REVENUE_MASTER |
| Inventory | KMI_PACKAGING_RAW | KMI_FG_STOCK_SUMMARY |
| Costing | CONFIG_BOM_MASTER | BATCH_COGS_MASTER, SKU_COSTING_MASTER |

---

## Related Database Tables

### COGS_LOOKUP
Contains cost of goods sold per SKU:
```
- SKU_Name
- SKU_Code
- Raw_COGS_IDR
```

### SKU_COSTING_MASTER
Master pricing and margin data:
```
- SKU_Code
- SKU_Name
- Raw_COGS_IDR
```

### CONFIG_BOM_MASTER
Bill of materials per SKU:
```
- SKU_Code
- Component_Code
- Quantity_Per_Can
- UoM
```

---

## Production Planning Notes

**2024 Max Production Targets:**
Referenced in planning data:
- CS 2024 Max (Club Soda maximum production target)
- Imp 2024 Max (Imperial maximum production target)
- Ginger 2024 Max (Ginger maximum production target)

---

## Metrics Using SKU Data

| Metric ID | Metric Name | SKU Dimension |
|-----------|-------------|---------------|
| M005 | Total Cases by SKU | Bar Chart |
| M019 | Revenue by SKU | Donut Chart |
| M032 | Revenue Mix % (SKU Breakdown) | Donut Chart |
| M069 | Cases Produced by SKU | Bar Chart |
| M084 | Current Stock by SKU | Bar Chart |
| M087 | Days of Inventory on Hand (by SKU) | Bar Chart |
| M098 | COGS by SKU | Bar Chart |
| M099 | COGS per Case (by SKU) | Bar Chart |
| M106 | Gross Margin by SKU | Bar Chart |

---

## Distribution Channels

Products are distributed through:
- **Direct Sales** - Direct to venues/outlets
- **Distributors** - Third-party distribution partners
- **eCommerce** - Online sales channels
- **Retail** - Foodhall, Grand Lucky, and supermarket chains

---

## Company Entities

| Entity | Type | Role |
|--------|------|------|
| PT. Unisoda Mitra Jaya | Operating Entity (Indonesia) | Production & Sales |
| Unisoda PTE | Holding (Singapore) | Corporate |

---

## Pending SKU Decisions

- [ ] Confirm can size: 250ml vs 330ml for different products
- [ ] Validate specialty mixer status (Coconut, Green Tea, Chai)
- [ ] Confirm New SKU 1, 2, 3 product definitions (referenced in data)
- [ ] Document 500ml variant if applicable

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-07 | Initial SKU library created from METRIC-DATA-MAPPING.md and Candid Projections 2025.xlsx |

---

*Document maintained in: candid/SKU-LIBRARY.md*

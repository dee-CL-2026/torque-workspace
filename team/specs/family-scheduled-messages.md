# Spec Document: Family Scheduled Messages

## 1. Use Case
Torque sends scheduled messages to the family WhatsApp group "It's All Torque" (JID: 120363426498709975@g.us).

## 2. Message Types
- **Good Morning Messages**: Rotating and personalised messages to start the day.
- **Birthday Reminders**: Notifications for family birthdays:
  - Evie: April 7
  - Connie: July 26
  - Sinead: TBD
  - Dee: TBD
  - Daryl: February 20
- **School Pickup Reminders**: Alerts for Sinead's school pickup.
- **Weekend Activity Suggestions**: Ideas for family activities and outings over the weekend.

## 3. Implementation
Messages will be implemented using OpenClaw cron jobs with `payload.kind: "agentTurn"` and delivered to WhatsApp.

## 4. Tone
The messages should be warm, family-friendly, and occasionally funny. Avoid a robotic tone.

## 5. Schedule
- **Morning Messages**: Sent daily at 7 AM.
- **Reminders**: Sent as needed.

## 6. Cross-Channel Note
Messages to WhatsApp groups require a WhatsApp-context session, following the cross-channel limitations.
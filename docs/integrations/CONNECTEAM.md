# Connecteam Integration
> Staff rostering and time tracking

---

## Status: PENDING

Waiting for:
- [ ] Client creates Connecteam account
- [ ] API credentials provided
- [ ] Webhook endpoints configured

---

## Planned Integration

### Data Flow
```
Connecteam → n8n Webhook → Supabase → Dashboard
```

### Workflows to Build

1. **Shift Clock-In**
   - Trigger: Staff clocks in
   - Action: Log to Supabase, update dashboard

2. **Shift Clock-Out**
   - Trigger: Staff clocks out
   - Action: Complete shift record, calculate hours

3. **Handover Form**
   - Trigger: Staff submits handover
   - Action: Save to Supabase, notify next shift

4. **Incident Report**
   - Trigger: Staff reports incident
   - Action: Save to Supabase, alert admins

---

## Setup Steps (When Ready)

1. Get API key from Connecteam
2. Configure webhooks in Connecteam
3. Create n8n workflows
4. Test data flow
5. Connect to dashboard

---

## Connecteam Webhook Events

| Event | n8n Workflow |
|-------|--------------|
| shift.started | Log clock-in |
| shift.ended | Log clock-out |
| form.submitted | Process form |
| incident.reported | Alert + log |

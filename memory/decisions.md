# Decisions Log - EphraimCare

---

## 2026-01-18 - Workspace Migration

**Context:** Moving to centralized OPBROS.AI workspace

**Decision:** Migrate to new workspace with centralized credentials and memory

**Rationale:** Better organization, client isolation, centralized security

**Impact:**
- Client credentials now in ../../credentials/clients/ephraimcare.env
- Shared tools accessible via ../../credentials/owner/shared.env

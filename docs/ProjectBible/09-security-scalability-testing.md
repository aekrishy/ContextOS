# PART 9 — SECURITY, SCALABILITY & TESTING (CROSS-CUTTING)

## 9.1 Security Summary

| Concern | MVP posture | Future Vision |
|---|---|---|
| Credential handling | Env-based tokens, read-only scopes, never exposed to Claude | Secrets manager, per-org token vaulting |
| Tool write access | None — read/reason/recommend only | Human-in-the-loop approval flow before any write action (Part 6.2) |
| Multi-tenant isolation | N/A — single demo org | Full tenant isolation, per-org data boundaries |
| Auth to ContextOS itself | Single shared API key for the demo (`@UseGuards`, Verified decorator) | OAuth 2.1 (Verified NitroStack support), SSO |
| Data retention | Demo-scoped, ephemeral memory store | Configurable retention policy, deletion/export compliance (GDPR-style) |

## 9.2 Scalability Summary

| Layer | MVP | Future Vision |
|---|---|---|
| Retrieval | Single repo, synchronous on-demand | Multi-repo registry, async background ContextNode sync (Part 4) |
| Storage | SQLite/single Postgres | Sharded Postgres + managed vector DB (pgvector/Pinecone) |
| MCP servers | 3 real (GitHub, Slack, Filesystem) | Full catalog (Jira, Notion, Drive, Calendar, Database, Terminal) |
| Concurrency | Single demo user | Queue-based multi-user request handling, per-org rate limiting |

## 9.3 Testing Strategy Summary

Consolidates the per-part testing notes (see Parts 2–5 for detail):

- **Unit:** Planner plan generation, Reflection claim-checking, evidence schema validation
- **Contract:** MCP client responses against fixtures (avoids live-API flakiness in CI and pre-demo rehearsal)
- **End-to-end:** scripted golden-path runs of the 3 demo questions, executed repeatedly before demo day
- **Chaos/fallback test:** deliberately kill network access and confirm `evidence_cache` fallback still produces a correct, cited answer

## 9.4 Consolidated Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Live API outage/rate limit during demo | Medium | High | Pre-fetched `evidence_cache`, tested fallback path |
| Planner mis-plans an unfamiliar phrasing of a demo question | Low (if scripted) | High | Hardcoded plan templates as a safety net for exactly the 3 demo questions (Part 7) |
| NitroStack API differs from assumptions in Part 6 | Medium | Medium | Hour 0–1 verification checklist before deep implementation |
| Knowledge Graph UI performance with live updates | Low | Medium | Cap rendered nodes to query-scoped subgraph only |
| Scope creep past Hour 16 | Medium | High | Hard feature freeze checkpoint at Hour 21 (Part 7.4) |
| Reflection retry loop stalls visibly on stage | Low | Medium | Max 1 retry, hard timeout, graceful lower-confidence fallback |

---

END OF PART 9

Awaiting Continue

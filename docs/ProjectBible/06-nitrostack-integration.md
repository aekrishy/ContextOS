# PART 6 — NITROSTACK INTEGRATION

All facts below are drawn from official NitroStack sources (nitrostack.ai, docs.nitrostack.ai, github.com/nitrocloudofficial/nitrostack) as of this writing. Anything not directly confirmed there is explicitly marked as an assumption.

## 6.1 What's Verified

| Component | Verified fact |
|---|---|
| Core framework | TypeScript, decorator-based, NestJS-inspired (`@McpApp`, `@Module`, `@Tool`, `@UseGuards`, `@Cache`, `@Widget`) |
| Packages | `@nitrostack/core` (framework core: decorators, DI, runtime), `@nitrostack/cli` (scaffolding/dev/codegen), `@nitrostack/widgets` (React widget SDK for tool outputs) |
| NitroStudio | Native desktop app to visually test/debug MCP servers — inspect tools, resources, prompts; run prompts; browse resources; supports a standalone mode connecting over stdio to a local MCP server |
| NitroCloud | Managed hosting/deployment for MCP servers |
| Auth | Built-in support for API key and OAuth 2.1 patterns |
| Design pattern shown in docs | Single decorator stack combining API definition + validation (Zod) + auth (`@UseGuards`) + caching (`@Cache`) + UI (`@Widget`) |

## 6.2 What's Assumed — Verify Before Building

| Item | Assumption | Why it matters for us |
|---|---|---|
| "Context Nodes" as a NitroStack-native primitive | **Assumption** — the Context Pack references "Context Nodes" as a NitroStack showcase feature; official docs reviewed so far describe tools/resources/prompts/widgets, not a primitive literally named "Context Node." Our ContextNode subsystem (Part 4) is **our own application-layer concept**, not necessarily a built-in NitroStack feature. | Do not present our ContextNode as "built on NitroStack's Context Node primitive" in the pitch unless this is confirmed in docs — verify or reframe as "ContextOS's ContextNode subsystem, built using NitroStack tools/resources." |
| "Ops Canvas" | **Assumption** — not confirmed in the sources reviewed. May refer to a NitroStudio panel/feature under a different name. | Verify exact terminology in current docs before using it in the pitch deck; if unconfirmed, describe the visual debugging capability generically as "NitroStudio's live tool/resource inspector." |
| Exact streaming tool-call API surface | **Assumption** — streaming is plausible for an MCP framework but exact API (e.g., `ctx.stream()`) not directly confirmed in the excerpts reviewed. | Verify in `docs.nitrostack.ai` under tool/resource reference before relying on it for the live "Streaming Tool Calls" demo beat. |
| Human-in-the-loop approval decorator/pattern | **Assumption** — plausible given `@UseGuards`/interceptor patterns, but exact API not confirmed. | Needed for the write-capable Stretch Goal tools (Part 3.7); verify or implement manually as a simple confirm-step in the frontend if no native primitive exists. |
| Prompt caching being NitroStack-managed vs. Claude-API-managed | Claude's own prompt caching (API-level) is a **Verified** capability of the Anthropic API and is what we rely on primarily. Whether NitroStack additionally offers its own caching layer beyond `@Cache` (which appears to be a general tool-result cache, not specifically LLM prompt caching) is an **Assumption**. | Use `@Cache` for MCP tool-result caching (confirmed pattern); use Claude API prompt caching directly for LLM cost/latency — don't assume NitroStack abstracts this. |

**Standing instruction for the team:** Any teammate about to write code against a NitroStack API not listed as Verified above must check `docs.nitrostack.ai` first. Do not guess CLI flags or decorator signatures.

## 6.3 CLI Workflow (Recommended verification checklist, not invented steps)

Rather than inventing exact commands, Developer 1 should, in the first 30 minutes of Hour 1:

1. Run the NitroStack CLI's help/init command to see current scaffold options — **verify exact command name in `docs.nitrostack.ai` CLI reference.**
2. Confirm the generated project structure matches Part 2's assumed folder layout; adjust Part 2 if the real scaffold differs.
3. Confirm how `@Tool`-decorated classes get registered into `@McpApp`/`@Module` (pattern shown in Section 3.2 is Verified from GitHub README; confirm nothing has changed).
4. Confirm how environment variables/secrets are conventionally loaded in a NitroStack project (for GitHub/Slack tokens).

## 6.4 NitroStudio Workflow (Verified capability, use as-is)

- Connect NitroStudio to the local MCP server (confirmed standalone stdio connection mode).
- Use it throughout the hackathon — not just for the demo — as the primary debugging tool for testing individual `@Tool` calls (`search_pull_requests`, `search_messages`, etc.) in isolation before wiring them into the full pipeline.
- **Demo usage:** Live-open NitroStudio during Q&A to show judges the actual tool calls, inputs, and outputs of a real question — this directly satisfies "proper MCP usage" and "NitroStack best practices" judging criteria from Part 1.

## 6.5 Deployment (NitroCloud)

- **Verified:** NitroCloud exists as managed hosting for MCP servers/apps.
- **Recommended for demo day:** Deploy the MCP server to NitroCloud as a Recommended (not MVP-blocking) step — running locally is acceptable and lower-risk for a 24-hour build; NitroCloud deployment is a nice "production-ready" credibility signal if time allows in the final hours.
- **Fallback:** If NitroCloud deployment has any friction close to demo time, present locally — never risk the live demo on a last-minute deploy.

---

END OF PART 6

Awaiting Continue

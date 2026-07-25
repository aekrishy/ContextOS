# ContextOS: Hackathon Global Context (NitroStack Edition)
**Project Goal**: Build an agentic engineering memory layer within a 24-hour hackathon sprint.
**Strategy**: "Vibe-coding" via Google Antigravity. 

## 1. Monorepo Architecture (Strictly NitroStack)
Do not deviate from these paths:
- `apps/server/`: Backend MCP server using `@nitrostack/core`. NO Express.js or standard HTTP routing.
- `apps/web/`: Frontend dashboard using React, Tailwind, and `@nitrostack/widgets`.
- `packages/shared-types/`: Shared Zod schemas (NitroStack uses Zod natively for tool validation).

## 2. The Data (MVP Constraint)
- We are NOT building a real database connection for this sprint.
- ALL data must be read from/written to a mock JSON file located at `apps/server/src/mock-data/enterprise-data.json`.
- The data should be exposed to the AI using NitroStack `@Resource` decorators.

## 3. The Agent Pipeline (MCP Native)
Agents must be built as NitroStack Tools. 
1. **Planner**: An `@Tool` that takes user input and outputs a structured plan.
2. **Retriever**: An `@Tool` that fetches required ContextNodes from the mock JSON.
3. **Context Builder**: An `@Tool` that formats the retrieved data into a final prompt.

## 4. Antigravity AI Rules
- Strictly use the NitroStack SDK and its decorator-driven architecture.
- Do not invent new directories. 
- Write complete, functional code. No `// TODO: implement this later` comments.
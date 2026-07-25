# ContextOS - Hackathon Single Source of Truth

**MISSION:** Build an agentic engineering memory layer within 24 hours using a strict "vibe-coding" strategy via Google Antigravity. 

**CRITICAL RULE FOR ALL AI AGENTS:** Do not hallucinate external libraries, architectures, or alternative tech stacks. Stick strictly to the rules defined in this document.

## 1. Monorepo Architecture (Strictly NitroStack)
The workspace follows a strict monorepo structure. Agents must not deviate from these exact paths:
- `apps/server/ContextOS/`: Backend MCP server using `@nitrostack/core` (Note the nested folder structure).
- `apps/web/`: Frontend dashboard using React, Tailwind, and `@nitrostack/widgets`.
- `packages/shared-types/`: Shared Zod schemas and mock database types.

## 2. Tech Stack & Dependencies
- **Data Validation:** Zod.
- **Database:** A mock JSON database named `enterprise-data.json` (No real databases allowed to save hackathon time).
- **Backend:** NitroStack Core, exposing Model Context Protocol (MCP) Tools.
- **Frontend:** React, Tailwind CSS, utilizing `@nitrostack/widgets` for pre-built UI components.

## 3. Team Tracks & Isolation Protocol
Four teammates (A, B, C, D) are executing parallel tracks on synchronized machines. To prevent merge conflicts and Git nightmares, agents must **ONLY** modify files within their assigned track's directory. 

*   **Track 1: Foundation (Teammate A)**
    *   **Directory:** `packages/shared-types/`
    *   **Goal:** Build the unified Zod schemas and `enterprise-data.json`. This is the core data blocker for all other tracks. 
*   **Track 2: The Brain (Teammate B)**
    *   **Directory:** `apps/server/ContextOS/src/agents/`
    *   **Goal:** Write pure TypeScript logic for the Planner, Retriever, and Context Builder functions.
*   **Track 3: The Plumber (Teammate C)**
    *   **Directory:** `apps/server/ContextOS/src/index.ts`
    *   **Goal:** Build the NitroStack server, wrapping Track 2's logic into exposed `@Tool` endpoints.
*   **Track 4: Web Wizard (Teammate D)**
    *   **Directory:** `apps/web/`
    *   **Goal:** Build the React/Tailwind frontend, initially using hardcoded data, eventually routing live MCP data via NitroStack widgets.

## 4. Execution Rhythm
- **Push-Pull Rhythm:** Track 1 merges first. Tracks 2, 3, and 4 must immediately pull Track 1's Zod schemas into their local environments to sync their AI agents. Track 2 hands off to Track 3. Track 4 consumes Track 3.
- **No Overwrites:** Never edit a file outside your assigned track directory. Trust the boundaries.
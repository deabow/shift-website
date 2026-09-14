# Notes & Context

## Project Overview
- **Workspace**: `Hodour` (Next.js 14, Tailwind CSS, TypeScript, Framer Motion, Google GenAI, Vercel Blob).
- **Core Domain**: Hodour Website (Portfolio, Services, Admin, i18n, etc.).

## Identified Loop: Lead Capture, Qualification & Triage
- **Objective**: Capture and qualify client leads automatically via Web Chatbot (and optional forms), extract lead details (name, phone, service needed, budget/timeline), prevent lead leakage, and prepare decision-ready briefs for human review in `/admin`.
- **Existing Architecture**:
  - `src/components/chat-fab.tsx`: Chatbot UI with 3-message limit and WhatsApp redirection link.
  - `src/app/api/chat/route.ts`: API route calling Gemini 2.0 Flash with local fallback. Lacks lead extraction, storage, and fallback model redundancy.
  - `src/app/admin/panel/page.tsx`: Currently only contains Portfolio management (`AdminPortfolioDashboard`), no leads dashboard or triage center.
  - `data/`: Only contains `portfolio-projects.json`. No persistent store for leads.


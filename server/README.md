# server/

Phase 2 (AI Planner): create `server/api/planner.post.ts`.
The OpenAI call MUST live here — read the key via `useRuntimeConfig().openaiApiKey`.
Never import the key into a component or expose it via `runtimeConfig.public`.

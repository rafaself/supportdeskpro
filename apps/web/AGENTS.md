# AI Agent Guidelines - SupportDesk Pro Frontend

Rules and conventions for AI agents working on this project to ensure consistency and maintainability.

## 🛠 Tech Stack
- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide-React
- **Language:** TypeScript

## 🎨 Design & UI Rules
- **Theme:** Strictly Light Theme. Avoid dark mode variants unless requested.
- **Palette:** Use `slate` for borders/text and `indigo` or `blue` for primary actions.
- **Consistency:** Maintain the established "Clean & Professional" look (soft shadows, subtle borders, rounded corners).
- **Assets:** Store images in `src/assets/` and **import** them directly in components (e.g., `import logo from '../assets/logo.png'`) to leverage Next.js automatic cache busting.

## ⚙️ Development Patterns
- **API/Data:** Always check `src/mocks/` before implementing data fetching. Use the mock system for new features.
- **State:** Prefer standard React Hooks (`useState`, `useMemo`) for local state.
- **Client Components:** Use `'use client';` only when necessary (interactivity, hooks).
- **Type Safety:** Maintain strict TypeScript types. Avoid `any`.

## 📂 Project Structure
- `src/app/`: Routes and pages.
- `src/components/`: Reusable UI pieces.
- `src/assets/`: Static images and brand assets.
- `src/mocks/`: Simulated API handlers and data.

## 🤖 Interaction Guidelines
- **Mimicry:** Always read existing files in the directory before creating new ones to match the coding style.
- **Verification:** Run `pnpm lint` and `pnpm build` after significant changes to ensure stability.
- **Conciseness:** Provide direct solutions. Do not over-explain or add unnecessary comments to the code.

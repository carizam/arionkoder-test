# Minimal Automation Exercise

A tiny React app built with Vite. It includes a simple task list and a small automated test suite that exercises the main user flows.

## Tech stack

- React + Vite
- Vitest
- React Testing Library
- Playwright
- GitHub Actions

## Run locally

Use Node.js 20 or newer.

Install dependencies:

```bash
npm ci
```

Start the app:

```bash
npm run dev
```

Run the tests:

```bash
npm test
```

Run the end-to-end tests:

```bash
npx playwright install chromium
npm run test:e2e
```

Build for production:

```bash
npm run build
```

## What the tests cover

The test suite covers the core task-list behavior:

- Adding a new task clears the form and updates the active task count.
- Completing a task updates the completed filter and remaining count.
- Deleting a task removes it from the list.
- Toggling the color theme saves the dark-mode preference.

The Playwright end-to-end test covers a browser-level flow for adding a task, completing it, filtering completed tasks, and switching to dark mode.

The CI workflow runs `npm test`, `npm run build`, and `npm run test:e2e` on every push and pull request.

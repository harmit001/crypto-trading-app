# crypto-trading-app

A minimal Vite + React demo configured with client-side routing using React Router.

**Project**: Simple starter showing Vite, React, and React Router v6 usage.

**Prerequisites**
- Node.js (recommended >= 18) and `npm` available in your PATH.

**Install**
Run from the project root:

```bash
npm install
```

**Run (development)**

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`). The app supports HMR.

**Build & Preview**

```bash
npm run build
npm run preview
```

**Routing**
- `react-router-dom` is added as a dependency.
- The app is wrapped with `BrowserRouter` in `src/main.jsx`.
- Routes are defined in `src/App.jsx`:
  - `/` → `src/pages/Home.jsx`

To add a new route: create a component in `src/pages/`, import it into `src/App.jsx`, and add a `<Route path="/your-path" element={<YourComponent />} />` entry.

**Files of interest**
- `src/main.jsx` — wraps the app with `BrowserRouter`.
- `src/App.jsx` — navigation and route configuration.
- `src/pages/Home.jsx` — home page (original app UI).
- `package.json` — scripts and dependencies (`react-router-dom` added).

**Notes**
- If you just pulled changes, run `npm install` before `npm run dev` to ensure `react-router-dom` is installed.
- Want me to add a 404 page or lazy-loaded routes? Ask and I can implement that.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

[![name](src/assets/logo-no-background.svg)]("invitely)

[![Netlify Status](https://api.netlify.com/api/v1/badges/19cfe280-2bf7-43e0-887f-30291fbc52e1/deploy-status)](https://app.netlify.com/sites/invitely/deploys)

## env vars

This project uses the `vite-plugin-env-compatible` plugin to inject env vars into the app.

So that you can use the standard `process.env` instead of `import.meta.env` object to access them.

## dev with codespaces

open the terminal OR run script from vs code (Explorator's scripts npm section)

```
> pnpm dev

```

```
*  Exécution de la tâche : pnpm run dev
> invitely@0.1.0 dev /workspaces/invitely
> vite --port 9000 --host 0.0.0.0 --clearScreen false


  VITE v4.3.9  ready in 523 ms

  ➜  Local:   http://localhost:9000/
  ➜  Network: http://172.16.5.4:9000/
```

> Click on http://localhost:9000/

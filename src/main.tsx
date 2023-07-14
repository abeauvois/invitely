import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./modules/app";
import "./styles/index.css";

const container = document.getElementById("root");

async function prepareMSW(): Promise<void> {
  // Start the mocking conditionally.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const { worker } = await import("./mocks/browser");
    await worker.start({ onUnhandledRequest: "warn" });
  }
}

if (container) {
  const root = createRoot(container);
  prepareMSW().then(() => {
    root.render(<App />);
  });
}

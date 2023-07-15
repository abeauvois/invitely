import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./modules/app";
import "./styles/index.css";

const container = document.getElementById("root");



if (container) {
  const root = createRoot(container);
    root.render(<App />);
}

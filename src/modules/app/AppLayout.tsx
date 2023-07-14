import React, { PropsWithChildren } from "react";

import { AppBar } from "./AppBar";

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <AppBar />
      <main className="grid overflow-hidden">
        <div id="scroll-content" className="grid overflow-auto bg-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
};

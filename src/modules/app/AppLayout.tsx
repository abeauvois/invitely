import React, { PropsWithChildren } from "react";

import { ReactComponent as Logo } from "../../assets/logo-no-background.svg";

import { AppBar } from "./AppBar";

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <AppBar />
      <main className="grid overflow-hidden">
        <div id="scroll-content" className="overflow-auto bg-gray-100">
          {children}
        </div>
      </main>
      <footer>
        <div className="flex items-center gap-8 p-6 text-invitely">
          <div className="fill-primary"><Logo className="m-4 h-20 w-20" /></div>
          <div>Qui sommes-nous ?</div>
          <div>Contactez-nous</div>
        </div>
      </footer>
    </div>
  );
};

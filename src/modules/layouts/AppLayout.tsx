import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router";

import { ReactComponent as Logo } from "../../assets/logo-no-background.svg";

import { AppBar } from "../app/AppBar";

export const AppLayout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <AppBar />
      <main >
        <div id="scroll-content" className="bg-gray-50">
          <Outlet />
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

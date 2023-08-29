import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router";
import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import { ReactComponent as Logo } from "@/assets/logo-no-background.svg";
import { Link } from "react-router-dom";

export const PageLayout: React.FunctionComponent<PropsWithChildren> = () => {

  return (
    <div>
      <header className="border-b-2 border-gray-200 bg-white">
        <nav
          className="flex w-full items-center justify-between p-2 lg:px-4 "
          aria-label="Global"
        >
          <Link to="/" className="fill-primary">
            <Logo className="m-4 h-12 w-12" />
          </Link>
          <div className="mx-6">
            <UserButton showName />
          </div>
        </nav>
      </header>
      <main >
        <SignedIn>
          <Outlet />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
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

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import { Landing } from "../Landing/Landing";
import { Workspace } from "../Workspace";
import { WorkspaceForm } from "../Workspace/WorkspaceForm";
import { AppLayout } from "../layouts/AppLayout";

import { queryClient } from "./config/queryClient";

import { PageLayout } from "../layouts/PageLayout";

const env = process.env;

if (!env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <ClerkLoaded>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route element={<PageLayout />}>
            <Route path="workspace" element={
              <>
                <SignedIn>
                  <Workspace />
                </SignedIn>
                <SignedOut>
                  {/* 
                          Route matches, but no user is signed in. 
                          Redirect to the sign in page.
                        */}
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } />
            <Route path="workspace/form/:formId/" element={
              <SignedIn>
                <WorkspaceForm />
              </SignedIn>
            } />
          </Route>
        </Routes>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export const App = (): React.ReactElement | null => {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

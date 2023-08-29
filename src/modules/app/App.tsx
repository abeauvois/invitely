import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, Routes, Route, useNavigate, createBrowserRouter } from "react-router-dom";

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
import { Workspace, loader as workspaceLoader } from "../Workspace/Workspace";
import { WorkspaceForm, loader as workspaceFormLoader } from "../Workspace/WorkspaceForm/WorkspaceForm";
import { WorkspaceFormReply, loader as workspaceFormReplyLoader } from "../Workspace/WorkspaceForm/WorkspaceFormReply";
import { AppLayout } from "../layouts/AppLayout";

import { queryClient } from "./config/queryClient";

import { PageLayout } from "../layouts/PageLayout";
import { SendForm } from "@/shared/components/Form/SendForm";

export const env = process.env;

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
            <Route path="workspace/send" element={
              <>
                <SendForm username="nickname" email="a@b.c" />
              </>
            } />
          </Route>
        </Routes>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

// ***************************
// MIGRATION from BrowserRouter to RouterProvider.
// 
// https://reactrouter.com/en/main/upgrading/v6-data

// 1️⃣ Changed from App to Root
export const Root = (): React.ReactElement | null => {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProviderWithRoutes />
    </QueryClientProvider>
  );
};

// 3️⃣ Router singleton created
const router = createBrowserRouter([
  {
    Component: PageLayout,
    children: [
      {
        path: "workspace",
        loader: workspaceLoader,
        Component: () => (
          <>
            <SignedIn>
              <Workspace />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )
      },
      {
        path: "workspace/form/:formId/",
        loader: workspaceFormLoader,
        Component: () => (
          <>
            <SignedIn>
              <WorkspaceForm />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )
      },
      {
        path: "workspace/form/:formId/:recipientId/",
        loader: workspaceFormReplyLoader,
        Component: () => (
          <>
            <SignedIn>
              <WorkspaceFormReply />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )
      }
    ]
  },
  { path: "*", Component: Root },
]);

// 4️⃣ RouterProvider added
export function App() {
  return <RouterProvider router={router} />;
}

export default App;

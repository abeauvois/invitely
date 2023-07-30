import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route, Red, useNavigate, Outlet } from "react-router-dom";

import { Landing } from "../Landing/Landing";
import { Workspace } from "../Workspace";
import { WorkspaceForm } from "../Workspace/WorkspaceForm";
import { Layout } from "./AppLayout";

import { queryClient } from "./config/queryClient";
import { User } from "@/types/User";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
  useUser
} from "@clerk/clerk-react";

const env = process.env;

if (!env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = env.VITE_CLERK_PUBLISHABLE_KEY;


interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
}

const LayoutOne = () => (
  <div>
    <h1>Layout One</h1>
    <Outlet />
  </div>
);

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ path, children }) {
  let user = useUser();
  let navigate = useNavigate();

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  return <Route element={children} path={path} />;
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <ClerkLoaded>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route path="protected" element={<LayoutOne />}>

            <Route path="workspace" element={
              <SignedIn>
                <Workspace />
              </SignedIn>
            } />
            <Route path="workspace/form/:formId/" element={<WorkspaceForm />} />
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

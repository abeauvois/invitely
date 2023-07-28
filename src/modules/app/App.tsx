import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { Success } from "../Success/Success";
import { Home } from "../Home/Home";
import { Workspace } from "../Workspace";
import WorkspaceForm from "../Workspace/Form";

import { useAuthStore } from "../auth/auth.store";

import { Layout } from "./AppLayout";
import { AppLoader } from "./AppLoader";
import { LoginForm } from "../auth/LoginForm";
import { queryClient } from "./config/queryClient";
import { User } from "@/types/User";


interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
}
const ProtectedRoute = ({
  user,
  redirectPath = "/auth",
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const App = (): React.ReactElement | null => {
  const { user } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="auth" element={<LoginForm />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/workspace/form/:formId/" element={<WorkspaceForm />} />
            </Route>
            <Route
              path="*"
              element={<p>Désolé cette page est inconnue: 404!</p>}
            />
          </Routes>
        </BrowserRouter>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;

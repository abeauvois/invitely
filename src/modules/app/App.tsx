import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Success } from "../Success/Success";
import { Home } from "../Home/Home";
import { Workspace } from "../Workspace";
import WorkspaceForm from "../Workspace/Form";

import { useAuthStore } from "../auth/auth.store";
import { useKeepAliveCookie } from "../auth/useKeepAliveCookie";

import { Layout } from "./AppLayout";
import { AppLoader } from "./AppLoader";
import { LoginForm } from "./LoginForm";
import { useAppStore } from "./app.store";
import { queryClient } from "./config/queryClient";
import { useAppReady } from "./useAppReady";


declare global {
  interface Window {
    logout: () => void;
    fetchMe: () => void;
  }
}

export const App = (): React.ReactElement | null => {
  const { isReady } = useAppStore();

  const { isConnected, logout, fetchMe } = useAuthStore();

  window.logout = logout;
  window.fetchMe = fetchMe;


  useAppReady();

  let content = (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/workspace/form/:formId/" element={<WorkspaceForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );

  // if (!isReady) {
  //   content = <AppLoader />;
  // }

  // if (!isConnected) {
  //   content = <LoginForm />;
  // }

  return (
    <QueryClientProvider client={queryClient}>
        <Layout>{content}</Layout>
    </QueryClientProvider>
  );
};

export default App;

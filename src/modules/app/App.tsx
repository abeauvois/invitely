import { LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { OpenAPI } from "../../generated/openapi";
import { DataIngest } from "../DataIngest/DataIngest";
import { Success } from "../Success/Success";
import { TasksVisualizer } from "../TasksVisualizer/TasksVisualizer";
import { useAuthStore } from "../auth/auth.store";
import { useKeepAliveCookie } from "../auth/useKeepAliveCookie";

import { Layout } from "./AppLayout";
import { AppLoader } from "./AppLoader";
import { LoginForm } from "./LoginForm";
import { useAppStore } from "./app.store";
import { queryClient } from "./config/queryClient";
import { useAppReady } from "./useAppReady";

const googleLibraries: LoadScriptProps["libraries"] = ["places", "geometry"];

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

  OpenAPI.BASE = process.env.SUPERVAN_API_URL as string;
  OpenAPI.HEADERS = {
    "x-api-key": process.env.SUPERVAN_API_TOKEN as string,
  };

  useAppReady();
  useKeepAliveCookie();

  let content = (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks-visualizer" element={<TasksVisualizer />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<DataIngest />} />
      </Routes>
    </BrowserRouter>
  );

  if (!isReady) {
    content = <AppLoader />;
  }

  if (!isConnected) {
    content = <LoginForm />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LoadScript
        googleMapsApiKey={process.env.SUPERVAN_GOOGLE_MAPS_API_KEY as string}
        libraries={googleLibraries}
        id="googleMaps"
      >
        <Layout>{content}</Layout>
      </LoadScript>
    </QueryClientProvider>
  );
};

export default App;

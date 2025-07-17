import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "@utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@components/Provider/ToastProvider.tsx";
import App from "./App.tsx";

import "./index.css";
import "keen-slider/keen-slider.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ToastProvider>
  </StrictMode>
);

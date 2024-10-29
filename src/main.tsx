import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppSettingsProvider } from "./context/AppSettingsProvider";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <AppSettingsProvider>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </AppSettingsProvider>
);

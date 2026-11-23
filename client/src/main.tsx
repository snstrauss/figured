import { createRoot } from "react-dom/client";
import { App } from "./features/app/App";
import { LanguageProvider } from "./i18n/LanguageProvider";
import "./styles.css";

function AppRoot() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

createRoot(document.getElementById("root")!).render(<AppRoot />);

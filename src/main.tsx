import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "./index.css";
import App from "./App";
import ReportPage from "./report/ReportPage";

function Root() {
  const [report, setReport] = useState(() =>
    window.location.hash.startsWith("#report")
  );

  useEffect(() => {
    const onHash = () => setReport(window.location.hash.startsWith("#report"));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return report ? <ReportPage /> : <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./components/styles/Arrow.css";
import "./components/styles/ListElements.css";
import "./components/styles/Popup.css";
import "./components/styles/TopInfos.css";
import Context from "./components/Context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>
);

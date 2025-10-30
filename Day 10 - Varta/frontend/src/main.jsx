import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import App from "./App.jsx";

// Apply system theme to <html data-theme="..."> and listen for changes
const applySystemTheme = () => {
  try {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const set = (isDark) => document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    set(mq.matches);
    // observe changes
    if (mq.addEventListener) mq.addEventListener("change", (e) => set(e.matches));
    else if (mq.addListener) mq.addListener((e) => set(e.matches));
  } catch (e) {
    // noop in environments without matchMedia
  }
};

applySystemTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import {createRoot} from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/onest";
import App from "./App.jsx";
import "./base.css";

createRoot(document.getElementById("root")).render(<App />);

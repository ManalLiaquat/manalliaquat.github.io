import React from "react";
import {createRoot} from "react-dom/client";
import "@fontsource/overpass/latin-400.css";
import "@fontsource/overpass/latin-600.css";
import "@fontsource/overpass/latin-700.css";
import "@fontsource/overpass/latin-800.css";
import "@fontsource/overpass-mono/latin-400.css";
import "@fontsource/overpass-mono/latin-600.css";
import App from "./App.jsx";
import "./base.css";

createRoot(document.getElementById("root")).render(<App />);

import React, {Suspense, lazy, useCallback, useEffect, useState} from "react";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";

export const THEMES = [
  {id: "terminal", label: "Terminal"},
  {id: "motion", label: "Motion"}
];

const DEFAULT_THEME = "terminal";

// Each theme is its own chunk, so a visit only downloads the one it shows.
const loaders = {
  terminal: lazy(() => import("./themes/terminal/TerminalTheme.jsx")),
  motion: lazy(() => import("./themes/motion/MotionTheme.jsx"))
};

function pickInitialTheme() {
  const requested = new URLSearchParams(window.location.search).get("theme");
  return loaders[requested] ? requested : DEFAULT_THEME;
}

export default function App() {
  const [theme, setTheme] = useState(pickInitialTheme);

  const changeTheme = useCallback(next => {
    if (!loaders[next]) return;
    const url = new URL(window.location.href);
    if (next === DEFAULT_THEME) url.searchParams.delete("theme");
    else url.searchParams.set("theme", next);
    window.history.replaceState(null, "", url);
    setTheme(next);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const Theme = loaders[theme];
  return (
    <>
      <Suspense fallback={<div className="theme-loading">loading…</div>}>
        <Theme onThemeChange={changeTheme} />
      </Suspense>
      <ThemeSwitcher themes={THEMES} current={theme} onChange={changeTheme} />
    </>
  );
}

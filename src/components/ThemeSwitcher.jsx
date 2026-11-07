import React from "react";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./ThemeSwitcher.css";

export default function ThemeSwitcher({themes, current, onChange}) {
  return (
    <nav className="theme-switcher" aria-label="Choose site theme">
      {themes.map(t => (
        <button
          key={t.id}
          type="button"
          className={t.id === current ? "is-active" : ""}
          aria-pressed={t.id === current}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}

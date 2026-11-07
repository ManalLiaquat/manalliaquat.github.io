import React from "react";
import {lines} from "../data/portfolio";

const byId = Object.fromEntries(lines.map(l => [l.id, l]));

// Round line bullet, the map's way of naming a line.
export function Bullet({id, size = "md"}) {
  const l = byId[id];
  return (
    <span className={`bullet bullet-${size} line-${id}`} aria-hidden="true">
      {l.letter}
    </span>
  );
}

export function LineTag({id}) {
  return (
    <span className="line-tag">
      <Bullet id={id} size="sm" />
      {byId[id].name}
    </span>
  );
}

export function Arrow({external = false}) {
  return (
    <svg
      className="arrow"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      {external ? (
        <path d="M5 11 11 5M6 5h5v5" />
      ) : (
        <path d="M2 8h11M9 4l4 4-4 4" />
      )}
    </svg>
  );
}

// Three line strokes meeting at an interchange: the site mark.
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 40 28"
      width="40"
      height="28"
      aria-hidden="true"
    >
      <path d="M2 20h12l8-8h16" className="line-backend" />
      <path d="M2 20h36" className="line-frontend" />
      <path d="M14 20l6 6" className="line-mobile" />
      <circle cx="14" cy="20" r="4.5" />
    </svg>
  );
}

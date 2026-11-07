import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";

export function Arrow({external = false, className = ""}) {
  return (
    <svg
      className={`arrow ${className}`}
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

// Splits text into masked letters for kinetic reveals; screen readers get the
// whole string once.
export function Letters({text, className = ""}) {
  return (
    <span className={`letters ${className}`}>
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) => (
        <span className="ch-mask" aria-hidden="true" key={i}>
          <span className="ch">{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

// Wraps a link so it leans toward a fine pointer while hovered.
export function Magnetic({
  as: Tag = "a",
  strength = 0.3,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", {duration: 0.5, ease: "power3"});
    const yTo = gsap.quickTo(el, "y", {duration: 0.5, ease: "power3"});
    const move = e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <Tag ref={ref} className={`magnetic ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

// A ring that trails the native cursor and grows over interactive targets.
// `data-cursor="Label"` on a target shows that label inside the ring.
export function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    el.classList.add("is-live", "is-out"); // hidden until the pointer first moves
    let seen = false;
    const xTo = gsap.quickTo(el, "x", {duration: 0.35, ease: "power3"});
    const yTo = gsap.quickTo(el, "y", {duration: 0.35, ease: "power3"});
    const move = e => {
      if (!seen) {
        seen = true;
        gsap.set(el, {x: e.clientX, y: e.clientY});
        el.classList.remove("is-out");
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target.closest?.("a, button, [data-cursor]");
      el.classList.toggle("is-hover", !!t);
      setLabel(t?.dataset.cursor || "");
    };
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");
    const out = () => el.classList.add("is-out");
    const over = () => el.classList.remove("is-out");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", out);
    document.addEventListener("pointerenter", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", out);
      document.removeEventListener("pointerenter", over);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`cursor ${label ? "has-label" : ""}`}
      aria-hidden="true"
    >
      <span>{label}</span>
    </div>
  );
}

// One-time intro: the name assembles, then the curtain lifts. Skipped on repeat
// visits in the same session and under reduced motion.
export function Intro({name, onDone}) {
  const ref = useRef(null);
  const [show] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return false;
      return !sessionStorage.getItem("ml-intro");
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!show) {
      onDone();
      return;
    }
    try {
      sessionStorage.setItem("ml-intro", "1");
    } catch {
      /* private mode: the intro just plays again next time */
    }
    const el = ref.current;
    const tl = gsap.timeline({onComplete: () => (el.style.display = "none")});
    tl.from(el.querySelectorAll(".ch"), {
      yPercent: 110,
      duration: 0.7,
      ease: "power4.out",
      stagger: 0.035
    })
      .to(
        el.querySelector(".intro-bar span"),
        {scaleX: 1, duration: 0.6, ease: "power2.inOut"},
        "-=0.4"
      )
      .to(
        el.querySelectorAll(".ch"),
        {yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.015},
        "+=0.05"
      )
      .add(onDone, "-=0.1")
      .to(el, {yPercent: -100, duration: 0.8, ease: "power4.inOut"}, "-=0.15");
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!show) return null;
  return (
    <div className="intro" ref={ref} aria-hidden="true">
      <p className="intro-name">
        <Letters text={name} />
      </p>
      <div className="intro-bar">
        <span />
      </div>
    </div>
  );
}

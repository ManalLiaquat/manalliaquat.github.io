import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion, useReducedMotion, useScroll, useTransform} from "motion/react";

const EASE = [0.25, 0.1, 0.25, 1];

// Fades and slides its children in once they enter the viewport.
export function FadeIn({
  as = "div",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = useMemo(() => motion.create(as), [as]);
  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      className={className}
      initial={{opacity: 0, x, y}}
      whileInView={{opacity: 1, x: 0, y: 0}}
      viewport={{once: true, margin: "50px", amount: 0}}
      transition={{duration, delay, ease: EASE}}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Pulls its child toward a fine pointer once the pointer comes within `padding`
// px of the element's edge.
export function Magnet({
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
  children
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({x: 0, y: 0, on: false});
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = e => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const near =
        Math.abs(e.clientX - cx) < r.width / 2 + padding &&
        Math.abs(e.clientY - cy) < r.height / 2 + padding;
      setPos(
        near
          ? {
              x: (e.clientX - cx) / strength,
              y: (e.clientY - cy) / strength,
              on: true
            }
          : {x: 0, y: 0, on: false}
      );
    };
    window.addEventListener("pointermove", move, {passive: true});
    return () => window.removeEventListener("pointermove", move);
  }, [padding, strength]);
  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: pos.on ? activeTransition : inactiveTransition,
          willChange: "transform"
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Char({ch, progress, range}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="char">
      <span className="char-ghost">{ch}</span>
      <motion.span className="char-live" style={{opacity}}>
        {ch}
      </motion.span>
    </span>
  );
}

// Each character brightens from 0.2 to 1 as the paragraph scrolls through view.
export function AnimatedText({text, className = ""}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });
  const chars = [...text];
  if (reduced)
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((ch, i) => (
          <Char
            key={i}
            ch={ch}
            progress={scrollYProgress}
            range={[i / chars.length, (i + 1) / chars.length]}
          />
        ))}
      </span>
    </p>
  );
}

export function ContactButton({href, children = "Contact Me", className = ""}) {
  return (
    <a className={`contact-btn ${className}`} href={href}>
      {children}
    </a>
  );
}

export function GhostButton({href, children, external = false}) {
  return (
    <a
      className="ghost-btn"
      href={href}
      {...(external ? {target: "_blank", rel: "noreferrer"} : {})}
    >
      {children}
    </a>
  );
}

// The 3D lanyard badge's face, drawn as an SVG so it needs no image file.
export function badgeImage({name, title, handle}) {
  const esc = s =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0.07" stop-color="#18011F"/><stop offset="0.37" stop-color="#B600A8"/>
    <stop offset="0.72" stop-color="#7621B0"/><stop offset="1" stop-color="#BE4C00"/></linearGradient></defs>
  <rect width="600" height="900" fill="#0C0C0C"/>
  <rect x="0" y="0" width="600" height="300" fill="url(#g)"/>
  <text x="48" y="230" font-family="Kanit, Arial, sans-serif" font-weight="900" font-size="150" fill="#ffffff">${esc(
    name
      .split(" ")
      .map(w => w[0])
      .join("")
  )}</text>
  <text x="48" y="430" font-family="Kanit, Arial, sans-serif" font-weight="800" font-size="64" fill="#D7E2EA">${esc(
    name.split(" ")[0].toUpperCase()
  )}</text>
  <text x="48" y="500" font-family="Kanit, Arial, sans-serif" font-weight="800" font-size="64" fill="#D7E2EA">${esc(
    name.split(" ").slice(1).join(" ").toUpperCase()
  )}</text>
  <text x="48" y="600" font-family="Kanit, Arial, sans-serif" font-weight="400" font-size="34" fill="#BBCCD7">${esc(
    title
  )}</text>
  <text x="48" y="830" font-family="Kanit, Arial, sans-serif" font-weight="500" font-size="30" fill="#646973">@${esc(
    handle
  )}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

import React, {useEffect, useRef, useState} from "react";
import {profile} from "../../data/portfolio";
import "./companions.css";

const firstName = profile.name.split(" ")[0];
const LINES = [
  `Hi, I'm ${firstName}! 👋`,
  profile.currentTitle,
  "I design APIs and services in Node.js.",
  "My work is further down ↓",
  "Meet my cat 🐈",
  "Want to build something? Say hi!"
];

// 3D Manal and cat wandering along the bottom of the viewport. Three.js loads lazily.
export default function Companions({reduced}) {
  const canvasRef = useRef(null);
  const manBubbleRef = useRef(null);
  const catBubbleRef = useRef(null);
  const [manLine, setManLine] = useState(null);
  const [catLine, setCatLine] = useState(null);
  const lineIdx = useRef(0);
  const timers = useRef({});

  useEffect(() => {
    let stop;
    let cancelled = false;
    const place = (el, p) => {
      if (el)
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -100%)`;
    };
    import("./three/scene.js")
      .then(({startScene}) => {
        if (cancelled || !canvasRef.current) return;
        stop = startScene(canvasRef.current, {
          reduced,
          onHit: who => {
            clearTimeout(timers.current[who]);
            if (who === "man") {
              setManLine(LINES[lineIdx.current++ % LINES.length]);
              timers.current.man = setTimeout(() => setManLine(null), 3200);
            } else {
              setCatLine("Meow!");
              timers.current.cat = setTimeout(() => setCatLine(null), 1400);
            }
          },
          onFrame: pos => {
            place(manBubbleRef.current, pos.man);
            place(catBubbleRef.current, pos.cat);
          }
        });
      })
      .catch(() => {
        // No WebGL / failed chunk: the theme works fine without the companions.
      });
    return () => {
      cancelled = true;
      stop?.();
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, [reduced]);

  return (
    <div className="mc-layer">
      <canvas ref={canvasRef} className="mc-canvas" aria-hidden="true" />
      <span
        ref={manBubbleRef}
        className={`mc-bubble ${manLine ? "is-on" : ""}`}
        role="status"
      >
        {manLine}
      </span>
      <span
        ref={catBubbleRef}
        className={`mc-bubble mc-bubble-cat ${catLine ? "is-on" : ""}`}
      >
        {catLine}
      </span>
    </div>
  );
}

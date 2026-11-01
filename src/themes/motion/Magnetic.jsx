import React, {useRef} from "react";

// Wraps a link/button so it drifts toward the pointer while hovered.
export default function Magnetic({
  as: Tag = "a",
  strength = 0.35,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const onMove = e => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const reset = () => {
    ref.current.style.transform = "";
  };
  return (
    <Tag
      ref={ref}
      className={`m-magnetic ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </Tag>
  );
}

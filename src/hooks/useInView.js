import {useEffect} from "react";

// Adds `is-in` to each `[data-anim]` inside `rootRef` the first time it enters
// the viewport. Content is visible by default; CSS hides it only under
// `.anim-on`, which is set when motion is allowed.
export default function useInView(rootRef, enabled) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-anim]");
    if (!enabled || !("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      {threshold: 0.2, rootMargin: "0px 0px -8% 0px"}
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, enabled]);
}

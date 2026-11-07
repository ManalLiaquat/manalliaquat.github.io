import {useEffect} from "react";

// Scroll + pointer parallax for every `[data-px]` element inside `rootRef`.
//
// Each element is measured against its closest `[data-px-scope]` (an untransformed
// section), so the offset is zero when that section sits centred in the viewport,
// or, for `data-px-scope="top"` (a scope at the top of the page), at scroll 0.
//   data-px-y="0.3"    vertical drift per scrolled px (+ lags behind, - runs ahead)
//   data-px-x="0.15"   horizontal drift per scrolled px
//   data-px-depth="12" max px the layer leans with a fine pointer
//   data-px-fade       fades out as the scope scrolls up past the top
//
// Only the CSS `translate` property is written, so existing `transform`
// animations (reveals, hovers, magnetic buttons) keep working untouched.
export default function useParallax(rootRef, enabled) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    const layers = [...root.querySelectorAll("[data-px]")].map(el => ({
      el,
      scope: el.closest("[data-px-scope]") || el.parentElement,
      y: parseFloat(el.dataset.pxY) || 0,
      x: parseFloat(el.dataset.pxX) || 0,
      depth: parseFloat(el.dataset.pxDepth) || 0,
      fade: "pxFade" in el.dataset,
      fromTop: (el.closest("[data-px-scope]") || {}).dataset?.pxScope === "top"
    }));
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = {x: 0, y: 0, tx: 0, ty: 0};
    let frame = 0;

    const render = () => {
      frame = 0;
      const vh = window.innerHeight;
      const rects = new Map();
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      for (const l of layers) {
        let r = rects.get(l.scope);
        if (!r) rects.set(l.scope, (r = l.scope.getBoundingClientRect()));
        if (r.bottom < -vh || r.top > vh * 2) continue; // far offscreen
        // A scope marked "top" (the hero) rests at zero at scroll 0; others
        // rest when centred in the viewport.
        const delta = l.fromTop
          ? window.scrollY
          : vh / 2 - (r.top + r.height / 2);
        const dx = delta * l.x + pointer.x * l.depth;
        const dy = delta * l.y + pointer.y * l.depth;
        l.el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
        if (l.fade) {
          const gone = Math.min(Math.max(-r.top / (r.height * 0.6), 0), 1);
          l.el.style.opacity = (1 - gone).toFixed(3);
        }
      }

      const settling =
        Math.abs(pointer.tx - pointer.x) > 0.001 ||
        Math.abs(pointer.ty - pointer.y) > 0.001;
      if (settling) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onPointer = e => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    render();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule);
    if (finePointer) window.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      layers.forEach(({el}) => {
        el.style.translate = "";
        el.style.opacity = "";
      });
    };
  }, [rootRef, enabled]);
}

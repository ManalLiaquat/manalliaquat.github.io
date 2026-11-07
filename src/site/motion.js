import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// All scroll choreography for the page. Returns a cleanup function.
// Under reduced motion: no smooth scroll, no scrubbing, everything in its
// final state; only the light/dark tone switch and nav state remain.
export function choreograph(root, {reduced}) {
  const nav = root.querySelector("[data-nav]");
  let lenis = null;
  const unbind = [];
  const tick = time => lenis && lenis.raf(time * 1000);

  const ctx = gsap.context(() => {
    // tone: the page fades to paper for credentials and writing
    root.querySelectorAll("[data-tone='light']").forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: self => root.classList.toggle("is-light", self.isActive)
      });
    });

    // nav: active section link
    const links = [...root.querySelectorAll("[data-nav-link]")];
    links.forEach(a => {
      const sec = root.querySelector(a.getAttribute("href"));
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: self => a.classList.toggle("is-active", self.isActive)
      });
    });

    if (reduced) return;

    // smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
    lenis = new Lenis({lerp: 0.11, wheelMultiplier: 1});
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // nav hides on the way down, returns on the way up
    let shown = true;
    lenis.on("scroll", ({scroll, direction}) => {
      const want = scroll < 120 || direction < 0;
      if (want !== shown) {
        shown = want;
        gsap.to(nav, {
          yPercent: want ? 0 : -150,
          duration: 0.45,
          ease: "power3.out"
        });
      }
      nav.classList.toggle("is-scrolled", scroll > 40);
    });

    // anchor links glide
    root.querySelectorAll("a[href^='#']").forEach(a => {
      const onClick = e => {
        const id = a.getAttribute("href");
        const target = id === "#top" ? 0 : root.querySelector(id);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: id === "#top" ? 0 : -20,
          duration: 1.4
        });
      };
      a.addEventListener("click", onClick);
      unbind.push(() => a.removeEventListener("click", onClick));
    });

    // hero arrival
    const hero = root.querySelector("[data-hero]");
    gsap
      .timeline({defaults: {ease: "power4.out"}})
      .fromTo(
        hero.querySelectorAll(".hero-line .ch"),
        {yPercent: 115, y: 0},
        {yPercent: 0, y: 0, duration: 1.1, stagger: 0.04}
      )
      .fromTo(
        root.querySelectorAll("[data-hero-fade]"),
        {opacity: 0, y: 24},
        {opacity: 1, y: 0, duration: 0.9, stagger: 0.08},
        "-=0.75"
      );
    root.classList.add("hero-go");

    // hero leaves: the name drifts up and recedes as you scroll away
    gsap.to(hero, {
      yPercent: -18,
      scale: 0.94,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    gsap.to(".hero-line-2", {
      xPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // statement: words light up as you scroll through the pinned paragraph
    gsap.fromTo(
      root.querySelectorAll("[data-statement] .word"),
      {opacity: 0.14},
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".statement",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6
        }
      }
    );

    // section titles rise out of their masks; supporting bits fade up
    root.querySelectorAll("[data-reveal-lines]").forEach(el => {
      gsap.from(el.querySelectorAll(".line"), {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {trigger: el, start: "top 85%"}
      });
    });
    root.querySelectorAll("[data-fade]").forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {trigger: el, start: "top 88%"}
      });
    });

    // experience: cards stack; each one recedes as the next slides over it
    const cards = [...root.querySelectorAll("[data-card]")];
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      gsap.from(
        card.querySelectorAll(".card-company, .card-role, .card-notes li"),
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {trigger: card, start: "top 75%"}
        }
      );
      if (!next) return;
      gsap.to(card, {
        scale: 0.9,
        filter: "brightness(0.4)",
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top 15%",
          scrub: true
        }
      });
    });

    // skills: rows run in opposite directions and surge with scroll speed
    const rows = [...root.querySelectorAll("[data-marquee]")].map(row => {
      const dir = Number(row.dataset.marquee);
      const track = row.querySelector(".marquee-track");
      const tween = gsap.fromTo(
        track,
        {xPercent: dir > 0 ? 0 : -50},
        {xPercent: dir > 0 ? -50 : 0, duration: 38, ease: "none", repeat: -1}
      );
      return tween;
    });
    let boost = {v: 1};
    ScrollTrigger.create({
      trigger: ".skills",
      start: "top bottom",
      end: "bottom top",
      onUpdate: self => {
        const v = Math.min(Math.abs(self.getVelocity()) / 220, 6);
        gsap.to(boost, {
          v: 1 + v,
          duration: 0.2,
          overwrite: true,
          onUpdate: () => rows.forEach(t => t.timeScale(boost.v)),
          onComplete: () =>
            gsap.to(boost, {
              v: 1,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => rows.forEach(t => t.timeScale(boost.v))
            })
        });
      }
    });
    gsap.from(".marquee", {
      x: i => (i % 2 ? 120 : -120),
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {trigger: ".marquees", start: "top 85%"}
    });

    // credentials: rows wipe in one after another
    gsap.from(root.querySelectorAll("[data-row]"), {
      clipPath: "inset(0 100% 0 0)",
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.07,
      scrollTrigger: {trigger: ".rows", start: "top 80%"}
    });

    // contact: the closing line scales up into place
    gsap.from(".contact-big", {
      scale: 0.86,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact",
        start: "top bottom",
        end: "top 25%",
        scrub: true
      }
    });
  }, root);

  // fonts and images change layout; recompute trigger positions once settled
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    unbind.forEach(f => f());
    gsap.ticker.remove(tick);
    lenis?.destroy();
    ctx.revert();
    root.classList.remove("is-light", "hero-go");
  };
}

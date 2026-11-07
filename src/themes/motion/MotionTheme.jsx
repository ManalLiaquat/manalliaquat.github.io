import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  profile,
  socials,
  experience,
  allSkills,
  certifications,
  blogs
} from "../../data/portfolio";
import useReducedMotion from "../../hooks/useReducedMotion";
import useReveal from "../../hooks/useReveal";
import useParallax from "../../hooks/useParallax";
import NodeField from "./NodeField.jsx";
import Magnetic from "./Magnetic.jsx";
import Companions from "./Companions.jsx";
import "./motion.css";

function SplitWord({text, delay = 0, ...rest}) {
  return (
    <span className="m-split" aria-label={text} {...rest}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{animationDelay: `${delay + i * 0.04}s`}}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function ExperienceList() {
  const [hover, setHover] = useState(null);
  const floatRef = useRef(null);
  const onMove = e => {
    const el = floatRef.current;
    if (el)
      el.style.transform = `translate(${e.clientX + 24}px, ${
        e.clientY - 60
      }px)`;
  };
  return (
    <div
      className="m-exp"
      onPointerMove={onMove}
      onPointerLeave={() => setHover(null)}
    >
      {experience.map((e, i) => (
        <div
          key={e.company}
          className="m-exp-row"
          data-reveal
          style={{transitionDelay: `${i * 0.08}s`}}
          onPointerEnter={ev => {
            if (ev.pointerType !== "mouse") return;
            onMove(ev);
            setHover(e);
          }}
        >
          <span className="m-exp-idx">0{i + 1}</span>
          <div className="m-exp-main">
            <h3>{e.company}</h3>
            <p>
              {e.role} — {e.highlights.join(", ")}
            </p>
          </div>
          <span className="m-exp-date">
            {e.start} – {e.end}
          </span>
        </div>
      ))}
      <div
        ref={floatRef}
        className={`m-float ${hover ? "is-on" : ""}`}
        aria-hidden="true"
      >
        {hover && <img src={hover.logo} alt="" />}
      </div>
    </div>
  );
}

function Rail({reduced}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const update = () => setPinned(desktop.matches && !reduced);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reduced]);

  // Cards sit at alternating depths: as each one crosses the viewport it rises or
  // sinks a little, and its logo slides against the card face.
  const drift = useCallback(() => {
    if (reduced) return;
    const mid = window.innerWidth / 2;
    trackRef.current.querySelectorAll(".m-card").forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const d = (r.left + r.width / 2 - mid) / window.innerWidth;
      if (Math.abs(d) > 1.2) return;
      card.style.translate = `0 ${(d * (i % 2 ? 56 : -40)).toFixed(1)}px`;
      const img = card.querySelector("img, h3");
      if (img) img.style.translate = `${(-d * 36).toFixed(1)}px 0`;
    });
  }, [reduced]);

  useEffect(() => {
    if (pinned || reduced) return;
    const scroller = sectionRef.current.querySelector(".m-rail-sticky");
    drift();
    scroller.addEventListener("scroll", drift, {passive: true});
    return () => scroller.removeEventListener("scroll", drift);
  }, [pinned, reduced, drift]);

  useEffect(() => {
    if (!reduced) return;
    trackRef.current
      .querySelectorAll(".m-card, .m-card img, .m-card h3")
      .forEach(el => (el.style.translate = ""));
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned) {
      track.style.transform = "";
      section.style.height = "";
      return;
    }
    const layout = () => {
      const distance = track.scrollWidth - window.innerWidth;
      section.style.height = `${window.innerHeight + Math.max(distance, 0)}px`;
    };
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const distance = track.scrollWidth - window.innerWidth;
      const progress = Math.min(
        Math.max(-rect.top / (rect.height - window.innerHeight), 0),
        1
      );
      track.style.transform = `translate3d(${
        -progress * Math.max(distance, 0)
      }px,0,0)`;
      drift();
    };
    layout();
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
    };
  }, [pinned, drift]);

  return (
    <section
      ref={sectionRef}
      className={`m-rail ${pinned ? "is-pinned" : ""}`}
      id="m-proof"
    >
      <div className="m-rail-sticky">
        <div className="m-rail-track" ref={trackRef}>
          <div className="m-rail-intro">
            <p className="m-eyebrow">Proof of work</p>
            <h2>
              Certified,
              <br />
              written,
              <br />
              shipped.
            </h2>
            {pinned && <p className="m-hint">keep scrolling →</p>}
          </div>
          {certifications.map(c => {
            const Tag = c.url ? "a" : "div";
            return (
              <Tag
                key={c.title}
                className="m-card"
                {...(c.url
                  ? {href: c.url, target: "_blank", rel: "noreferrer"}
                  : {})}
              >
                <span className="m-card-type">Certificate</span>
                <img src={c.image} alt="" loading="lazy" />
                <h3>{c.title}</h3>
                <p>{c.issuer}</p>
                {c.url && <span className="m-card-go">View ↗</span>}
              </Tag>
            );
          })}
          {blogs.map(b => (
            <a
              key={b.url}
              className="m-card m-card-blog"
              href={b.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="m-card-type">Article</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
              <span className="m-card-go">Read on Medium ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MotionTheme() {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  useReveal(rootRef);
  useParallax(rootRef, !reduced);

  return (
    <div
      className={`motion-theme ${reduced ? "is-reduced" : ""}`}
      ref={rootRef}
    >
      <header className="m-hero" data-px-scope>
        <div
          className="m-hero-depth"
          data-px
          data-px-y="0.55"
          data-px-depth="-18"
        >
          <NodeField reduced={reduced} />
        </div>
        <div className="m-hero-inner">
          <p
            className="m-eyebrow m-fade"
            data-px
            data-px-y="0.08"
            data-px-depth="6"
            data-px-fade
          >
            {profile.currentTitle}
          </p>
          <h1>
            <SplitWord
              text="Manal"
              data-px
              data-px-y="0.16"
              data-px-x="0.1"
              data-px-depth="10"
            />
            <br />
            <SplitWord
              text="Liaquat."
              delay={0.2}
              data-px
              data-px-y="0.3"
              data-px-x="-0.1"
              data-px-depth="16"
            />
          </h1>
          <p
            className="m-lede m-fade"
            data-px
            data-px-y="0.45"
            data-px-depth="22"
            data-px-fade
          >
            {profile.tagline}
          </p>
          <div
            className="m-ctas m-fade"
            data-px
            data-px-y="0.56"
            data-px-depth="28"
            data-px-fade
          >
            <Magnetic href="#m-work" className="m-btn m-btn-solid">
              See the work
            </Magnetic>
            <Magnetic href={`mailto:${profile.email}`} className="m-btn">
              Say hi
            </Magnetic>
          </div>
        </div>
        <span
          className="m-scroll"
          aria-hidden="true"
          data-px
          data-px-y="-0.5"
          data-px-fade
        >
          scroll
        </span>
      </header>

      <div className="m-marquee" aria-label="Skills" data-px-scope>
        <div className="m-marquee-drift" data-px data-px-x="0.45">
          <div className="m-marquee-track">
            {[0, 1].map(k => (
              <span key={k} aria-hidden={k === 1}>
                {allSkills.map(s => (
                  <React.Fragment key={s}>
                    {s} <i>✦</i>{" "}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="m-about" data-reveal>
        <p>{profile.summary}</p>
      </section>

      <section className="m-section" id="m-work">
        <p className="m-eyebrow" data-reveal>
          Experience
        </p>
        <h2 className="m-h2" data-reveal>
          Where I've built things
        </h2>
        <ExperienceList />
      </section>

      <Rail reduced={reduced} />

      <section className="m-contact" id="m-contact" data-px-scope>
        <p className="m-eyebrow" data-reveal>
          Contact
        </p>
        <div data-px data-px-y="-0.12">
          <h2 data-reveal>Let's build something.</h2>
        </div>
        <Magnetic
          href={`mailto:${profile.email}`}
          className="m-mail"
          strength={0.15}
        >
          {profile.email}
        </Magnetic>
        <div className="m-socials" data-reveal>
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
        </div>
        <p className="m-foot">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </section>
      <Companions reduced={reduced} />
    </div>
  );
}

import React, {useCallback, useLayoutEffect, useRef, useState} from "react";
import {
  profile,
  socials,
  experience,
  skillGroups,
  certifications,
  blogs
} from "./data/portfolio";
import useReducedMotion from "./hooks/useReducedMotion";
import {Arrow, Cursor, Intro, Letters, Magnetic} from "./site/parts.jsx";
import {choreograph} from "./site/motion";
import "./site/site.css";

const NAV = [
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["Credentials", "#credentials"],
  ["Writing", "#writing"]
];

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

function Header() {
  return (
    <header className="nav" data-nav>
      <a className="nav-home" href="#top">
        <span className="nav-mono" aria-hidden="true">
          ML
        </span>
        <span className="nav-name">{profile.name}</span>
      </a>
      <nav aria-label="Sections">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} data-nav-link>
            {label}
          </a>
        ))}
      </nav>
      <a className="btn btn-sm" href="#contact">
        Contact
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner" data-hero>
        <p className="badge" data-hero-fade>
          <span className="badge-dot" aria-hidden="true" />
          Currently {profile.currentTitle}
        </p>
        <h1 className="hero-name">
          <Letters text={firstName} className="hero-line" />
          <Letters text={lastName} className="hero-line hero-line-2" />
        </h1>
        <div className="hero-foot">
          <p className="hero-tag" data-hero-fade>
            {profile.tagline}
          </p>
          <div className="hero-ctas" data-hero-fade>
            <Magnetic
              className="btn btn-solid"
              href={`mailto:${profile.email}`}
            >
              Email me <Arrow />
            </Magnetic>
            <Magnetic className="btn" href="#work">
              See the work
            </Magnetic>
          </div>
        </div>
      </div>
      <span className="scroll-cue" aria-hidden="true" data-hero-fade>
        <span>Scroll</span>
      </span>
    </section>
  );
}

function Statement() {
  const words = profile.summary.split(" ");
  return (
    <section className="statement" aria-label="About">
      <div className="statement-sticky">
        <p className="statement-text" data-statement>
          {words.map((w, i) => (
            <span className="word" key={i}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function SectionHead({title, count}) {
  return (
    <div className="sec-head">
      <h2 className="sec-title" data-reveal-lines>
        <span className="line-mask">
          <span className="line">{title}</span>
        </span>
      </h2>
      {count && (
        <p className="sec-count" data-fade>
          {count}
        </p>
      )}
    </div>
  );
}

function Work() {
  return (
    <section className="work" id="work">
      <SectionHead
        title="Experience"
        count={`${experience.length} roles · 2019 – now`}
      />
      <ol className="stack">
        {experience.map((job, i) => (
          <li className="card" key={job.company} data-card style={{"--i": i}}>
            <div className="card-top">
              <span className="card-date">
                {job.start} – {job.end}
              </span>
              <img className="card-logo" src={job.logo} alt="" loading="lazy" />
            </div>
            <h3 className="card-company">{job.company}</h3>
            <p className="card-role">{job.role}</p>
            <ul className="card-notes">
              {job.highlights.map(h => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <SectionHead title="Skills" />
      <div className="marquees">
        {skillGroups.map((g, i) => (
          <div
            className={`marquee ${g.items.length < 3 ? "marquee-static" : ""}`}
            key={g.group}
            {...(g.items.length < 3 ? {} : {"data-marquee": i % 2 ? -1 : 1})}
          >
            <span className="marquee-label">{g.group}</span>
            <div className="marquee-viewport">
              <div className="marquee-track">
                {(g.items.length < 3 ? [0] : [0, 1, 2, 3]).map(k => (
                  <span className="marquee-set" key={k} aria-hidden={k > 0}>
                    {g.items.map(s => (
                      <span className="pill" key={s}>
                        {s}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  const imgRef = useRef(null);
  const [hover, setHover] = useState(null);
  const onMove = e => {
    const el = imgRef.current;
    if (el) el.style.translate = `${e.clientX + 28}px ${e.clientY - 70}px`;
  };
  return (
    <section className="creds" id="credentials" data-tone="light">
      <SectionHead
        title="Credentials"
        count={`${certifications.length} certificates`}
      />
      <ul
        className="rows"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {certifications.map(c => {
          const Tag = c.url ? "a" : "div";
          return (
            <li key={c.title} data-row>
              <Tag
                className="row"
                {...(c.url
                  ? {
                      href: c.url,
                      target: "_blank",
                      rel: "noreferrer",
                      "data-cursor": "Verify"
                    }
                  : {})}
                onPointerEnter={e => {
                  if (e.pointerType !== "mouse") return;
                  onMove(e);
                  setHover(c);
                }}
              >
                <span className="row-title">{c.title}</span>
                <span className="row-meta">{c.issuer}</span>
                <span className="row-go">
                  {c.url ? (
                    <>
                      Verify <Arrow external />
                      <span className="sr-only"> (opens in new tab)</span>
                    </>
                  ) : null}
                </span>
              </Tag>
            </li>
          );
        })}
      </ul>
      <div
        className={`float ${hover ? "is-on" : ""}`}
        ref={imgRef}
        aria-hidden="true"
      >
        {hover && <img src={hover.image} alt="" />}
      </div>
    </section>
  );
}

function Writing() {
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section className="writing" id="writing" data-tone="light">
      <SectionHead title="Writing" />
      <div className="posts">
        {blogs.map(b => (
          <a
            key={b.url}
            className="post"
            href={b.url}
            target="_blank"
            rel="noreferrer"
            onPointerMove={onMove}
            data-cursor="Read"
            data-fade
          >
            <h3>{b.title}</h3>
            <p>{b.description}</p>
            <span className="post-go">
              Read on Medium <Arrow external />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="contact-big" data-reveal-lines>
        <span className="line-mask">
          <span className="line">Let's build</span>
        </span>
        <span className="line-mask">
          <span className="line">something.</span>
        </span>
      </h2>
      <div className="contact-row" data-fade>
        <Magnetic
          className="btn btn-solid btn-lg"
          href={`mailto:${profile.email}`}
          strength={0.2}
        >
          {profile.email} <Arrow />
        </Magnetic>
      </div>
      <ul className="socials" data-fade>
        {socials.map(s => (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="me noreferrer">
              {s.name} <Arrow external />
            </a>
          </li>
        ))}
      </ul>
      <footer className="foot">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top">Back to top</a>
      </footer>
    </section>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const done = useCallback(() => setIntroDone(true), []);

  useLayoutEffect(() => {
    if (!introDone) return undefined;
    return choreograph(rootRef.current, {reduced});
  }, [introDone, reduced]);

  return (
    <div className={`site ${reduced ? "" : "motion"}`} ref={rootRef}>
      <a className="skip" href="#work">
        Skip to content
      </a>
      <Intro name={profile.name} onDone={done} />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Skills />
        <Credentials />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}

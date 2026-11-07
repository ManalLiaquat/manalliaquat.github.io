import React, {useEffect, useRef} from "react";
import {
  profile,
  socials,
  experience,
  lines,
  skillGroups,
  certifications,
  blogs
} from "./data/portfolio";
import useReducedMotion from "./hooks/useReducedMotion";
import useParallax from "./hooks/useParallax";
import NetworkMap from "./site/NetworkMap.jsx";
import {Arrow, Bullet, LineTag, Mark} from "./site/parts.jsx";
import {slug} from "./site/time";
import "./site/site.css";

const NAV = [
  ["Stations", "#stations"],
  ["Lines", "#lines"],
  ["Credentials", "#credentials"],
  ["Writing", "#writing"]
];

function Header() {
  return (
    <header className="top">
      <a
        className="top-home"
        href="#top"
        aria-label="Manal Liaquat, back to the map"
      >
        <Mark />
        <span>Manal Liaquat</span>
      </a>
      <nav aria-label="Sections">
        {NAV.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="sign sign-sm" href={`mailto:${profile.email}`}>
        Email Manal <Arrow />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-px-scope>
      <div className="hero-head">
        <div className="title" data-px data-px-y="0.1" data-px-depth="-4">
          <h1>{profile.name}</h1>
          <p className="title-role">{profile.currentTitle}</p>
          <p className="title-tag">{profile.tagline}</p>
        </div>
        <aside className="key" aria-label="Map key">
          <h2 className="key-h">Key</h2>
          <ul>
            {lines
              .filter(l => l.id !== "tooling")
              .map(l => (
                <li key={l.id}>
                  <span className={`key-line line-${l.id}`} />
                  {l.name} line
                </li>
              ))}
            <li>
              <span className="key-ring" /> Interchange: role on two lines
            </li>
            <li>
              <span className="key-term" /> End of line
            </li>
          </ul>
        </aside>
      </div>
      <NetworkMap />
    </section>
  );
}

// Which line joins this station to the next one down the guide.
function linkLine(a, b) {
  return a.lines.find(l => b && b.lines.includes(l)) || a.lines[0];
}

function Stations({reduced}) {
  const listRef = useRef(null);

  // The guide's line fills in as you scroll and stations light up when reached.
  useEffect(() => {
    const items = [...listRef.current.children];
    if (reduced) {
      items.forEach(li => {
        li.style.setProperty("--p", 1);
        li.classList.add("is-reached");
      });
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const mark = window.innerHeight * 0.62;
      items.forEach(li => {
        const r = li.getBoundingClientRect();
        const p = Math.min(Math.max((mark - r.top) / r.height, 0), 1);
        li.style.setProperty("--p", p.toFixed(3));
        li.classList.toggle("is-reached", r.top < mark);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return (
    <section className="band stations" id="stations">
      <div className="stations-intro">
        <h2 className="h2">Stations</h2>
        <p className="lede">{profile.summary}</p>
      </div>
      <ol className="guide" ref={listRef}>
        {experience.map((job, i) => {
          const next = experience[i + 1];
          return (
            <li
              key={job.company}
              id={`station-${slug(job.company)}`}
              className={`stop seg-${next ? linkLine(job, next) : "none"}`}
            >
              <span className="stop-disc" aria-hidden="true" />
              <div className="stop-body">
                <div className="stop-head">
                  <h3>{job.company}</h3>
                  <p className="stop-date">
                    <time>{job.start}</time> – <time>{job.end}</time>
                  </p>
                </div>
                <p className="stop-role">{job.role}</p>
                <ul className="stop-notes">
                  {job.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="stop-lines">
                  {job.lines.map(l => (
                    <LineTag key={l} id={l} />
                  ))}
                </p>
              </div>
              <img className="stop-logo" src={job.logo} alt="" loading="lazy" />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Lines() {
  return (
    <section className="band lines" id="lines">
      <h2 className="h2">Lines</h2>
      <p className="lede lede-sm">Every tool I work with, by line.</p>
      <div className="strips">
        {skillGroups.map(g => {
          const id = g.group.toLowerCase();
          return (
            <div key={id} className={`strip line-${id}`}>
              <h3 className="strip-name">
                <Bullet id={id} size="lg" />
                {g.group}
              </h3>
              <ol className="strip-stops">
                {g.items.map(s => (
                  <li key={s}>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section className="band" id="credentials">
      <h2 className="h2">Credentials</h2>
      <div className="table-wrap">
        <table className="timetable">
          <thead>
            <tr>
              <th scope="col">Credential</th>
              <th scope="col">Issued by</th>
              <th scope="col">
                <span className="sr-only">Verification</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {certifications.map(c => (
              <tr key={c.title}>
                <th scope="row">{c.title}</th>
                <td>{c.issuer}</td>
                <td className="tt-check">
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noreferrer">
                      Verify <Arrow external />
                      <span className="sr-only">
                        {" "}
                        {c.title} (opens in new tab)
                      </span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section className="band" id="writing">
      <h2 className="h2">Writing</h2>
      <ul className="posts">
        {blogs.map(b => (
          <li key={b.url}>
            <a href={b.url} target="_blank" rel="noreferrer">
              <h3>{b.title}</h3>
              <p>{b.description}</p>
              <span className="posts-go">
                Read on Medium <Arrow external />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className="terminus" id="contact" data-px-scope>
      <div className="terminus-line" aria-hidden="true">
        <span />
      </div>
      <h2 className="terminus-h">Where to next?</h2>
      <a className="sign sign-lg" href={`mailto:${profile.email}`}>
        {profile.email} <Arrow />
      </a>
      <h3 className="conn-h">Connections</h3>
      <ul className="conn">
        {socials.map(s => (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="me noreferrer">
              <strong>{s.name}</strong>
              <span>{s.short}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="foot">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </section>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  useParallax(rootRef, !reduced);
  return (
    <div className="site" ref={rootRef}>
      <a className="skip" href="#stations">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Stations reduced={reduced} />
        <Lines />
        <Credentials />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}

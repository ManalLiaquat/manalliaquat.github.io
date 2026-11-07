import React, {useEffect, useRef, useState} from "react";
import {
  profile,
  socials,
  experience,
  skillGroups,
  certifications,
  blogs
} from "../../data/portfolio";
import useReducedMotion from "../../hooks/useReducedMotion";
import useReveal from "../../hooks/useReveal";
import {COMMAND_NAMES, runCommand} from "./commands.jsx";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-600.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "./terminal.css";

const PROMPT = `${profile.handle}@portfolio:~$`;
const QUICK = ["help", "whoami", "experience", "skills", "contact"];

function Terminal({onThemeChange, scrollTo}) {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booting, setBooting] = useState(true);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const exec = raw => {
    const result = runCommand(raw, {onThemeChange, scrollTo});
    if (result.clear) {
      setLines([]);
    } else {
      setLines(prev => [
        ...prev,
        {cmd: raw, output: result.output, id: prev.length + Math.random()}
      ]);
    }
    if (raw.trim()) setHistory(h => [raw, ...h]);
    setHistIdx(-1);
  };

  // Boot: type `whoami` then run it.
  useEffect(() => {
    if (reduced) {
      exec("whoami");
      setBooting(false);
      return;
    }
    const word = "whoami";
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setInput(word.slice(0, i));
      if (i === word.length) {
        clearInterval(timer);
        setTimeout(() => {
          setInput("");
          exec(word);
          setBooting(false);
        }, 250);
      }
    }, 90);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      const matches = COMMAND_NAMES.filter(c =>
        c.startsWith(input.trim().toLowerCase())
      );
      if (input.trim() && matches.length) {
        e.preventDefault();
        if (matches.length === 1) setInput(matches[0] + " ");
        else
          setLines(prev => [
            ...prev,
            {
              cmd: input,
              output: <span className="t-dim">{matches.join("  ")}</span>,
              id: Math.random()
            }
          ]);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const focusInput = () => {
    if (window.getSelection().toString()) return;
    inputRef.current?.focus({preventScroll: true});
  };

  return (
    <div className="t-window" onClick={focusInput}>
      <div className="t-titlebar">
        <span className="t-dot red" />
        <span className="t-dot yellow" />
        <span className="t-dot green" />
        <span className="t-title">{profile.handle}@portfolio — zsh</span>
      </div>
      <div className="t-body" ref={bodyRef} aria-live="polite">
        <div className="t-dim t-motd">
          Last login: {new Date().toDateString()} on ttys001
          <br />
          Type <span className="t-accent">help</span> to see what you can do.
          Tab completes, ↑/↓ recalls history.
        </div>
        {lines.map(line => (
          <div key={line.id} className="t-entry">
            <div>
              <span className="t-prompt">{PROMPT}</span> {line.cmd}
            </div>
            {line.output && <div className="t-output">{line.output}</div>}
          </div>
        ))}
        <label className="t-inputline">
          <span className="t-prompt">{PROMPT}</span>
          <span className="sr-only">Terminal command</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            readOnly={booting}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </label>
      </div>
      <div className="t-quick" onClick={e => e.stopPropagation()}>
        {QUICK.map(q => (
          <button
            key={q}
            type="button"
            onClick={() => exec(q)}
            disabled={booting}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  const job = experience[active];
  return (
    <div className="tl" data-reveal>
      <div className="tl-rail" role="tablist" aria-label="Roles">
        {experience.map((e, i) => (
          <button
            key={e.company}
            role="tab"
            aria-selected={i === active}
            className={`tl-node ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="tl-dot" />
            <span className="tl-when">{e.start}</span>
            <span className="tl-co">{e.company}</span>
          </button>
        ))}
      </div>
      <div className="tl-panel" role="tabpanel" key={job.company}>
        <img src={job.logo} alt="" className="tl-logo" />
        <div>
          <div className="t-yellow">
            {job.start} — {job.end}
          </div>
          <h3>
            {job.role} <span className="t-accent">@ {job.company}</span>
          </h3>
          <ul>
            {job.highlights.map(h => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function TerminalTheme({onThemeChange}) {
  const rootRef = useRef(null);
  useReveal(rootRef);
  const scrollTo = id =>
    document.getElementById(`t-${id}`)?.scrollIntoView({behavior: "smooth"});

  return (
    <div className="term-theme" ref={rootRef}>
      <header className="t-hero">
        <div className="t-hero-copy">
          <p className="t-kicker">// {profile.currentTitle}</p>
          <h1>{profile.name}</h1>
          <p className="t-tagline">{profile.tagline}</p>
          <nav className="t-nav" aria-label="Sections">
            {["experience", "skills", "certs", "blog", "contact"].map(s => (
              <a key={s} href={`#t-${s}`}>
                ./{s}
              </a>
            ))}
          </nav>
        </div>
        <Terminal onThemeChange={onThemeChange} scrollTo={scrollTo} />
      </header>

      <main>
        <section id="t-experience" className="t-section">
          <h2 data-reveal>
            <span className="t-accent">$</span> cat experience.log
          </h2>
          <Timeline />
        </section>

        <section id="t-skills" className="t-section">
          <h2 data-reveal>
            <span className="t-accent">$</span> ls ~/skills
          </h2>
          <div className="t-skills">
            {skillGroups.map(g => (
              <div key={g.group} className="t-card" data-reveal>
                <div className="t-yellow">{g.group.toLowerCase()}/</div>
                <div className="t-chips">
                  {g.items.map(s => (
                    <span key={s} className="t-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="t-certs" className="t-section">
          <h2 data-reveal>
            <span className="t-accent">$</span> ls ~/certs
          </h2>
          <div className="t-certs">
            {certifications.map(c => {
              const Tag = c.url ? "a" : "div";
              return (
                <Tag
                  key={c.title}
                  className="t-card t-cert"
                  data-reveal
                  {...(c.url
                    ? {href: c.url, target: "_blank", rel: "noreferrer"}
                    : {})}
                >
                  <img src={c.image} alt="" loading="lazy" />
                  <div>
                    <div className="t-bold">{c.title}</div>
                    <div className="t-dim">{c.issuer}</div>
                  </div>
                  {c.url && <span className="t-arrow">↗</span>}
                </Tag>
              );
            })}
          </div>
        </section>

        <section id="t-blog" className="t-section">
          <h2 data-reveal>
            <span className="t-accent">$</span> tail ~/blog
          </h2>
          <div className="t-blogs">
            {blogs.map(b => (
              <a
                key={b.url}
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="t-card t-blog"
                data-reveal
              >
                <div className="t-bold">{b.title} ↗</div>
                <p className="t-dim">{b.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="t-contact" className="t-section t-contact" data-reveal>
          <h2>
            <span className="t-accent">$</span> ./contact.sh
          </h2>
          <p>Discuss a project or just want to say hi? My inbox is open.</p>
          <a className="t-cta" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="t-socials">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer className="t-footer t-dim">
        © {new Date().getFullYear()} {profile.name} · exit 0
      </footer>
    </div>
  );
}

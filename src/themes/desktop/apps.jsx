import React from "react";
import {
  profile,
  socials,
  experience,
  skillGroups,
  certifications,
  blogs
} from "../../data/portfolio";

function About() {
  return (
    <div className="d-about">
      <div className="d-avatar" aria-hidden="true">
        ML
      </div>
      <h2>{profile.name}</h2>
      <p className="d-sub">{profile.currentTitle}</p>
      <p>{profile.summary}</p>
      <div className="d-tags">
        <span>Node.js</span>
        <span>React</span>
        <span>Next.js</span>
        <span>React Native</span>
        <span>MongoDB</span>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <ol className="d-exp">
      {experience.map(e => (
        <li key={e.company}>
          <img src={e.logo} alt="" />
          <div>
            <div className="d-exp-head">
              <strong>{e.role}</strong>
              <span className="d-muted">
                {e.start} – {e.end}
              </span>
            </div>
            <div className="d-exp-co">{e.company}</div>
            <ul>
              {e.highlights.map(h => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Skills() {
  return (
    <div className="d-skills">
      {skillGroups.map(g => (
        <section key={g.group}>
          <h3>{g.group}</h3>
          <div className="d-tags">
            {g.items.map(s => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Certificates() {
  return (
    <div className="d-files">
      {certifications.map(c => {
        const Tag = c.url ? "a" : "div";
        return (
          <Tag
            key={c.title}
            className="d-file"
            {...(c.url
              ? {href: c.url, target: "_blank", rel: "noreferrer"}
              : {})}
          >
            <img src={c.image} alt="" loading="lazy" />
            <span className="d-file-name">{c.title}</span>
            <span className="d-muted">
              {c.issuer}
              {c.url ? " ↗" : ""}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}

function Blog() {
  return (
    <div className="d-blog">
      {blogs.map(b => (
        <a key={b.url} href={b.url} target="_blank" rel="noreferrer">
          <strong>{b.title} ↗</strong>
          <p>{b.description}</p>
        </a>
      ))}
      <a
        className="d-blog-more"
        href={socials[2].url}
        target="_blank"
        rel="noreferrer"
      >
        More on Medium →
      </a>
    </div>
  );
}

function Contact() {
  return (
    <div className="d-contact">
      <div className="d-mail-row">
        <span className="d-muted">To:</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <div className="d-mail-row">
        <span className="d-muted">Subject:</span> Let's work together
      </div>
      <p>Discuss a project or just want to say hi? My inbox is open for all.</p>
      <a
        className="d-send"
        href={`mailto:${profile.email}?subject=${encodeURIComponent(
          "Let's work together"
        )}`}
      >
        Compose email
      </a>
      <div className="d-links">
        {socials.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
            {s.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export const APPS = [
  {
    id: "about",
    title: "About Me",
    icon: "👤",
    color: "#6366f1",
    Component: About,
    w: 440,
    h: 460
  },
  {
    id: "experience",
    title: "Experience",
    icon: "💼",
    color: "#f59e0b",
    Component: Experience,
    w: 520,
    h: 500
  },
  {
    id: "skills",
    title: "Skills",
    icon: "🧰",
    color: "#10b981",
    Component: Skills,
    w: 420,
    h: 400
  },
  {
    id: "certs",
    title: "Certificates",
    icon: "🏅",
    color: "#ec4899",
    Component: Certificates,
    w: 560,
    h: 440
  },
  {
    id: "blog",
    title: "Blog",
    icon: "✍️",
    color: "#0ea5e9",
    Component: Blog,
    w: 440,
    h: 380
  },
  {
    id: "contact",
    title: "Mail",
    icon: "✉️",
    color: "#ef4444",
    Component: Contact,
    w: 440,
    h: 420
  }
];

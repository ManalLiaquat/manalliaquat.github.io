import React from "react";
import {
  profile,
  socials,
  experience,
  skillGroups,
  coreSkills,
  certifications,
  blogs
} from "../../data/portfolio";

const THEME_IDS = ["terminal", "motion"];

export const COMMANDS = {
  help: "list available commands",
  whoami: "who is Manal?",
  experience: "work history",
  skills: "tech stack",
  certs: "certifications",
  blog: "articles on Medium",
  contact: "how to reach me",
  socials: "all profiles",
  theme: "switch theme: theme <terminal|motion>",
  goto: "scroll to a section: goto <experience|skills|certs|blog|contact>",
  clear: "clear the screen"
};

export const COMMAND_NAMES = Object.keys(COMMANDS);

const Link = ({href, children}) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

// Returns {output} to print, or {clear: true}. `ctx` provides side effects.
export function runCommand(raw, ctx) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const name = (cmd || "").toLowerCase();
  const arg = (args[0] || "").toLowerCase();

  switch (name) {
    case "":
      return {output: null};
    case "help":
      return {
        output: (
          <div className="t-grid">
            {COMMAND_NAMES.map(c => (
              <React.Fragment key={c}>
                <span className="t-accent">{c}</span>
                <span className="t-dim">{COMMANDS[c]}</span>
              </React.Fragment>
            ))}
          </div>
        )
      };
    case "whoami":
      return {
        output: (
          <div>
            <div>
              <span className="t-accent t-bold">{profile.name}</span> —{" "}
              {profile.currentTitle}
            </div>
            <div className="t-dim">{profile.summary}</div>
          </div>
        )
      };
    case "experience":
    case "work":
      return {
        output: (
          <div className="t-list">
            {experience.map(e => (
              <div key={e.company}>
                <span className="t-yellow">
                  {e.start} – {e.end}
                </span>{" "}
                <span className="t-bold">{e.role}</span> @{" "}
                <span className="t-accent">{e.company}</span>
                <div className="t-dim"> └ {e.highlights.join(" · ")}</div>
              </div>
            ))}
          </div>
        )
      };
    case "skills":
    case "stack":
      return {
        output: (
          <div className="t-grid">
            <span className="t-yellow">core/</span>
            <span className="t-bold">{coreSkills.join(" · ")}</span>
            {skillGroups.map(g => (
              <React.Fragment key={g.group}>
                <span className="t-yellow">{g.group.toLowerCase()}/</span>
                <span>{g.items.join(" · ")}</span>
              </React.Fragment>
            ))}
          </div>
        )
      };
    case "certs":
    case "certifications":
      return {
        output: (
          <div className="t-list">
            {certifications.map(c => (
              <div key={c.title}>
                <span className="t-accent">✔</span>{" "}
                {c.url ? <Link href={c.url}>{c.title}</Link> : c.title}{" "}
                <span className="t-dim">— {c.issuer}</span>
              </div>
            ))}
          </div>
        )
      };
    case "blog":
    case "blogs":
      return {
        output: (
          <div className="t-list">
            {blogs.map(b => (
              <div key={b.url}>
                <span className="t-accent">→</span>{" "}
                <Link href={b.url}>{b.title}</Link>
                <div className="t-dim"> {b.description}</div>
              </div>
            ))}
          </div>
        )
      };
    case "contact":
      return {
        output: (
          <div>
            <div>
              email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div>
              linkedin: <Link href={socials[1].url}>{socials[1].short}</Link>
            </div>
            <div className="t-dim">
              My inbox is open — say hi or pitch a project.
            </div>
          </div>
        )
      };
    case "socials":
      return {
        output: (
          <div className="t-grid">
            {socials.map(s => (
              <React.Fragment key={s.name}>
                <span className="t-yellow">{s.name.toLowerCase()}</span>
                <Link href={s.url}>{s.short}</Link>
              </React.Fragment>
            ))}
          </div>
        )
      };
    case "theme":
      if (!THEME_IDS.includes(arg)) {
        return {
          output: (
            <span className="t-dim">
              usage: theme &lt;{THEME_IDS.join("|")}&gt;
            </span>
          )
        };
      }
      if (arg !== "terminal") setTimeout(() => ctx.onThemeChange(arg), 350);
      return {output: <span className="t-accent">switching to {arg}…</span>};
    case "goto":
    case "cd": {
      const ok = ["experience", "skills", "certs", "blog", "contact"];
      if (!ok.includes(arg))
        return {
          output: (
            <span className="t-dim">usage: goto &lt;{ok.join("|")}&gt;</span>
          )
        };
      ctx.scrollTo(arg);
      return {output: <span className="t-dim">scrolling to #{arg}</span>};
    }
    case "clear":
      return {clear: true};
    case "sudo":
      return {
        output: (
          <span className="t-red">
            nice try. this incident will be reported. 🙂
          </span>
        )
      };
    case "ls":
      return {
        output: <span>experience/ skills/ certs/ blog/ contact.txt</span>
      };
    default:
      return {
        output: (
          <span>
            <span className="t-red">command not found:</span> {name}. Type{" "}
            <span className="t-accent">help</span>.
          </span>
        )
      };
  }
}

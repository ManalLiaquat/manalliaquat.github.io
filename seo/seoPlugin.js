// Build-time SEO: prerenders the content into index.html (for crawlers and AI agents
// that don't run JS), injects meta + JSON-LD, and emits robots/sitemap/llms files.
import {
  profile,
  socials,
  experience,
  skillGroups,
  allSkills,
  certifications,
  blogs
} from "../src/data/portfolio.js";

const SITE = profile.siteUrl;
const OG_IMAGE = `${SITE}og-image.png`;

const esc = s =>
  String(s).replace(
    /[&<>"']/g,
    c =>
      ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c])
  );

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");
const current = experience[0];

function jsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE}#person`,
    name: profile.name,
    givenName: firstName,
    familyName: lastName,
    url: SITE,
    image: profile.avatar,
    email: `mailto:${profile.email}`,
    jobTitle: current.role,
    description: profile.seoDescription,
    worksFor: {"@type": "Organization", name: current.company},
    knowsAbout: allSkills,
    sameAs: socials.map(s => s.url),
    hasOccupation: experience.map(e => ({
      "@type": "Occupation",
      name: e.role,
      description: `${e.role} at ${e.company} (${e.start} – ${
        e.end
      }): ${e.highlights.join(", ")}`
    })),
    hasCredential: certifications.map(c => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      credentialCategory: "certificate",
      recognizedBy: {"@type": "Organization", name: c.issuer},
      ...(c.url ? {url: c.url} : {})
    }))
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}#website`,
        url: SITE,
        name: profile.name,
        inLanguage: "en"
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE}#profile`,
        url: SITE,
        name: profile.seoTitle,
        isPartOf: {"@id": `${SITE}#website`},
        mainEntity: {"@id": `${SITE}#person`},
        dateModified: new Date().toISOString().slice(0, 10)
      },
      person,
      ...blogs.map(b => ({
        "@type": "BlogPosting",
        headline: b.title,
        url: b.url,
        description: b.description,
        author: {"@id": `${SITE}#person`}
      }))
    ]
  };
}

function headTags() {
  const t = esc(profile.seoTitle);
  const d = esc(profile.seoDescription);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${SITE}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${SITE}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(profile.name)} — ${esc(
      current.role
    )}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="profile:first_name" content="${esc(firstName)}" />`,
    `<meta property="profile:last_name" content="${esc(lastName)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${esc(profile.twitter)}" />`,
    `<meta name="twitter:creator" content="${esc(profile.twitter)}" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-readable profile" />`,
    `<link rel="sitemap" type="application/xml" href="/sitemap.xml" />`,
    ...socials.map(s => `<link rel="me" href="${esc(s.url)}" />`),
    `<script type="application/ld+json">${JSON.stringify(jsonLd()).replace(
      /</g,
      "\\u003c"
    )}</script>`
  ].join("\n    ");
}

function bodyHtml() {
  const link = (url, text) => `<a href="${esc(url)}">${esc(text)}</a>`;
  return `<div class="prerender">
      <header>
        <h1>${esc(profile.name)}</h1>
        <p><strong>${esc(profile.currentTitle)}</strong> — ${esc(
    profile.tagline
  )}</p>
        <p>${esc(profile.summary)}</p>
      </header>
      <section aria-labelledby="pr-exp"><h2 id="pr-exp">Experience</h2><ul>${experience
        .map(
          e =>
            `<li><h3>${esc(e.role)} at ${esc(e.company)}</h3><p>${esc(
              e.start
            )} – ${esc(e.end)}. ${esc(e.highlights.join(", "))}.</p></li>`
        )
        .join("")}</ul></section>
      <section aria-labelledby="pr-skills"><h2 id="pr-skills">Skills</h2><ul>${skillGroups
        .map(
          g =>
            `<li><strong>${esc(g.group)}:</strong> ${esc(
              g.items.join(", ")
            )}</li>`
        )
        .join("")}</ul></section>
      <section aria-labelledby="pr-certs"><h2 id="pr-certs">Certifications</h2><ul>${certifications
        .map(
          c =>
            `<li>${c.url ? link(c.url, c.title) : esc(c.title)} — ${esc(
              c.issuer
            )}</li>`
        )
        .join("")}</ul></section>
      <section aria-labelledby="pr-blog"><h2 id="pr-blog">Writing</h2><ul>${blogs
        .map(b => `<li>${link(b.url, b.title)} — ${esc(b.description)}</li>`)
        .join("")}</ul></section>
      <section aria-labelledby="pr-contact"><h2 id="pr-contact">Contact</h2>
        <p>Email: ${link(`mailto:${profile.email}`, profile.email)}</p>
        <ul>${socials.map(s => `<li>${link(s.url, s.name)}</li>`).join("")}</ul>
      </section>
    </div>`;
}

function llmsTxt() {
  return `# ${profile.name}

> ${profile.seoDescription}

${profile.summary}

## Current role

- ${current.role} at ${current.company} (${current.start} – ${
    current.end
  }): ${current.highlights.join(", ")}

## Key pages

- [Portfolio](${SITE}): portfolio with a terminal theme (default) and a motion theme
- [Full profile for LLMs](${SITE}llms-full.txt): complete experience, skills, certifications and writing in Markdown
- [Résumé JSON](${SITE}resume.json): machine-readable résumé (JSON Resume schema)

## Contact

- Email: ${profile.email}
${socials.map(s => `- ${s.name}: ${s.url}`).join("\n")}
`;
}

function llmsFullTxt() {
  return `# ${profile.name} — full profile

> ${profile.seoDescription}

${profile.summary}

## Experience

${experience
  .map(
    e =>
      `### ${e.role} — ${e.company}\n\n${e.start} – ${e.end}\n\n${e.highlights
        .map(h => `- ${h}`)
        .join("\n")}`
  )
  .join("\n\n")}

## Skills

${skillGroups.map(g => `- **${g.group}:** ${g.items.join(", ")}`).join("\n")}

## Certifications

${certifications
  .map(c => `- ${c.url ? `[${c.title}](${c.url})` : c.title} — ${c.issuer}`)
  .join("\n")}

## Writing

${blogs.map(b => `- [${b.title}](${b.url}): ${b.description}`).join("\n")}

## Contact

- Email: ${profile.email}
${socials.map(s => `- ${s.name}: ${s.url}`).join("\n")}
`;
}

const toIso = d => {
  if (d === "Present") return undefined;
  const t = new Date(`1 ${d}`);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
};

function resumeJson() {
  return {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: profile.name,
      label: profile.currentTitle,
      email: profile.email,
      url: SITE,
      image: profile.avatar,
      summary: profile.summary,
      profiles: socials.map(s => ({network: s.name, url: s.url}))
    },
    work: experience.map(e => ({
      name: e.company,
      position: e.role,
      startDate: toIso(e.start),
      ...(toIso(e.end) ? {endDate: toIso(e.end)} : {}),
      highlights: e.highlights
    })),
    skills: skillGroups.map(g => ({name: g.group, keywords: g.items})),
    certificates: certifications.map(c => ({
      name: c.title,
      issuer: c.issuer,
      ...(c.url ? {url: c.url} : {})
    }))
  };
}

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent"
];

function robotsTxt() {
  return `# Humans, search engines and AI agents are all welcome.
User-agent: *
Allow: /

${AI_BOTS.map(b => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE}sitemap.xml
`;
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    [SITE, "1.0"],
    [`${SITE}llms.txt`, "0.5"],
    [`${SITE}llms-full.txt`, "0.5"]
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([u, p]) =>
      `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
}

export default function seoPlugin() {
  return {
    name: "portfolio-seo",
    transformIndexHtml(html) {
      return html
        .replace("<!--seo-head-->", headTags())
        .replace("<!--seo-body-->", bodyHtml());
    },
    generateBundle() {
      const files = {
        "robots.txt": robotsTxt(),
        "sitemap.xml": sitemapXml(),
        "llms.txt": llmsTxt(),
        "llms-full.txt": llmsFullTxt(),
        "resume.json": JSON.stringify(resumeJson(), null, 2)
      };
      for (const [fileName, source] of Object.entries(files)) {
        this.emitFile({type: "asset", fileName, source});
      }
    }
  };
}

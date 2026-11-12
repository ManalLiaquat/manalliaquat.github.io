// Single source of content for the site and the build-time SEO files.

export const profile = {
  name: "Manal Liaquat",
  handle: "manal",
  role: "Backend Engineer",
  currentTitle: "Backend Team Lead @ Plai",
  tagline: "I build the systems behind web and mobile products.",
  summary:
    "Full stack JavaScript engineer with 7+ years building web and mobile applications. These days I lead the backend team at Plai, designing APIs and services in Node.js. Before that I shipped React, Next.js and React Native apps for insurance, marketing and agency clients.",
  email: "m.manalliaquat@gmail.com",
  siteUrl: "https://manalliaquat.github.io/",
  avatar: "https://github.com/manalliaquat.png",
  twitter: "@manalliaquat",
  seoTitle:
    "Manal Liaquat — Backend Engineer & Team Lead (Node.js, React, React Native)",
  seoDescription:
    "Manal Liaquat is a Backend Engineer and Backend Team Lead at Plai with 7+ years building web and mobile apps using Node.js, Express, MongoDB, React, Next.js and React Native."
};

export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/manalliaquat",
    short: "github.com/manalliaquat"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/manalliaquat/",
    short: "linkedin.com/in/manalliaquat"
  },
  {
    name: "Medium",
    url: "https://medium.com/@m.manalliaquat",
    short: "medium.com/@m.manalliaquat"
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/12815456/manal-liaquat",
    short: "stackoverflow.com/users/12815456"
  },
  {
    name: "X / Twitter",
    url: "https://twitter.com/manalliaquat",
    short: "twitter.com/manalliaquat"
  },
  {
    name: "CodePen",
    url: "https://codepen.io/ManalLiaquat",
    short: "codepen.io/ManalLiaquat"
  },
  {
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org/manalliaquat",
    short: "freecodecamp.org/manalliaquat"
  }
];

export const experience = [
  {
    role: "Backend Engineer",
    company: "Plai",
    logo: "/img/plai.png",
    start: "Jan 2024",
    end: "Present",
    lines: ["backend"],
    highlights: ["Backend Team Lead", "Backend application engineering"]
  },
  {
    role: "Software Engineer",
    company: "Insurance Market",
    logo: "/img/insuranceMarket.png",
    start: "Sep 2021",
    end: "Dec 2023",
    lines: ["frontend", "backend"],
    highlights: [
      "Web application development",
      "Backend application development"
    ]
  },
  {
    role: "Consultant Developer",
    company: "Digital MarknAdsPlan",
    logo: "/img/digitalMarknAdsPlan.webp",
    start: "Jun 2020",
    end: "Aug 2021",
    lines: ["frontend"],
    highlights: ["Web application development"]
  },
  {
    role: "React Native Developer",
    company: "Systems Avenue",
    logo: "/img/systemsAvenue.webp",
    start: "Mar 2019",
    end: "Jun 2020",
    lines: ["frontend", "mobile"],
    highlights: [
      "Senior mobile application developer",
      "Web application development"
    ]
  }
];

// The network map's lines. Each experience entry lists the lines it ran on,
// taken from its highlights.
export const lines = [
  {id: "backend", name: "Backend", letter: "B"},
  {id: "frontend", name: "Frontend", letter: "F"},
  {id: "mobile", name: "Mobile", letter: "M"},
  {id: "tooling", name: "Tooling", letter: "T"}
];

// The headline row: what Manal leads with.
export const coreSkills = [
  "TypeScript",
  "React",
  "React Native",
  "Node.js",
  "Firebase / GCP",
  "Ads APIs (Meta, Google, LinkedIn)",
  "AI / LLM integration"
];

export const skillGroups = [
  {
    group: "Languages",
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Python",
      "HTML5",
      "CSS3",
      "Sass",
      "SQL (BigQuery)"
    ]
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Query (TanStack)",
      "Tailwind CSS",
      "Vite",
      "Material UI",
      "Headless UI",
      "Bootstrap",
      "Chart.js",
      "PWA",
      "In-browser PDF generation (canvas, non-Latin text and currencies)",
      "Internationalization (react-intl / FormatJS)"
    ]
  },
  {
    group: "Mobile",
    items: [
      "React Native",
      "React Navigation",
      "React Native Firebase (Auth, Firestore, push notifications, Remote Config)",
      "Google and Apple sign-in"
    ]
  },
  {
    group: "Backend & APIs",
    items: [
      "Node.js",
      "Express.js",
      "REST API design",
      "MongoDB",
      "Background jobs, retries and crash recovery (Google Cloud Tasks)",
      "Input validation (Joi, Zod)",
      "MCP servers (Model Context Protocol)"
    ]
  },
  {
    group: "Cloud & Firebase",
    items: [
      "Google Cloud Platform",
      "Firebase (Auth, Firestore, Cloud Functions, Hosting, Storage)",
      "BigQuery",
      "Cloudflare Workers",
      "Terraform"
    ]
  },
  {
    group: "Ad-tech & integrations",
    items: [
      "Meta Marketing API",
      "Google Ads API",
      "Google Ads Scripts",
      "LinkedIn Marketing API",
      "Google Analytics Data API",
      "Stripe and Stripe Connect",
      "Shopify",
      "HubSpot",
      "Algolia"
    ]
  },
  {
    group: "AI / LLM",
    items: [
      "OpenAI API and Agents SDK",
      "Google Gemini API",
      "AI agents and prompt engineering",
      "Unsloth"
    ]
  },
  {
    group: "Security & auth",
    items: [
      "Firebase Authentication and route guards",
      "JWT",
      "OAuth 2.0",
      "Login-link and signup flow hardening",
      "Dependency vulnerability scanning and CVE triage"
    ]
  },
  {
    group: "Testing & quality",
    items: [
      "Jest",
      "React Testing Library",
      "Playwright",
      "Detox",
      "ESLint",
      "Prettier",
      "Husky"
    ]
  },
  {
    group: "Tools & practices",
    items: [
      "Git and GitHub",
      "Sentry",
      "CI/CD",
      "Monorepos",
      "npm",
      "Agile (Jira)",
      "AI-assisted development (Claude Code, Cursor)"
    ]
  }
];

export const allSkills = skillGroups.flatMap(g => g.items);

export const certifications = [
  {
    title: "React Nanodegree",
    issuer: "Udacity",
    image: "/img/udacity.png",
    url: "https://confirm.udacity.com/KHYFX7KF"
  },
  {
    title: "PWA Web App Developer",
    issuer: "SMIT",
    image: "/img/pwaLogo.webp"
  },
  {
    title: "Web & Mobile App Developer",
    issuer: "SMIT",
    image: "/img/smit.webp"
  },
  {
    title: "Legacy Front End",
    issuer: "freeCodeCamp",
    image: "/img/freecodecamp.webp",
    url: "https://www.freecodecamp.org/certification/manalliaquat/legacy-front-end"
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    image: "/img/freecodecamp.webp",
    url: "https://www.freecodecamp.org/certification/manalliaquat/javascript-algorithms-and-data-structures"
  },
  {
    title: "Financial Literacy Training Program",
    issuer: "NIBAF Pakistan",
    image: "/img/nibafPak.png"
  }
];

export const blogs = [
  {
    title: "Why I choose React?",
    url: "https://medium.com/@m.manalliaquat/why-i-choose-react-ab215dffdb79",
    description:
      "React was developed by Facebook in 2013 and is now the most popular JavaScript library for building single-page applications."
  },
  {
    title: "CRA to PWA",
    url: "https://medium.com/swlh/cra-to-pwa-1e572207d7",
    description:
      "How to convert a Create React App project into a Progressive Web App — one of the most searched questions for React developers."
  }
];

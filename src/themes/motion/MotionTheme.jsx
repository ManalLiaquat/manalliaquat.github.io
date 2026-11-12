import React, {Suspense, lazy, useEffect, useRef, useState} from "react";
import {motion, useReducedMotion, useScroll, useTransform} from "motion/react";
import Lenis from "lenis";
import "@fontsource/kanit/300.css";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/kanit/700.css";
import "@fontsource/kanit/900.css";
import {
  profile,
  socials,
  experience,
  skillGroups,
  certifications,
  blogs
} from "../../data/portfolio";
import {
  AnimatedText,
  ContactButton,
  FadeIn,
  GhostButton,
  Magnet,
  badgeImage
} from "./parts.jsx";
import PillNav from "./rb/PillNav.jsx";
import Silk from "./rb/Silk.jsx";
import ScrollVelocity from "./rb/ScrollVelocity.jsx";
import DecryptedText from "./rb/DecryptedText.jsx";
import SpotlightCard from "./rb/SpotlightCard.jsx";
import ProfileCard from "./rb/ProfileCard.jsx";
import ClickSpark from "./rb/ClickSpark.jsx";
import TargetCursor from "./rb/TargetCursor.jsx";
import "./motion.css";

// three.js only loads where the badge is shown (wide screens).
const Lanyard = lazy(() => import("./rb/Lanyard.jsx"));

function useWide() {
  const [wide, setWide] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

const MAIL = `mailto:${profile.email}`;
const firstName = profile.name.split(" ")[0];
const avatar = `${profile.avatar}?size=640`;
const handle = profile.handle === "manal" ? "manalliaquat" : profile.handle;

const NAV_ITEMS = [
  {label: "About", href: "#about"},
  {label: "Skills", href: "#skills"},
  {label: "Work", href: "#work"},
  {label: "Contact", href: "#contact"}
];

const LOGO = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#D7E2EA"/><text x="20" y="26" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="15" fill="#0C0C0C">ML</text></svg>'
)}`;

function Hero() {
  return (
    <section className="mt-hero" id="top">
      <div className="mt-silk" aria-hidden="true">
        <Silk color="#3a1745" sheenColor="#BBCCD7" speed={3} glow={0.2} />
      </div>
      <FadeIn y={-20} delay={0} className="mt-navwrap">
        <PillNav
          logo={LOGO}
          logoAlt={`${profile.name}, back to top`}
          logoHref="#top"
          items={NAV_ITEMS}
          theme="dark"
          surface="glass"
          ariaLabel="Sections"
        />
      </FadeIn>
      <div className="mt-hero-head">
        <FadeIn
          as="h1"
          y={40}
          delay={0.15}
          className="hero-heading mt-hero-title"
        >
          Hi, i&apos;m {firstName}
        </FadeIn>
      </div>
      <div className="mt-hero-portrait">
        <FadeIn y={30} delay={0.6}>
          <Magnet padding={150} strength={3}>
            <img
              className="mt-avatar"
              src={avatar}
              alt={`Portrait of ${profile.name}`}
              width="520"
              height="520"
            />
          </Magnet>
        </FadeIn>
      </div>
      <div className="mt-hero-bottom">
        <FadeIn as="p" y={20} delay={0.35} className="mt-hero-tag">
          {profile.tagline}
        </FadeIn>
        <FadeIn y={20} delay={0.5}>
          <ContactButton href={MAIL} />
        </FadeIn>
      </div>
    </section>
  );
}

function Marquee() {
  const rows = [
    [...skillGroups[0].items, ...skillGroups[1].items],
    skillGroups.slice(2).flatMap(g => g.items)
  ].map(r => r.join("  ·  "));
  return (
    <section className="mt-marquee" aria-label="Skills at a glance">
      <ScrollVelocity
        texts={rows}
        velocity={60}
        className="mt-velocity"
        numCopies={4}
        fadeEdges
        outlineAlternate
      />
    </section>
  );
}

function About() {
  const wide = useWide();
  return (
    <section className="mt-about" id="about">
      {wide && (
        <div className="mt-lanyard" aria-hidden="true">
          <Suspense fallback={null}>
            <Lanyard
              frontImage={badgeImage({
                name: profile.name,
                title: profile.currentTitle,
                handle
              })}
              strapColor="#7621B0"
              finish="glossy"
              size={0.62}
            />
          </Suspense>
        </div>
      )}
      <div className="mt-about-inner">
        <FadeIn as="h2" y={40} className="hero-heading mt-big">
          About me
        </FadeIn>
        <AnimatedText text={profile.summary} className="mt-about-text" />
        <FadeIn y={20}>
          <ContactButton href={MAIL} />
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="mt-services" id="skills">
      <FadeIn as="h2" y={40} className="mt-big mt-dark">
        Skills
      </FadeIn>
      <ol className="mt-service-list">
        {skillGroups.map((g, i) => (
          <FadeIn as="li" key={g.group} delay={i * 0.1} className="mt-service">
            <span className="mt-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mt-service-name">
                <DecryptedText
                  text={g.group}
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={40}
                />
              </h3>
              <p className="mt-service-desc">{g.items.join(", ")}</p>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}

function WorkCard({job, i, total, progress}) {
  const reduced = useReducedMotion();
  const target = 1 - (total - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  return (
    <div className="mt-card-slot">
      <motion.article
        className="mt-card"
        style={{scale: reduced ? 1 : scale, top: `${i * 28}px`}}
      >
        <SpotlightCard
          className="mt-card-light"
          spotlightColor="rgba(182, 0, 168, 0.22)"
        >
          <div className="mt-card-top">
            <span className="mt-num mt-num-light" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-card-title">
              <p className="mt-card-cat">
                {job.start} – {job.end}
              </p>
              <h3>{job.company}</h3>
              <p className="mt-card-role">{job.role}</p>
            </div>
            <img
              className="mt-card-logo"
              src={job.logo}
              alt=""
              loading="lazy"
            />
          </div>
          <ul className="mt-card-notes">
            {job.highlights.map(h => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.article>
    </div>
  );
}

function Work() {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  return (
    <section className="mt-projects" id="work">
      <FadeIn as="h2" y={40} className="hero-heading mt-big">
        Work
      </FadeIn>
      <div ref={ref} className="mt-stack">
        {experience.map((job, i) => (
          <WorkCard
            key={job.company}
            job={job}
            i={i}
            total={experience.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="mt-proof">
      <FadeIn as="h2" y={40} className="hero-heading mt-big">
        Credentials
      </FadeIn>
      <ul className="mt-rows">
        {certifications.map((c, i) => (
          <FadeIn as="li" key={c.title} delay={i * 0.06} className="mt-row">
            <img src={c.image} alt="" loading="lazy" />
            <div>
              <p className="mt-row-title">{c.title}</p>
              <p className="mt-row-meta">{c.issuer}</p>
            </div>
            {c.url && (
              <GhostButton href={c.url} external>
                Verify<span className="sr-only"> {c.title}</span>
              </GhostButton>
            )}
          </FadeIn>
        ))}
      </ul>
      <FadeIn as="h2" y={40} className="hero-heading mt-big mt-big-gap">
        Writing
      </FadeIn>
      <div className="mt-posts">
        {blogs.map((b, i) => (
          <FadeIn key={b.url} delay={i * 0.1}>
            <SpotlightCard
              className="mt-post"
              spotlightColor="rgba(215, 226, 234, 0.16)"
            >
              <h3>{b.title}</h3>
              <p>{b.description}</p>
              <GhostButton href={b.url} external>
                Read on Medium<span className="sr-only">: {b.title}</span>
              </GhostButton>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="mt-contact" id="contact">
      <FadeIn as="h2" y={40} className="hero-heading mt-big">
        Let&apos;s build something.
      </FadeIn>
      <div className="mt-contact-grid">
        <FadeIn y={30} className="mt-profile">
          <ProfileCard
            avatarUrl={avatar}
            miniAvatarUrl={avatar}
            name={profile.name}
            title={profile.currentTitle}
            handle={handle}
            status={profile.role}
            contactText="Email me"
            onContactClick={() => {
              window.location.href = MAIL;
            }}
          />
        </FadeIn>
        <div className="mt-contact-side">
          <FadeIn y={20}>
            <ContactButton href={MAIL} className="mt-contact-cta">
              {profile.email}
            </ContactButton>
          </FadeIn>
          <FadeIn as="ul" y={20} delay={0.1} className="mt-socials">
            {socials.map(s => (
              <li key={s.name}>
                <GhostButton href={s.url} external>
                  {s.name}
                </GhostButton>
              </li>
            ))}
          </FadeIn>
        </div>
      </div>
      <footer className="mt-foot">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top">Back to top</a>
      </footer>
    </section>
  );
}

export default function MotionTheme() {
  const reduced = useReducedMotion();

  // smooth scrolling; anchor links glide instead of jumping
  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({lerp: 0.11});
    let raf = 0;
    const loop = t => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = e => {
      const a = e.target.closest?.("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href");
      const target = id === "#top" ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, {offset: 0, duration: 1.3});
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <div className="mt-root">
      <a className="mt-skip" href="#about">
        Skip to content
      </a>
      <TargetCursor
        targetSelector=".mt-root a, .mt-root button"
        cursorColor="#D7E2EA"
        hideDefaultCursor={false}
        showLabel={false}
      />
      <ClickSpark sparkColor="#D7E2EA" sparkCount={8} sparkRadius={22}>
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Work />
          <Proof />
          <Contact />
        </main>
      </ClickSpark>
    </div>
  );
}

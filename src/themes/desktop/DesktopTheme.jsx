import React, {useEffect, useRef, useState} from "react";
import {profile} from "../../data/portfolio";
import {APPS} from "./apps.jsx";
import "./desktop.css";

const MOBILE_QUERY = "(max-width: 767px)";

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function defaultPosition(index, app) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.min(app.w, vw - 140);
  const h = Math.min(app.h, vh - 150);
  const x = Math.min(160 + index * 36, vw - w - 20);
  const y = Math.min(48 + index * 30, vh - h - 100);
  return {x: Math.max(x, 10), y: Math.max(y, 40), w, h};
}

function Window({app, state, focused, onFocus, onClose, onMinimize, onMove}) {
  const ref = useRef(null);
  const drag = useRef(null);
  const {Component} = app;

  useEffect(() => {
    if (focused) ref.current?.focus({preventScroll: true});
  }, [focused]);

  const onPointerDown = e => {
    if (e.button !== 0 || e.target.closest("button")) return;
    onFocus();
    drag.current = {dx: e.clientX - state.x, dy: e.clientY - state.y};
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = e => {
    if (!drag.current) return;
    const x = Math.min(
      Math.max(e.clientX - drag.current.dx, -state.w + 120),
      window.innerWidth - 120
    );
    const y = Math.min(
      Math.max(e.clientY - drag.current.dy, 28),
      window.innerHeight - 80
    );
    onMove(x, y);
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <section
      ref={ref}
      className={`d-window ${focused ? "is-focused" : ""}`}
      style={{
        left: state.x,
        top: state.y,
        width: state.w,
        height: state.h,
        zIndex: state.z
      }}
      aria-label={app.title}
      tabIndex={-1}
      onPointerDown={onFocus}
      onKeyDown={e => e.key === "Escape" && onClose()}
    >
      <div
        className="d-titlebar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="d-lights">
          <button
            type="button"
            className="d-light close"
            aria-label={`Close ${app.title}`}
            onClick={onClose}
          />
          <button
            type="button"
            className="d-light min"
            aria-label={`Minimize ${app.title}`}
            onClick={onMinimize}
          />
          <span className="d-light max" aria-hidden="true" />
        </div>
        <span className="d-wtitle">{app.title}</span>
      </div>
      <div className="d-content">
        <Component />
      </div>
    </section>
  );
}

function Desktop() {
  const now = useClock();
  const zTop = useRef(10);
  const [wins, setWins] = useState(() => {
    const about = APPS[0];
    return {
      about: {...defaultPosition(0, about), open: true, minimized: false, z: 10}
    };
  });
  const [focusedId, setFocusedId] = useState("about");

  const open = id => {
    zTop.current += 1;
    const index = APPS.findIndex(a => a.id === id);
    setWins(prev => ({
      ...prev,
      [id]: prev[id]
        ? {...prev[id], open: true, minimized: false, z: zTop.current}
        : {
            ...defaultPosition(index, APPS[index]),
            open: true,
            minimized: false,
            z: zTop.current
          }
    }));
    setFocusedId(id);
  };
  const focus = id => {
    if (focusedId === id) return;
    zTop.current += 1;
    setWins(prev => ({...prev, [id]: {...prev[id], z: zTop.current}}));
    setFocusedId(id);
  };
  const update = (id, patch) =>
    setWins(prev => ({...prev, [id]: {...prev[id], ...patch}}));

  const focusedApp = APPS.find(
    a => a.id === focusedId && wins[a.id]?.open && !wins[a.id]?.minimized
  );

  return (
    <div className="desktop-theme">
      <header className="d-menubar">
        <span className="d-logo">◆ ManalOS</span>
        <strong>{focusedApp ? focusedApp.title : "Finder"}</strong>
        <span className="d-menu-hide">File</span>
        <span className="d-menu-hide">View</span>
        <a className="d-menu-hide" href={`mailto:${profile.email}`}>
          Hire
        </a>
        <span className="d-clock">
          {now.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric"
          })}{" "}
          {now.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit"
          })}
        </span>
      </header>

      <div className="d-wallpaper-text" aria-hidden="true">
        {profile.name}
      </div>

      <nav className="d-icons" aria-label="Desktop">
        {APPS.map(app => (
          <button
            key={app.id}
            type="button"
            className="d-icon"
            onClick={() => open(app.id)}
          >
            <span className="d-icon-img" style={{"--c": app.color}}>
              {app.icon}
            </span>
            <span className="d-icon-label">{app.title}</span>
          </button>
        ))}
      </nav>

      <aside className="d-note">
        <strong>Hi, I'm Manal 👋</strong>
        <p>
          {profile.tagline} Open the apps on the left or in the dock — drag
          windows around.
        </p>
      </aside>

      {APPS.map(app => {
        const state = wins[app.id];
        if (!state || !state.open || state.minimized) return null;
        return (
          <Window
            key={app.id}
            app={app}
            state={state}
            focused={focusedId === app.id}
            onFocus={() => focus(app.id)}
            onClose={() => update(app.id, {open: false})}
            onMinimize={() => update(app.id, {minimized: true})}
            onMove={(x, y) => update(app.id, {x, y})}
          />
        );
      })}

      <nav className="d-dock" aria-label="Dock">
        {APPS.map(app => (
          <button
            key={app.id}
            type="button"
            className="d-dock-item"
            onClick={() => open(app.id)}
            aria-label={`Open ${app.title}`}
            data-title={app.title}
          >
            <span className="d-icon-img" style={{"--c": app.color}}>
              {app.icon}
            </span>
            {wins[app.id]?.open && <span className="d-running" />}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Phone() {
  const now = useClock();
  const [openId, setOpenId] = useState(null);
  const app = APPS.find(a => a.id === openId);

  useEffect(() => {
    document.body.style.overflow = app ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [app]);

  return (
    <div className="desktop-theme is-phone">
      <div className="p-status">
        <span>
          {now.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit"
          })}
        </span>
        <span>ManalOS</span>
      </div>
      <div className="p-widget">
        <div className="d-avatar" aria-hidden="true">
          ML
        </div>
        <div>
          <strong>{profile.name}</strong>
          <p>{profile.currentTitle}</p>
        </div>
      </div>
      <nav className="p-grid" aria-label="Apps">
        {APPS.map(a => (
          <button
            key={a.id}
            type="button"
            className="d-icon"
            onClick={() => setOpenId(a.id)}
          >
            <span className="d-icon-img" style={{"--c": a.color}}>
              {a.icon}
            </span>
            <span className="d-icon-label">{a.title}</span>
          </button>
        ))}
      </nav>
      {app && (
        <section className="p-sheet" aria-label={app.title}>
          <div className="p-sheet-bar">
            <button type="button" onClick={() => setOpenId(null)}>
              ‹ Home
            </button>
            <strong>{app.title}</strong>
            <span />
          </div>
          <div className="d-content">
            <app.Component />
          </div>
        </section>
      )}
    </div>
  );
}

export default function DesktopTheme() {
  return useIsMobile() ? <Phone /> : <Desktop />;
}

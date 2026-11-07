import React, {useEffect, useRef, useState} from "react";
import {experience} from "../data/portfolio";
import {toYear, slug} from "./time";
import {LineTag} from "./parts.jsx";

// Career drawn as a metro map. Time runs along the map (left to right, or top to
// bottom on narrow screens); each discipline is a lane. Diagonals are 45°.
const ORIENT = {
  horizontal: {
    w: 1200,
    h: 470,
    lane: {backend: 120, frontend: 240, mobile: 360},
    start: 64,
    end: 1160,
    zoneLabel: 450
  },
  vertical: {
    w: 400,
    h: 960,
    lane: {backend: 70, frontend: 130, mobile: 190},
    start: 44,
    end: 900,
    zoneLabel: 8
  }
};

const T0 = 2018.8;
const T1 = toYear("Present") + 0.25;

function geometry(kind) {
  const o = ORIENT[kind];
  const along = t => o.start + ((t - T0) / (T1 - T0)) * (o.end - o.start);
  const d = o.lane.frontend - o.lane.backend; // lane gap = diagonal run
  // (a, l) -> svg point, where a is position along time, l across lanes.
  const pt = (a, l) => (kind === "horizontal" ? [a, l] : [l, a]);
  const path = pts => "M" + pts.map(p => pt(...p).join(" ")).join(" L");

  const [plai, im, dmap, sa] = experience;
  const a = {
    sa: along(toYear(sa.start)),
    dmap: along(toYear(dmap.start)),
    im: along(toYear(im.start)),
    plai: along(toYear(plai.start)),
    feEnd: along(toYear(im.end)),
    mobEnd: along(toYear(sa.end))
  };
  const {backend: B, frontend: F, mobile: M} = o.lane;
  // The backend line bleeds off the page edge (the hero clips it): ongoing work.
  const bleed = kind === "horizontal" ? o.w + 600 : o.h + 24;

  return {
    o,
    pt,
    along,
    paths: [
      {
        id: "frontend",
        d: path([
          [a.sa, F],
          [a.feEnd, F]
        ]),
        end: [a.feEnd, F]
      },
      {
        id: "mobile",
        d: path([
          [a.sa, F],
          [a.sa + d, M],
          [a.mobEnd, M]
        ]),
        end: [a.mobEnd, M]
      },
      {
        id: "backend",
        d: path([
          [a.im, F],
          [a.im + d, B],
          [bleed, B]
        ])
      }
    ],
    stations: [
      {job: sa, at: [a.sa, F], kind: "interchange", label: "above"},
      {job: dmap, at: [a.dmap, F], kind: "stop", label: "below"},
      {job: im, at: [a.im, F], kind: "interchange", label: "above-end"},
      {job: plai, at: [a.plai, B], kind: "current", label: "above"}
    ]
  };
}

const COLOR = {
  backend: "var(--backend)",
  frontend: "var(--frontend)",
  mobile: "var(--mobile)"
};

function Label({g, s, kind}) {
  const [x, y] = g.pt(...s.at);
  const {job} = s;
  let tx = x - 12;
  let ty = y - 76;
  let anchor = "start";
  if (kind === "vertical") {
    tx = 220;
    ty = y - 14;
  } else if (s.label === "below") {
    tx = x - 12;
    ty = y + 40;
  } else if (s.label === "above-end") {
    tx = x + 12;
    anchor = "end";
  }
  return (
    <text className="nm-label" x={tx} y={ty} textAnchor={anchor}>
      <tspan className="nm-name" x={tx} dy="0">
        {job.company}
      </tspan>
      <tspan className="nm-role" x={tx} dy="21">
        {job.role}
      </tspan>
      <tspan className="nm-date" x={tx} dy="19">
        {job.start} – {job.end}
      </tspan>
    </text>
  );
}

// A train runs the backend line: it pulls into Plai once the map has drawn,
// then leaves along the line as the visitor scrolls past the map.
function useTrain(kind, reduced, pathRef, trainRef) {
  useEffect(() => {
    const path = pathRef.current;
    const train = trainRef.current;
    if (!path || !train) return;
    const g = geometry(kind);
    const axis = kind === "horizontal" ? "x" : "y";
    const plaiAlong = g.pt(...g.stations[3].at)[axis === "x" ? 0 : 1];
    let total = 0;
    try {
      total = path.getTotalLength();
    } catch {
      return; // the hidden orientation may not expose geometry
    }
    if (!total) return;
    let lo = 0;
    let hi = total;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid)[axis] < plaiAlong) lo = mid;
      else hi = mid;
    }
    const atPlai = lo - 34; // park just short of the ring so the train shows
    const runOut = Math.min(
      total,
      atPlai + (kind === "horizontal" ? 900 : 420)
    );

    const place = len => {
      const a = path.getPointAtLength(Math.max(len - 1, 0));
      const b = path.getPointAtLength(Math.min(len + 1, total));
      const p = path.getPointAtLength(len);
      const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      train.setAttribute(
        "transform",
        `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${deg.toFixed(
          1
        )})`
      );
    };

    if (reduced) {
      place(atPlai);
      train.style.opacity = 1;
      return;
    }

    let arrived = 0; // 0..1 progress of the arrival run
    let frame = 0;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const hero = path.closest(".hero");
    const render = () => {
      frame = 0;
      const leave = Math.min(
        Math.max(window.scrollY / (hero.offsetHeight * 0.85), 0),
        1
      );
      const len =
        arrived < 1
          ? atPlai * easeOut(arrived)
          : atPlai + (runOut - atPlai) * leave * leave;
      place(len);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const startAt = performance.now() + 1900;
    const duration = 1500;
    let run = 0;
    const tick = now => {
      arrived = Math.min(Math.max((now - startAt) / duration, 0), 1);
      train.style.opacity = now >= startAt ? 1 : 0;
      render();
      if (arrived < 1) run = requestAnimationFrame(tick);
    };
    run = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => {
      cancelAnimationFrame(run);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [kind, reduced, pathRef, trainRef]);
}

// Hover or focus a station to read its board.
function Board({g, s, kind, open}) {
  const [x, y] = g.pt(...s.at);
  const {o} = g;
  const horiz = kind === "horizontal";
  const left = horiz ? (x / o.w) * 100 : (220 / o.w) * 100;
  const top = horiz ? (y / o.h) * 100 : ((y + 92) / o.h) * 100;
  const flip = horiz && x > o.w * 0.55;
  const below = horiz && y < o.h * 0.4;
  const {job} = s;
  return (
    <div
      className={`nm-board ${open ? "is-open" : ""} ${flip ? "is-flip" : ""} ${
        below ? "is-below" : ""
      } ${horiz ? "" : "is-vert"}`}
      style={{left: `${left}%`, top: `${top}%`}}
      aria-hidden="true"
    >
      <div className="nm-board-head">
        <img src={job.logo} alt="" />
        <div>
          <strong>{job.company}</strong>
          <span>{job.role}</span>
        </div>
      </div>
      <p className="nm-board-date">
        {job.start} – {job.end}
      </p>
      <ul>
        {job.highlights.map(h => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <p className="nm-board-lines">
        {job.lines.map(l => (
          <LineTag key={l} id={l} />
        ))}
      </p>
    </div>
  );
}

function Map({kind, reduced}) {
  const g = geometry(kind);
  const {o} = g;
  const backendRef = useRef(null);
  const trainRef = useRef(null);
  const [board, setBoard] = useState(null);
  const hideTimer = useRef(0);
  useTrain(kind, reduced, backendRef, trainRef);
  const show = i => {
    clearTimeout(hideTimer.current);
    setBoard(i);
  };
  const hide = () => {
    hideTimer.current = setTimeout(() => setBoard(null), 120);
  };
  const years = [];
  for (let y = Math.ceil(T0); y < T1 - 0.5; y++) years.push(y);

  return (
    <div className={`nm nm-${kind}`}>
      {/* far plane: one fare-zone band per year. On the vertical map the bands
          run along the time axis, so they must not drift or dates misread. */}
      <svg
        className="nm-zones"
        viewBox={`0 0 ${o.w} ${o.h}`}
        aria-hidden="true"
        {...(kind === "horizontal"
          ? {"data-px": "", "data-px-y": "0.12", "data-px-depth": "-6"}
          : {})}
      >
        {years.map((y, i) => {
          const a0 = g.along(y);
          const a1 = Math.min(
            g.along(y + 1),
            kind === "horizontal" ? o.w : o.h
          );
          const rect =
            kind === "horizontal"
              ? {x: a0, y: 0, width: a1 - a0, height: o.h - 40}
              : {x: 0, y: a0, width: o.w, height: a1 - a0};
          const [lx, ly] =
            kind === "horizontal"
              ? [a0 + 8, o.zoneLabel]
              : [o.zoneLabel, a0 + 18];
          return (
            <g key={y}>
              <rect {...rect} className={i % 2 ? "nm-zone-b" : "nm-zone-a"} />
              <text x={lx} y={ly} className="nm-year">
                {y}
              </text>
            </g>
          );
        })}
      </svg>

      {/* mid plane: lines and station markers */}
      <svg
        className="nm-lines"
        viewBox={`0 0 ${o.w} ${o.h}`}
        aria-hidden="true"
        data-px
        data-px-depth="6"
      >
        {g.paths.map((p, i) => (
          <g key={p.id}>
            <path
              ref={p.id === "backend" ? backendRef : undefined}
              d={p.d}
              pathLength="1"
              className="nm-line"
              style={{
                stroke: COLOR[p.id],
                animationDelay: `${0.45 + i * 0.25}s`
              }}
            />
            {p.end && <Terminus g={g} at={p.end} id={p.id} kind={kind} />}
          </g>
        ))}
        <g ref={trainRef} className="nm-train" style={{opacity: 0}}>
          <rect x="-19" y="-9" width="38" height="18" rx="9" />
          <rect
            className="nm-train-win"
            x="-11"
            y="-3.5"
            width="7"
            height="7"
            rx="2"
          />
          <rect
            className="nm-train-win"
            x="1"
            y="-3.5"
            width="7"
            height="7"
            rx="2"
          />
        </g>
        {g.stations.map((s, i) => {
          const [x, y] = g.pt(...s.at);
          return (
            <g
              key={s.job.company}
              className={`nm-mark nm-${s.kind}`}
              data-st={i}
              style={{animationDelay: `${1.2 + i * 0.12}s`}}
            >
              {s.kind === "stop" ? (
                <rect
                  className="nm-tick"
                  x={kind === "horizontal" ? x - 4 : x - 22}
                  y={kind === "horizontal" ? y - 22 : y - 4}
                  width={kind === "horizontal" ? 8 : 22}
                  height={kind === "horizontal" ? 22 : 8}
                />
              ) : (
                <circle className="nm-ring" cx={x} cy={y} r="12" />
              )}
              {s.kind === "current" && (
                <circle cx={x} cy={y} r="5" className="nm-here-dot" />
              )}
            </g>
          );
        })}
      </svg>

      {/* near plane: station names, which link to each station's guide entry */}
      <svg
        className="nm-labels"
        viewBox={`0 0 ${o.w} ${o.h}`}
        aria-label="Career map"
        data-px
        data-px-depth="14"
      >
        {g.stations.map((s, i) => {
          const [x, y] = g.pt(...s.at);
          return (
            <a
              key={s.job.company}
              href={`#station-${slug(s.job.company)}`}
              className="nm-station"
              data-st={i}
              style={{animationDelay: `${1.2 + i * 0.12}s`}}
              onPointerEnter={e => e.pointerType === "mouse" && show(i)}
              onPointerLeave={hide}
              onFocus={() => show(i)}
              onBlur={hide}
            >
              <circle className="nm-hit" cx={x} cy={y} r="20" />
              <Label g={g} s={s} kind={kind} />
              {s.kind === "current" && <YouAreHere x={x} y={y} kind={kind} />}
            </a>
          );
        })}
      </svg>
      {g.stations.map((s, i) => (
        <Board key={s.job.company} g={g} s={s} kind={kind} open={board === i} />
      ))}
    </div>
  );
}

function Terminus({g, at, id, kind}) {
  const [x, y] = g.pt(...at);
  const horiz = kind === "horizontal";
  return (
    <rect
      className="nm-term"
      style={{fill: COLOR[id]}}
      x={horiz ? x - 4 : x - 16}
      y={horiz ? y - 16 : y - 4}
      width={horiz ? 8 : 32}
      height={horiz ? 32 : 8}
      rx="2"
    />
  );
}

function YouAreHere({x, y, kind}) {
  const [px, py] = kind === "horizontal" ? [x + 26, y + 44] : [226, y + 62];
  return (
    <g className="nm-here" aria-hidden="true">
      <rect x={px - 6} y={py - 19} width="122" height="28" rx="14" />
      <text x={px + 55} y={py} textAnchor="middle">
        You are here
      </text>
    </g>
  );
}

export default function NetworkMap({reduced}) {
  return (
    <>
      <Map kind="horizontal" reduced={reduced} />
      <Map kind="vertical" reduced={reduced} />
    </>
  );
}

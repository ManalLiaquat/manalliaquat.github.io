// Renders Manal and the cat on a transparent canvas pinned to the bottom of the viewport.
// Positions are in CSS pixels (orthographic camera), so roaming maths stays simple.
import * as THREE from "three";
import {createKit, createManal, createCat} from "./models.js";

const MAN_SPEED = 75; // px/s
const CAT_SPEED = 130;
const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;

export function startScene(canvas, {reduced, onHit, onFrame}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f70, 1.4));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-3, 5, 6);
  scene.add(sun);

  const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -2000, 2000);
  camera.position.z = 1000;

  const kit = createKit();
  const man = createManal(kit);
  const cat = createCat(kit);
  // A slight forward tilt so the ground plane and tops of heads read as 3D.
  for (const actor of [man.root, cat.root]) actor.rotation.x = 0.16;
  scene.add(man.root, cat.root);

  const s = {
    w: 0,
    h: 0,
    scale: 100,
    ground: 6,
    x: 0,
    target: 0,
    facing: 1,
    idleUntil: performance.now() + 1500,
    pausedUntil: 0,
    catX: 0,
    waveUntil: 0,
    hopAt: -1,
    mouseX: null,
    blinkAt: performance.now() + 2500
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    s.w = rect.width;
    s.h = rect.height;
    const mobile = s.w < 640;
    s.scale = mobile ? 66 : 96;
    s.ground = mobile && s.w < 480 ? 62 : 6;
    renderer.setSize(s.w, s.h, false);
    camera.right = s.w;
    camera.top = s.h;
    camera.updateProjectionMatrix();
    man.root.scale.setScalar(s.scale);
    cat.root.scale.setScalar(s.scale);
    const margin = s.scale * 0.5;
    s.minX = margin;
    s.maxX = Math.max(s.w - margin, margin);
    s.x = Math.min(Math.max(s.x || s.w * 0.62, s.minX), s.maxX);
    s.target = Math.min(Math.max(s.target || s.x, s.minX), s.maxX);
    if (!s.catX) s.catX = s.x - s.scale * 0.8;
  };
  resize();

  // Screen position (CSS px from canvas top-left) of a point above an actor, for speech bubbles.
  const v = new THREE.Vector3();
  const screenOf = (obj, yUnits) => {
    obj.updateWorldMatrix(true, false);
    v.set(0, yUnits, 0).applyMatrix4(obj.matrixWorld).project(camera);
    return {x: (v.x * 0.5 + 0.5) * s.w, y: (1 - (v.y * 0.5 + 0.5)) * s.h};
  };

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hitTest = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    if (clientY < rect.top || clientY > rect.bottom) return null;
    ndc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(ndc, camera);
    if (raycaster.intersectObject(cat.root, true).length) return "cat";
    if (raycaster.intersectObject(man.root, true).length) return "man";
    return null;
  };

  const greet = () => {
    const now = performance.now();
    s.pausedUntil = now + 3200;
    s.waveUntil = now + 3200;
    onHit("man");
  };
  const meow = () => {
    s.hopAt = performance.now();
    onHit("cat");
  };

  let hovering = null;
  const onMove = e => {
    s.mouseX = e.clientX;
    const hit = hitTest(e.clientX, e.clientY);
    if (hit !== hovering) {
      hovering = hit;
      canvas.style.pointerEvents = hit ? "auto" : "none";
      canvas.style.cursor = hit ? "pointer" : "";
      if (hit === "man" && e.pointerType === "mouse") {
        s.pausedUntil = Math.max(s.pausedUntil, performance.now() + 1500);
        s.waveUntil = Math.max(s.waveUntil, performance.now() + 1200);
      }
    }
  };
  const onDown = e => {
    const hit = hitTest(e.clientX, e.clientY);
    if (hit === "man") greet();
    if (hit === "cat") meow();
  };
  window.addEventListener("pointermove", onMove, {passive: true});
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("resize", resize);

  let frame;
  let last = performance.now();
  const tick = now => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = now / 1000;

    // --- Manal roams: walk to a spot, idle, pick another.
    let walking = false;
    if (!reduced && now >= s.pausedUntil && now >= s.idleUntil) {
      const diff = s.target - s.x;
      if (Math.abs(diff) < 2) {
        s.idleUntil = now + rand(1800, 4500);
        s.target = rand(s.minX, s.maxX);
      } else {
        s.facing = Math.sign(diff);
        s.x += s.facing * Math.min(Math.abs(diff), MAN_SPEED * dt);
        walking = true;
      }
    }

    // --- Cat trots to a spot just behind him.
    const gap = s.scale * 0.85;
    const catTarget = Math.min(
      Math.max(s.x - s.facing * gap, s.minX * 0.5),
      s.w - s.minX * 0.5
    );
    const catDiff = catTarget - s.catX;
    const catWalking = !reduced && Math.abs(catDiff) > 3;
    if (catWalking)
      s.catX +=
        Math.sign(catDiff) * Math.min(Math.abs(catDiff), CAT_SPEED * dt);
    const catDir = catWalking ? Math.sign(catDiff) : s.facing;

    // --- Pose Manal.
    man.root.position.set(s.x, s.ground, 0);
    const turnTo = walking ? s.facing * 1.15 : 0;
    man.root.rotation.y = lerp(man.root.rotation.y, turnTo, 0.12);
    const phase = t * 9;
    const stride = walking ? 1 : 0;
    man.legs[0].rotation.x = Math.sin(phase) * 0.55 * stride;
    man.legs[1].rotation.x = -Math.sin(phase) * 0.55 * stride;
    man.body.position.y = walking
      ? Math.abs(Math.cos(phase)) * 0.04
      : Math.sin(t * 2) * 0.006;
    const waving = now < s.waveUntil;
    man.arms[0].rotation.x = -Math.sin(phase) * 0.45 * stride;
    man.arms[0].rotation.z = -0.08;
    if (waving) {
      man.arms[1].rotation.x = lerp(man.arms[1].rotation.x, 0, 0.2);
      man.arms[1].rotation.z = lerp(
        man.arms[1].rotation.z,
        2.5 + Math.sin(t * 14) * 0.25,
        0.25
      );
    } else {
      man.arms[1].rotation.x = Math.sin(phase) * 0.45 * stride;
      man.arms[1].rotation.z = lerp(man.arms[1].rotation.z, 0.08, 0.2);
    }
    // Head follows the cursor a little when idle.
    const look =
      !walking && s.mouseX != null
        ? Math.max(-0.6, Math.min(0.6, (s.mouseX - s.x) / 600))
        : 0;
    man.head.rotation.y = lerp(man.head.rotation.y, look, 0.08);
    // Blink.
    if (now > s.blinkAt) s.blinkAt = now + rand(2500, 5000);
    man.eyes.scale.y = s.blinkAt - now < 120 ? 0.1 : 1;

    // --- Pose cat.
    const hopT = s.hopAt < 0 ? 1 : (now - s.hopAt) / 450;
    const hop = hopT < 1 ? Math.sin(hopT * Math.PI) * 0.35 : 0;
    cat.root.position.set(s.catX, s.ground + hop * s.scale, 0);
    cat.root.rotation.y = lerp(
      cat.root.rotation.y,
      catWalking ? catDir * 1.45 : catDir * 0.6,
      0.15
    );
    const cp = t * 14;
    cat.legs.forEach((leg, i) => {
      leg.rotation.x = catWalking ? Math.sin(cp + (i % 2) * Math.PI) * 0.6 : 0;
    });
    cat.body.position.y = catWalking ? Math.abs(Math.cos(cp)) * 0.02 : 0;
    cat.tail.rotation.z = Math.sin(t * (catWalking ? 8 : 2.5)) * 0.35;
    cat.head.rotation.y = lerp(
      cat.head.rotation.y,
      catWalking ? 0 : 0.4 * Math.sin(t * 0.7),
      0.05
    );

    renderer.render(scene, camera);
    onFrame({man: screenOf(man.root, 2.35), cat: screenOf(cat.root, 0.62)});
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("pointerdown", onDown);
    scene.traverse(o => {
      o.geometry?.dispose();
      o.material?.dispose?.();
    });
    renderer.dispose();
  };
}

// Toon-shaded, ink-outlined 3D models of Manal and the cat, built from primitives.
// Units: roughly metres; Manal is ~2 units tall with feet at y = 0, facing +z.
import * as THREE from "three";

const INK = 0x1b1b1b;

function gradientMap() {
  const tex = new THREE.DataTexture(
    new Uint8Array([90, 170, 255]),
    3,
    1,
    THREE.RedFormat
  );
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

export function createKit() {
  const gradient = gradientMap();
  const toonCache = new Map();
  const toon = color => {
    if (!toonCache.has(color))
      toonCache.set(
        color,
        new THREE.MeshToonMaterial({color, gradientMap: gradient})
      );
    return toonCache.get(color);
  };

  // Inverted-hull outline: back faces pushed out along normals, drawn flat black.
  const outlineMaterial = thickness => {
    const m = new THREE.MeshBasicMaterial({color: INK, side: THREE.BackSide});
    m.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\ntransformed += normalize(normal) * ${thickness.toFixed(
          4
        )};`
      );
    };
    m.customProgramCacheKey = () => `outline-${thickness}`;
    return m;
  };
  const outlines = {thin: outlineMaterial(0.012), thick: outlineMaterial(0.02)};

  const part = (geometry, color, {outline = "thick", pos, rot, scale} = {}) => {
    const mesh = new THREE.Mesh(geometry, toon(color));
    if (outline) mesh.add(new THREE.Mesh(geometry, outlines[outline]));
    if (pos) mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    if (scale) mesh.scale.set(...scale);
    return mesh;
  };
  const flat = (geometry, color, pos, scale) => {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color}));
    mesh.position.set(...pos);
    if (scale) mesh.scale.set(...scale);
    return mesh;
  };
  const pivot = (x, y, z = 0) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    return g;
  };
  const shadow = radius => {
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 24),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.16,
        depthWrite: false
      })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.005;
    return m;
  };

  return {toon, part, flat, pivot, shadow};
}

const C = {
  skin: 0xd9a47c,
  hair: 0x1d1714,
  knit: 0x1f1f23,
  navy: 0x2c3a5c,
  pants: 0x2d2d33,
  shoe: 0x3a281d,
  fur: 0xf0954a,
  furDark: 0xc4622a,
  pink: 0xe57a8a
};

export function createManal(kit) {
  const {part, flat, pivot, shadow} = kit;
  const root = new THREE.Group();
  const body = new THREE.Group(); // bobs while walking
  root.add(shadow(0.32), body);

  const sphere = new THREE.SphereGeometry(1, 24, 16);
  const capsule = (r, l) => new THREE.CapsuleGeometry(r, l, 6, 14);

  // legs
  const legs = [-1, 1].map(side => {
    const hip = pivot(side * 0.11, 0.93);
    hip.add(part(capsule(0.08, 0.7), C.pants, {pos: [0, -0.43, 0]}));
    hip.add(
      part(sphere, C.shoe, {pos: [0, -0.88, 0.05], scale: [0.09, 0.065, 0.16]})
    );
    body.add(hip);
    return hip;
  });

  // torso: navy blazer over a black turtleneck
  body.add(
    part(capsule(0.2, 0.36), C.navy, {
      pos: [0, 1.17, 0],
      scale: [1.22, 1, 0.74]
    })
  );
  body.add(
    part(capsule(0.11, 0.3), C.knit, {
      outline: "thin",
      pos: [0, 1.25, 0.11],
      scale: [1, 1, 0.55]
    })
  );
  for (const side of [-1, 1]) {
    // lapels
    const lapel = part(new THREE.BoxGeometry(0.06, 0.3, 0.02), C.navy, {
      outline: "thin",
      pos: [side * 0.125, 1.3, 0.165],
      rot: [0, side * 0.35, side * 0.22]
    });
    body.add(lapel);
  }
  body.add(
    part(new THREE.CylinderGeometry(0.08, 0.09, 0.2, 16), C.knit, {
      pos: [0, 1.55, 0.01]
    })
  );

  // arms
  const arms = [-1, 1].map(side => {
    const shoulder = pivot(side * 0.27, 1.44);
    shoulder.add(part(capsule(0.065, 0.48), C.navy, {pos: [0, -0.3, 0]}));
    shoulder.add(
      part(sphere, C.skin, {pos: [0, -0.62, 0], scale: [0.065, 0.075, 0.065]})
    );
    body.add(shoulder);
    return shoulder;
  });

  // head
  const head = pivot(0, 1.62);
  body.add(head);
  head.add(
    part(sphere, C.skin, {pos: [0, 0.15, 0], scale: [0.16, 0.19, 0.165]})
  );
  for (const side of [-1, 1]) {
    head.add(
      part(sphere, C.skin, {
        outline: "thin",
        pos: [side * 0.155, 0.15, -0.01],
        scale: [0.03, 0.05, 0.03]
      })
    );
  }
  // voluminous, wavy, swept-back hair
  const hairBlobs = [
    [0, 0.27, -0.02, 0.17, 0.12, 0.17],
    [-0.09, 0.33, 0.07, 0.09, 0.08, 0.09],
    [0.03, 0.37, 0.06, 0.1, 0.085, 0.1],
    [0.12, 0.33, 0.02, 0.085, 0.08, 0.09],
    [-0.13, 0.27, -0.04, 0.07, 0.09, 0.09],
    [0.14, 0.25, -0.06, 0.06, 0.09, 0.09],
    [-0.02, 0.33, -0.1, 0.1, 0.09, 0.09],
    [0.07, 0.31, 0.12, 0.07, 0.06, 0.06],
    [-0.15, 0.17, -0.03, 0.035, 0.08, 0.07],
    [0.15, 0.17, -0.03, 0.035, 0.08, 0.07],
    [0, 0.2, -0.13, 0.13, 0.12, 0.06]
  ];
  for (const [x, y, z, sx, sy, sz] of hairBlobs) {
    head.add(part(sphere, C.hair, {pos: [x, y, z], scale: [sx, sy, sz]}));
  }
  // face
  const eyes = new THREE.Group();
  for (const side of [-1, 1]) {
    eyes.add(
      flat(sphere, 0x111111, [side * 0.058, 0.165, 0.148], [0.018, 0.016, 0.01])
    );
    head.add(
      flat(sphere, C.hair, [side * 0.062, 0.212, 0.15], [0.034, 0.008, 0.01])
    );
  }
  head.add(eyes);
  head.add(
    part(sphere, C.skin, {
      outline: "thin",
      pos: [0, 0.115, 0.165],
      scale: [0.022, 0.03, 0.03]
    })
  );
  head.add(
    part(capsule(0.014, 0.07), C.hair, {
      outline: "thin",
      pos: [0, 0.07, 0.155],
      rot: [0, 0, Math.PI / 2]
    })
  );
  head.add(
    part(sphere, C.hair, {
      outline: "thin",
      pos: [0, 0.015, 0.145],
      scale: [0.032, 0.035, 0.022]
    })
  );
  // stubble shadow along the jaw
  head.add(flat(sphere, 0x9c7458, [0, 0.06, 0.02], [0.152, 0.1, 0.152]));

  return {root, body, legs, arms, head, eyes};
}

export function createCat(kit) {
  const {part, flat, pivot, shadow} = kit;
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(shadow(0.22), body);
  const sphere = new THREE.SphereGeometry(1, 20, 14);

  body.add(
    part(new THREE.CapsuleGeometry(0.1, 0.24, 6, 14), C.fur, {
      pos: [0, 0.22, 0],
      rot: [Math.PI / 2, 0, 0]
    })
  );
  for (const z of [-0.08, 0, 0.08]) {
    body.add(flat(sphere, C.furDark, [0, 0.315, z], [0.06, 0.012, 0.018]));
  }

  const legs = [
    [-0.055, 0.12],
    [0.055, -0.12],
    [0.055, 0.12],
    [-0.055, -0.12]
  ].map(([x, z]) => {
    const hip = pivot(x, 0.17, z);
    hip.add(
      part(new THREE.CapsuleGeometry(0.03, 0.09, 4, 10), C.fur, {
        pos: [0, -0.09, 0]
      })
    );
    body.add(hip);
    return hip;
  });

  const head = pivot(0, 0.33, 0.2);
  body.add(head);
  head.add(part(sphere, C.fur, {scale: [0.11, 0.1, 0.1]}));
  for (const side of [-1, 1]) {
    head.add(
      part(new THREE.ConeGeometry(0.04, 0.08, 4), C.fur, {
        outline: "thin",
        pos: [side * 0.06, 0.1, -0.01],
        rot: [0, 0, side * -0.25]
      })
    );
    head.add(
      flat(sphere, 0x111111, [side * 0.04, 0.015, 0.093], [0.014, 0.02, 0.01])
    );
  }
  head.add(flat(sphere, C.pink, [0, -0.02, 0.1], [0.014, 0.01, 0.01]));
  const eyes = head.children.filter(
    c => c.material?.color?.getHex() === 0x111111
  );

  const tail = pivot(0, 0.25, -0.2);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.06, -0.1),
    new THREE.Vector3(0, 0.2, -0.14),
    new THREE.Vector3(0.02, 0.3, -0.08)
  ]);
  tail.add(part(new THREE.TubeGeometry(curve, 20, 0.024, 8, false), C.fur));
  body.add(tail);

  return {root, body, legs, head, tail, eyes};
}

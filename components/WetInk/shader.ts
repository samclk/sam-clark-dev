/**
 * Wet ink: the glyphs arrive soft and turbulent, pull themselves sharp as they dry, and ripple
 * under the pointer afterwards.
 *
 * uTex holds the element's own text drawn white on transparent, so only the alpha channel carries
 * the glyphs and the colour is chosen here. uRes is in CSS pixels, not device pixels, so every
 * distance below is a distance the reader sees rather than one that halves on a retina screen. uProgress is the drying ramp, which starts at 1 for
 * text that should already be dry. uPointer lags the cursor and uTrail is how far behind it
 * currently is: the ripple's distance metric is stretched along that axis, so a moved cursor smears
 * the ring rather than dragging a circle.
 */
export const WET_INK = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uPointer;
uniform vec2 uTrail;
uniform float uTime;
uniform float uHover;
uniform float uProgress;
uniform vec3 uInk;
uniform vec3 uAccent;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 px = 1.0 / uRes;
  float wet = 1.0 - uProgress;

  vec2 rel = vUv * uRes - uPointer;
  float lag = length(uTrail);
  vec2 axis = lag > 0.5 ? uTrail / lag : vec2(1.0, 0.0);
  float stretch = 1.0 + min(lag * 0.028, 1.3);
  float dist = length(vec2(dot(rel, axis) / stretch, dot(rel, vec2(-axis.y, axis.x))));
  vec2 dir = normalize(rel + vec2(0.001));
  float wave = sin(dist * 0.32 - uTime * 1.9) * exp(-dist * 0.048) * uHover;

  vec2 flow = vec2(
    fbm(vUv * 5.0 + uTime * 0.06),
    fbm(vUv * 5.0 + 17.3 - uTime * 0.05)
  ) - 0.5;
  vec2 uv = vUv + flow * wet * 17.0 * px + dir * wave * 1.5 * px;

  float r = wet * 1.7;
  float a =
      texture2D(uTex, uv).a * 0.40
    + texture2D(uTex, uv + vec2( r,  0.0) * px).a * 0.15
    + texture2D(uTex, uv + vec2(-r,  0.0) * px).a * 0.15
    + texture2D(uTex, uv + vec2( 0.0,  r) * px).a * 0.15
    + texture2D(uTex, uv + vec2( 0.0, -r) * px).a * 0.15;

  // the threshold is what makes it read as drying; at uProgress 1 it is mixed out entirely
  float sharpened = smoothstep(0.38 - 0.26 * wet, 0.62 + 0.10 * wet, a);
  a = mix(a, sharpened, wet);
  // the glyph thickens a touch at the crest, which is what sells the ripple as liquid, not a warp
  a += (texture2D(uTex, uv + dir * 0.7 * px).a - a) * wave * 0.8;

  vec3 col = mix(uInk, uInk * 0.72 + uAccent * 0.14, wet * 0.7);
  col = mix(col, uAccent, exp(-dist * 0.044) * uHover * 0.6);

  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

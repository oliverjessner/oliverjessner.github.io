import { buildRoundedKeyBody } from "../plugins/keyboard-geometry.js";

// Shared by the server-rendered component and its small browser controller.
const config = {
  rows: [
    {
      text: "DATEN ANALYSE",
      label: "Daten Analyse",
      offset: 0,
      colors: ["purple", "lilac", "lavender", "pink", "purple", "graphite", "lilac", "purple", "pink", "lavender", "magenta", "lilac", "purple"],
    },
    {
      text: "JOURNALISMUS",
      label: "Journalismus",
      offset: 0.6,
      colors: ["lavender", "purple", "pink", "lilac", "magenta", "lavender", "purple", "pink", "lilac", "purple", "lavender", "graphite"],
    },
  ],
  palette: {
    purple: { color: "#a769f1", ink: "#210d38" },
    lilac: { color: "#b791ff", ink: "#251038" },
    lavender: { color: "#d0a5fb", ink: "#30203e" },
    pink: { color: "#f474b5", ink: "#331022" },
    magenta: { color: "#d85daa", ink: "#2e0d26" },
    graphite: { color: "#51415f", ink: "#f4eafb" },
    deepPurple: { color: "#793dcd", ink: "#fbf2ff" },
  },
  size: { key: 68, gap: 7, rowGap: 18, depth: 34, inset: 7, radius: 14, font: 35, paddingX: 42, paddingY: 46 },
  view: { tiltX: 40, tiltY: -5, rotation: -3, perspective: 1800 },
  space: { span: 6.5, offset: 3.7, color: "deepPurple" },
  motion: { press: 160, release: 180, compression: 0.22, squish: 1.075, idleCompression: 0.62, idleSquish: 1.035, idleMin: 3200, idleMax: 5600, idleHold: 160, resumeDelay: 4200, introDelay: 600, introGap: 700, introHold: 180 },
};

const { key, gap, depth, inset, paddingX, paddingY, rowGap } = config.size;
const pitch = key + gap;
const spaceWidth = config.space.span * pitch - gap;
const rowWidth = Math.max(config.space.offset * pitch + spaceWidth, ...config.rows.map(row => row.offset * pitch + [...row.text].length * pitch - gap));
const body = buildRoundedKeyBody({ depth, inset, radius: config.size.radius });
const css = {
  "layout-width": rowWidth + paddingX * 2,
  "layout-height": (config.rows.length + 1) * key + config.rows.length * rowGap + paddingY * 2,
  "key-size": key,
  gap,
  "row-gap": rowGap,
  depth,
  inset,
  radius: config.size.radius,
  "base-radius": config.size.radius + inset,
  "font-size": config.size.font,
  "padding-x": paddingX,
  "padding-y": paddingY,
  "wall-length": Math.hypot(depth, inset).toFixed(4),
  "wall-angle": `${Math.atan2(depth, inset) * 180 / Math.PI}deg`,
  "tilt-x": `${config.view.tiltX}deg`,
  "tilt-y": `${config.view.tiltY}deg`,
  rotation: `${config.view.rotation}deg`,
  perspective: config.view.perspective,
  "press-duration": `${config.motion.press}ms`,
  "release-duration": `${config.motion.release}ms`,
  compression: config.motion.compression,
  squish: config.motion.squish,
  "idle-compression": config.motion.idleCompression,
  "idle-squish": config.motion.idleSquish,
};

export default {
  ...config,
  body,
  style: Object.entries(css).map(([name, value]) => `--mk-${name}: ${value}`).join("; "),
  rows: config.rows.map(row => ({
    label: row.label,
    offset: row.offset * pitch,
    keys: [...row.text].map((letter, index) => ({
      letter: letter === " " ? "" : letter,
      label: letter === " " ? "Leere Taste zwischen Daten und Analyse" : `Taste ${letter}, ${row.label}, Position ${index + 1}`,
      color: config.palette[row.colors[index]],
    })),
  })),
  space: { ...config.space, label: "Leertaste", letter: "", width: spaceWidth, offset: config.space.offset * pitch, color: config.palette[config.space.color] },
};

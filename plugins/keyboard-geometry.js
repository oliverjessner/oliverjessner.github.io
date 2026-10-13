/** Rounded cross-sections close the body behind its four 3D wall planes. */
export function buildRoundedKeyBody({ depth, inset, radius, layers = 32 }) {
  if (![depth, inset, radius].every(Number.isFinite) || depth <= 0 || inset < 0 || radius <= 0) {
    throw new RangeError("Key depth and radius must be positive; inset must be non-negative");
  }
  if (!Number.isInteger(layers) || layers < 4 || layers > 64) {
    throw new RangeError("Body layers must be an integer between 4 and 64");
  }
  return Array.from({ length: layers }, (_, index) => {
    const progress = (index + 1) / (layers + 1);
    return {
      style: `--mk-body-inset: ${inset * progress}; --mk-body-radius: ${radius + inset * (1 - progress)}; --mk-body-z: ${depth * progress}`,
    };
  });
}

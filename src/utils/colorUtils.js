export function correlationColor(value) {
  if (value === null) return "#eee";
  const r = value > 0 ? 255 : Math.round(255 * (1 + value));
  const g = 255 - Math.abs(Math.round(255 * value));
  const b = value < 0 ? 255 : Math.round(255 * (1 - value));
  return `rgb(${r},${g},${b})`;
} 
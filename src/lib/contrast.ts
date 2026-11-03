/** WCAG 2.x contrast ratio between two #RRGGBB colors. */
export function luminance(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16);
  const channel = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Rounded down, so 4.499 is never shown as a pass. */
export function formatRatio(ratio: number): string {
  return (Math.floor(ratio * 100) / 100).toFixed(2);
}

/** WCAG level for text: AAA 7, AA 4.5 (large text: AAA 4.5, AA 3). */
export function textLevel(ratio: number, large = false): 'AAA' | 'AA' | 'Fail' {
  const r = Math.floor(ratio * 100) / 100;
  if (r >= (large ? 4.5 : 7)) return 'AAA';
  if (r >= (large ? 3 : 4.5)) return 'AA';
  return 'Fail';
}

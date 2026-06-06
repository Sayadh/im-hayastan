/** Convert minutes to a human-readable Armenian duration: "1ժ 30ր" / "45ր". */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}ր`
  if (m === 0) return `${h}ժ`
  return `${h}ժ ${m}ր`
}

/** Split a comma-separated "a, b, c" string into a trimmed, non-empty array. */
export function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

/** Parse "2,3,4" into a list of numeric ids. */
export function parseIds(value: string): number[] {
  return splitCsv(value)
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n))
}

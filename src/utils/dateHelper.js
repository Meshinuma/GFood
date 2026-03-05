/**
 * Parses any date value to a UTC Date object.
 * Strings without timezone info are treated as UTC.
 * Returns null on invalid input.
 * @param {string|Date|*} value
 * @returns {Date|null}
 */
export const toUtcDate = (value) => {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === 'string') {
    const hasTimeZone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(value)
    const normalized = hasTimeZone ? value : `${value}Z`
    const parsed = new Date(normalized)
    return isNaN(parsed.getTime()) ? null : parsed
  }
  const parsed = new Date(value)
  return isNaN(parsed.getTime()) ? null : parsed
}

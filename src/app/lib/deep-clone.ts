/**
 * Deep clone utility function.
 *
 * Uses the native `structuredClone` API if available,
 * otherwise falls back to JSON serialization.
 *
 * Notes:
 * - JSON serialization does not support circular references, functions, Symbol, BigInt, etc.
 * - `structuredClone` supports more data types, but still does not support functions.
 *
 * @param value The value to deep clone
 * @returns A deep cloned copy of the input value
 */
export const deepClone = <T>(value: T): T => {
  if (value === null || value === undefined) {
    return value;
  }

  // Prefer native structuredClone if available
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(value);
    } catch (error) {
      console.warn("structuredClone failed, falling back to JSON", error);
    }
  }

  // Fallback: JSON serialization (note: limited support)
  return JSON.parse(JSON.stringify(value)) as T;
};

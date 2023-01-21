export function firstField<T>(fields: T | T[]) {
  return Array.isArray(fields) ? fields[0] : fields;
}

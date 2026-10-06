import { Transform } from 'class-transformer';

/** Treats blank strings coming from forms as "no value". */
export const EmptyToNull = () =>
  Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' && value.trim() === '' ? null : value,
  );

/** Converts an optional `YYYY-MM-DD` string into a Date (or null). */
export function toDate(value: string | null | undefined): Date | null {
  return value ? new Date(value) : null;
}

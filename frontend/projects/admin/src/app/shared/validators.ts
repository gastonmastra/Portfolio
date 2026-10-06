import { SchemaPath, validate } from '@angular/forms/signals';

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Optional URL: empty is fine, otherwise it must be an http(s) URL. */
export function optionalUrl(path: SchemaPath<string>): void {
  validate(path, ({ value }) =>
    value() && !isHttpUrl(value())
      ? { kind: 'url', message: 'Enter a full URL, e.g. https://example.com' }
      : null,
  );
}

/** The end date (YYYY-MM-DD) must not be before the start date. */
export function endAfterStart(start: SchemaPath<string>, end: SchemaPath<string>): void {
  validate(end, ({ value, valueOf }) => {
    const from = valueOf(start);
    return value() && from && value() < from
      ? { kind: 'dateRange', message: 'End date must be after the start date' }
      : null;
  });
}

/** Converts an ISO timestamp from the API into the `YYYY-MM-DD` used by date inputs. */
export function toDateInput(iso: string | null): string {
  return iso ? iso.slice(0, 10) : '';
}

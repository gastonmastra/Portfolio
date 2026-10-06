import { Injector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { endAfterStart, optionalUrl, toDateInput } from './validators';

describe('admin validators', () => {
  function createForm(value: { url: string; start: string; end: string }) {
    const injector = TestBed.inject(Injector);
    return form(
      signal(value),
      (path) => {
        optionalUrl(path.url);
        endAfterStart(path.start, path.end);
      },
      { injector },
    );
  }

  it('accepts empty or http(s) URLs only', () => {
    expect(createForm({ url: '', start: '', end: '' }).url().valid()).toBe(true);
    expect(createForm({ url: 'https://a.dev', start: '', end: '' }).url().valid()).toBe(true);
    expect(createForm({ url: 'ftp://a.dev', start: '', end: '' }).url().valid()).toBe(false);
  });

  it('rejects an end date before the start date', () => {
    expect(createForm({ url: '', start: '2024-05-01', end: '2024-01-01' }).end().valid()).toBe(false);
    expect(createForm({ url: '', start: '2024-05-01', end: '' }).end().valid()).toBe(true);
  });

  it('converts API timestamps for date inputs', () => {
    expect(toDateInput('2024-10-01T00:00:00.000Z')).toBe('2024-10-01');
    expect(toDateInput(null)).toBe('');
  });
});

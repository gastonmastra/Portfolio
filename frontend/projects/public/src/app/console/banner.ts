import { Component, computed, input } from '@angular/core';
import figlet from 'figlet/browser';
import ansiShadow from 'figlet/fonts/ANSI Shadow';

const FONT = 'ANSI Shadow';
figlet.parseFont(FONT, ansiShadow);

/** figlet fonts only cover ASCII, so "Gastón" must become "GASTON". */
function toAscii(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
}

function render(word: string): string {
  return figlet.textSync(toAscii(word), { font: FONT }).trimEnd();
}

/** Big ASCII-art logo built from the owner's first and last name. */
@Component({
  selector: 'app-banner',
  template: `
    <h1 class="visually-hidden">{{ firstName() }} {{ lastName() }}</h1>
    @for (word of words(); track $index) {
      <pre aria-hidden="true" [style.--cols]="word.cols">{{ word.art }}</pre>
    }
  `,
  styles: `
    :host {
      display: block;
      container-type: inline-size;
      color: var(--accent);
    }
    pre {
      margin: 0;
      font-family: var(--font);
      /* Shrinks each word so it always fits the available width. */
      font-size: min(14px, calc(100cqi / var(--cols) / 0.62));
      line-height: 1.05;
      overflow: hidden;
    }
  `,
})
export class Banner {
  readonly firstName = input.required<string>();
  readonly lastName = input.required<string>();

  protected readonly words = computed(() =>
    [this.firstName(), this.lastName()]
      .filter((word) => word.trim())
      .map((word) => {
        const art = render(word);
        const cols = Math.max(...art.split('\n').map((line) => line.length));
        return { art, cols };
      }),
  );
}

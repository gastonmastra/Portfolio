import { Component } from '@angular/core';
import { MENU } from './commands';

@Component({
  selector: 'app-help-output',
  template: `
    <h2 class="section-title">Help</h2>
    <dl>
      @for (option of menu; track option.key) {
        <dt><span class="accent">{{ option.key }}</span> | {{ option.aliases[0] }}</dt>
        <dd>{{ option.label }}</dd>
      }
      <dt><span class="accent">help</span></dt>
      <dd>Show this list</dd>
      <dt><span class="accent">clear</span></dt>
      <dd>Clear the screen</dd>
    </dl>
    <p class="dim">Tip: use ↑ and ↓ to browse previous commands.</p>
  `,
  styles: `
    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.15rem 3ch;
      margin: 0.75rem 0;
      padding-left: 2ch;
    }
    dd {
      margin: 0;
      color: var(--dim);
    }
  `,
})
export class HelpOutput {
  protected readonly menu = MENU;
}

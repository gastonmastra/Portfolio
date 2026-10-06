import { Component, computed, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';

/** Lists the validation errors of a field once the user has interacted with it. */
@Component({
  selector: 'app-field-errors',
  template: `
    @if (visible()) {
      <ul class="field-errors">
        @for (error of field()().errors(); track $index) {
          <li>{{ error.message ?? error.kind }}</li>
        }
      </ul>
    }
  `,
})
export class FieldErrors {
  readonly field = input.required<FieldTree<unknown>>();

  protected readonly visible = computed(() => {
    const state = this.field()();
    return state.touched() && state.errors().length > 0;
  });
}

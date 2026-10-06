import { Directive, computed, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';

/** Exposes the validity of every `[formField]` control to assistive technologies. */
@Directive({
  selector: '[formField]',
  host: { '[attr.aria-invalid]': 'invalid()' },
})
export class AriaInvalid {
  private readonly field = inject(FormField);

  protected readonly invalid = computed(() => {
    const state = this.field.state();
    return state.touched() && state.invalid() ? 'true' : null;
  });
}

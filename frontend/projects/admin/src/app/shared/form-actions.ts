import { Component, computed, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

/** Submit / cancel buttons plus form-level (server) errors. */
@Component({
  selector: 'app-form-actions',
  imports: [RouterLink],
  template: `
    @if (serverErrors().length) {
      <div class="alert error" role="alert">
        @for (error of serverErrors(); track $index) {
          <p>{{ error }}</p>
        }
      </div>
    }
    <div class="form-actions">
      <button type="submit" class="button primary" [disabled]="form()().submitting()">
        {{ form()().submitting() ? 'Saving…' : 'Save' }}
      </button>
      @if (cancelLink(); as link) {
        <a class="button" [routerLink]="link">Cancel</a>
      }
    </div>
  `,
})
export class FormActions {
  readonly form = input.required<FieldTree<unknown>>();
  readonly cancelLink = input<string | null>('..');

  protected readonly serverErrors = computed(() =>
    this.form()()
      .errors()
      .filter((error) => error.kind === 'server')
      .map((error) => error.message ?? 'Unexpected error'),
  );
}

import { HttpResourceRef } from '@angular/common/http';
import { Component, OnInit, input } from '@angular/core';

/**
 * Loading / error line shown while a section's data is not available.
 * A failed request is retried when the section is printed again.
 */
@Component({
  selector: 'app-fetch-status',
  template: `
    @if (resource().error()) {
      <p class="error" role="alert">
        ✗ Could not load {{ label() }}. Is the public API running? Run the command again to retry.
      </p>
    } @else {
      <p class="dim">⠿ fetching {{ label() }}…</p>
    }
  `,
})
export class FetchStatus implements OnInit {
  readonly resource = input.required<HttpResourceRef<unknown>>();
  readonly label = input.required<string>();

  ngOnInit(): void {
    if (this.resource().error()) this.resource().reload();
  }
}

import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ListRow {
  id: number;
  /** Used to give action buttons an accessible name. */
  label: string;
  cells: string[];
}

/** Page header + table with edit / delete actions, shared by every list page. */
@Component({
  selector: 'app-list-table',
  imports: [RouterLink],
  template: `
    <div class="page-header">
      <h1>{{ title() }}</h1>
      <a class="button primary" routerLink="new">New {{ singular() }}</a>
    </div>

    @if (error()) {
      <p class="alert error" role="alert">{{ error() }}</p>
    } @else if (loading()) {
      <p class="muted">Loading…</p>
    } @else if (!rows().length) {
      <p class="muted">Nothing here yet.</p>
    } @else {
      <div class="table-wrapper">
        <table>
          <caption class="visually-hidden">{{ title() }}</caption>
          <thead>
            <tr>
              @for (header of headers(); track header) {
                <th scope="col">{{ header }}</th>
              }
              <th scope="col"><span class="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.id) {
              <tr>
                @for (cell of row.cells; track $index) {
                  <td>{{ cell }}</td>
                }
                <td class="actions">
                  <a class="button" [routerLink]="[row.id]">
                    Edit<span class="visually-hidden"> {{ row.label }}</span>
                  </a>
                  <button type="button" class="button danger" (click)="confirmRemove(row)">
                    Delete<span class="visually-hidden"> {{ row.label }}</span>
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
})
export class ListTable {
  readonly title = input.required<string>();
  readonly singular = input.required<string>();
  readonly headers = input.required<string[]>();
  readonly rows = input.required<ListRow[]>();
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly remove = output<ListRow>();

  protected confirmRemove(row: ListRow): void {
    if (confirm(`Delete "${row.label}"? This cannot be undone.`)) {
      this.remove.emit(row);
    }
  }
}

import { httpResource } from '@angular/common/http';
import { Component, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import type { Skill } from '@shared/models';
import { API } from '../data/admin-api';

/** Multi-select of skills, usable with `[formField]` on a `number[]` field. */
@Component({
  selector: 'app-skill-picker',
  template: `
    <fieldset>
      <legend>Skills used</legend>
      @if (skills.hasValue()) {
        <div class="options">
          @for (skill of skills.value(); track skill.id) {
            <label class="check">
              <input
                type="checkbox"
                [checked]="value().includes(skill.id)"
                (change)="toggle(skill.id)"
              />
              {{ skill.name }}
            </label>
          } @empty {
            <p class="muted">No skills yet. Create them in the Skills section first.</p>
          }
        </div>
      } @else if (skills.error()) {
        <p class="error" role="alert">Could not load skills.</p>
      } @else {
        <p class="muted">Loading skills…</p>
      }
    </fieldset>
  `,
  styles: `
    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
    }
  `,
})
export class SkillPicker implements FormValueControl<number[]> {
  readonly value = model<number[]>([]);

  protected readonly skills = httpResource<Skill[]>(() => `${API}/skills`);

  protected toggle(id: number): void {
    this.value.update((ids) =>
      ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id],
    );
  }
}

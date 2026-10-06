import { AriaInvalid } from '../../shared/aria-invalid';
import { Component, OnInit, input } from '@angular/core';
import { FormField, maxLength, required } from '@angular/forms/signals';
import type { Skill, SkillCategory } from '@shared/models';
import { createEntityEditor } from '../../shared/entity-editor';
import { FieldErrors } from '../../shared/field-errors';
import { FormActions } from '../../shared/form-actions';

interface SkillModel {
  name: string;
  category: SkillCategory;
  description: string;
  sortOrder: number;
}

@Component({
  selector: 'app-skill-form',
  imports: [FormField, AriaInvalid, FieldErrors, FormActions],
  template: `
    <h1>{{ id() ? 'Edit skill' : 'New skill' }}</h1>
    @if (editor.loadError(); as error) {
      <p class="alert error" role="alert">{{ error }}</p>
    }
    <form class="form" novalidate (submit)="$event.preventDefault(); editor.save()">
      <div class="field">
        <label for="name">Name</label>
        <input id="name" [formField]="f.name" aria-describedby="name-errors" />
        <app-field-errors id="name-errors" [field]="f.name" />
      </div>

      <div class="field">
        <label for="category">Category</label>
        <select id="category" [formField]="f.category">
          <option value="TECHNOLOGY">Technology</option>
          <option value="TOOL">Tool</option>
        </select>
      </div>

      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" rows="5" [formField]="f.description" aria-describedby="description-errors"></textarea>
        <app-field-errors id="description-errors" [field]="f.description" />
      </div>

      <div class="field narrow">
        <label for="sortOrder">Sort order</label>
        <input id="sortOrder" type="number" step="1" [formField]="f.sortOrder" aria-describedby="sortOrder-hint" />
        <small id="sortOrder-hint" class="muted">Lower numbers are shown first.</small>
      </div>

      <app-form-actions [form]="f" />
    </form>
  `,
})
export class SkillForm implements OnInit {
  /** Route parameter; undefined when creating. */
  readonly id = input<string>();

  protected readonly editor = createEntityEditor<SkillModel, Skill>({
    resource: 'skills',
    empty: { name: '', category: 'TECHNOLOGY', description: '', sortOrder: 0 },
    schema: (path) => {
      required(path.name, { message: 'Name is required' });
      maxLength(path.name, 80, { message: 'Use at most 80 characters' });
      maxLength(path.description, 2000, { message: 'Use at most 2000 characters' });
    },
    toModel: (skill) => ({
      name: skill.name,
      category: skill.category,
      description: skill.description ?? '',
      sortOrder: skill.sortOrder,
    }),
    toBody: (model) => model,
  });
  protected readonly f = this.editor.form;

  ngOnInit(): void {
    void this.editor.load(this.id());
  }
}

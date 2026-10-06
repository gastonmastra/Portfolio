import { AriaInvalid } from '../../shared/aria-invalid';
import { Component, OnInit, input } from '@angular/core';
import { FormField, max, maxLength, min, required, validate } from '@angular/forms/signals';
import type { Study, StudyModality } from '@shared/models';
import { createEntityEditor } from '../../shared/entity-editor';
import { FieldErrors } from '../../shared/field-errors';
import { FormActions } from '../../shared/form-actions';

interface StudyModel {
  title: string;
  institution: string;
  modality: StudyModality;
  gradeAverage: number | null;
  startYear: number | null;
  endYear: number | null;
  description: string;
  sortOrder: number;
}

@Component({
  selector: 'app-study-form',
  imports: [FormField, AriaInvalid, FieldErrors, FormActions],
  template: `
    <h1>{{ id() ? 'Edit study' : 'New study' }}</h1>
    @if (editor.loadError(); as error) {
      <p class="alert error" role="alert">{{ error }}</p>
    }
    <form class="form" novalidate (submit)="$event.preventDefault(); editor.save()">
      <div class="field">
        <label for="title">Title</label>
        <input id="title" [formField]="f.title" aria-describedby="title-errors" />
        <app-field-errors id="title-errors" [field]="f.title" />
      </div>

      <div class="row">
        <div class="field">
          <label for="institution">Institution</label>
          <input id="institution" [formField]="f.institution" aria-describedby="institution-errors" />
          <app-field-errors id="institution-errors" [field]="f.institution" />
        </div>
        <div class="field">
          <label for="modality">Modality</label>
          <select id="modality" [formField]="f.modality">
            <option value="PRESENTIAL">Presential</option>
            <option value="REMOTE">Remote</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label for="startYear">Start year</label>
          <input id="startYear" type="number" step="1" [formField]="f.startYear" aria-describedby="startYear-errors" />
          <app-field-errors id="startYear-errors" [field]="f.startYear" />
        </div>
        <div class="field">
          <label for="endYear">End year</label>
          <input id="endYear" type="number" step="1" [formField]="f.endYear" aria-describedby="endYear-hint endYear-errors" />
          <small id="endYear-hint" class="muted">Leave empty if still in progress.</small>
          <app-field-errors id="endYear-errors" [field]="f.endYear" />
        </div>
        <div class="field">
          <label for="gradeAverage">Grade average</label>
          <input id="gradeAverage" type="number" step="0.01" [formField]="f.gradeAverage" aria-describedby="gradeAverage-errors" />
          <app-field-errors id="gradeAverage-errors" [field]="f.gradeAverage" />
        </div>
      </div>

      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" rows="5" [formField]="f.description" aria-describedby="description-errors"></textarea>
        <app-field-errors id="description-errors" [field]="f.description" />
      </div>

      <div class="field narrow">
        <label for="sortOrder">Sort order</label>
        <input id="sortOrder" type="number" step="1" [formField]="f.sortOrder" aria-describedby="sortOrder-hint" />
        <small id="sortOrder-hint" class="muted">Lower numbers are shown first; ties are sorted by start year.</small>
      </div>

      <app-form-actions [form]="f" />
    </form>
  `,
})
export class StudyForm implements OnInit {
  readonly id = input<string>();

  protected readonly editor = createEntityEditor<StudyModel, Study>({
    resource: 'studies',
    empty: {
      title: '',
      institution: '',
      modality: 'PRESENTIAL',
      gradeAverage: null,
      startYear: null,
      endYear: null,
      description: '',
      sortOrder: 0,
    },
    schema: (path) => {
      required(path.title, { message: 'Title is required' });
      maxLength(path.title, 160, { message: 'Use at most 160 characters' });
      required(path.institution, { message: 'Institution is required' });
      maxLength(path.institution, 160, { message: 'Use at most 160 characters' });
      required(path.startYear, { message: 'Start year is required' });
      min(path.startYear, 1900, { message: 'Enter a valid year' });
      max(path.startYear, 2200, { message: 'Enter a valid year' });
      min(path.endYear, 1900, { message: 'Enter a valid year' });
      max(path.endYear, 2200, { message: 'Enter a valid year' });
      validate(path.endYear, ({ value, valueOf }) => {
        const start = valueOf(path.startYear);
        const end = value();
        return end !== null && start !== null && end < start
          ? { kind: 'yearRange', message: 'End year must not be before the start year' }
          : null;
      });
      min(path.gradeAverage, 0, { message: 'Must be 0 or more' });
      max(path.gradeAverage, 100, { message: 'Must be 100 or less' });
      maxLength(path.description, 4000, { message: 'Use at most 4000 characters' });
    },
    toModel: (study) => ({
      title: study.title,
      institution: study.institution,
      modality: study.modality,
      gradeAverage: study.gradeAverage,
      startYear: study.startYear,
      endYear: study.endYear,
      description: study.description ?? '',
      sortOrder: study.sortOrder,
    }),
    toBody: (model) => model,
  });
  protected readonly f = this.editor.form;

  ngOnInit(): void {
    void this.editor.load(this.id());
  }
}

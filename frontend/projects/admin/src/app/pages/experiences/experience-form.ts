import { AriaInvalid } from '../../shared/aria-invalid';
import { Component, OnInit, input } from '@angular/core';
import { FormField, maxLength, required } from '@angular/forms/signals';
import type { Experience } from '@shared/models';
import { createEntityEditor } from '../../shared/entity-editor';
import { FieldErrors } from '../../shared/field-errors';
import { FormActions } from '../../shared/form-actions';
import { SkillPicker } from '../../shared/skill-picker';
import { endAfterStart, toDateInput } from '../../shared/validators';

interface ExperienceModel {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  sortOrder: number;
  skillIds: number[];
}

@Component({
  selector: 'app-experience-form',
  imports: [FormField, AriaInvalid, FieldErrors, FormActions, SkillPicker],
  template: `
    <h1>{{ id() ? 'Edit experience' : 'New experience' }}</h1>
    @if (editor.loadError(); as error) {
      <p class="alert error" role="alert">{{ error }}</p>
    }
    <form class="form" novalidate (submit)="$event.preventDefault(); editor.save()">
      <div class="row">
        <div class="field">
          <label for="title">Job title</label>
          <input id="title" [formField]="f.title" aria-describedby="title-errors" />
          <app-field-errors id="title-errors" [field]="f.title" />
        </div>
        <div class="field">
          <label for="company">Company</label>
          <input id="company" [formField]="f.company" aria-describedby="company-errors" />
          <app-field-errors id="company-errors" [field]="f.company" />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label for="startDate">Start date</label>
          <input id="startDate" type="date" [formField]="f.startDate" aria-describedby="startDate-errors" />
          <app-field-errors id="startDate-errors" [field]="f.startDate" />
        </div>
        <div class="field">
          <label for="endDate">End date</label>
          <input id="endDate" type="date" [formField]="f.endDate" aria-describedby="endDate-hint endDate-errors" />
          <small id="endDate-hint" class="muted">Leave empty if you still work there.</small>
          <app-field-errors id="endDate-errors" [field]="f.endDate" />
        </div>
      </div>

      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" rows="6" [formField]="f.description" aria-describedby="description-errors"></textarea>
        <app-field-errors id="description-errors" [field]="f.description" />
      </div>

      <app-skill-picker [formField]="f.skillIds" />

      <div class="field narrow">
        <label for="sortOrder">Sort order</label>
        <input id="sortOrder" type="number" step="1" [formField]="f.sortOrder" aria-describedby="sortOrder-hint" />
        <small id="sortOrder-hint" class="muted">Lower numbers are shown first; ties are sorted by start date.</small>
      </div>

      <app-form-actions [form]="f" />
    </form>
  `,
})
export class ExperienceForm implements OnInit {
  readonly id = input<string>();

  protected readonly editor = createEntityEditor<ExperienceModel, Experience>({
    resource: 'experiences',
    empty: {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      sortOrder: 0,
      skillIds: [],
    },
    schema: (path) => {
      required(path.title, { message: 'Job title is required' });
      maxLength(path.title, 160, { message: 'Use at most 160 characters' });
      required(path.company, { message: 'Company is required' });
      maxLength(path.company, 160, { message: 'Use at most 160 characters' });
      required(path.startDate, { message: 'Start date is required' });
      endAfterStart(path.startDate, path.endDate);
      maxLength(path.description, 4000, { message: 'Use at most 4000 characters' });
    },
    toModel: (job) => ({
      title: job.title,
      company: job.company,
      startDate: toDateInput(job.startDate),
      endDate: toDateInput(job.endDate),
      description: job.description ?? '',
      sortOrder: job.sortOrder,
      skillIds: job.skills.map((skill) => skill.id),
    }),
    toBody: (model) => model,
  });
  protected readonly f = this.editor.form;

  ngOnInit(): void {
    void this.editor.load(this.id());
  }
}

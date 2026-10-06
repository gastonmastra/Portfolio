import { AriaInvalid } from '../../shared/aria-invalid';
import { Component, OnInit, input } from '@angular/core';
import { FormField, maxLength, required } from '@angular/forms/signals';
import type { Project } from '@shared/models';
import { createEntityEditor } from '../../shared/entity-editor';
import { FieldErrors } from '../../shared/field-errors';
import { FormActions } from '../../shared/form-actions';
import { SkillPicker } from '../../shared/skill-picker';
import { endAfterStart, optionalUrl, toDateInput } from '../../shared/validators';

interface ProjectModel {
  name: string;
  description: string;
  url: string;
  repoUrl: string;
  startDate: string;
  endDate: string;
  sortOrder: number;
  skillIds: number[];
}

@Component({
  selector: 'app-project-form',
  imports: [FormField, AriaInvalid, FieldErrors, FormActions, SkillPicker],
  template: `
    <h1>{{ id() ? 'Edit project' : 'New project' }}</h1>
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
        <label for="description">Description</label>
        <textarea id="description" rows="5" [formField]="f.description" aria-describedby="description-errors"></textarea>
        <app-field-errors id="description-errors" [field]="f.description" />
      </div>

      <div class="row">
        <div class="field">
          <label for="url">Live URL</label>
          <input id="url" type="url" [formField]="f.url" aria-describedby="url-errors" />
          <app-field-errors id="url-errors" [field]="f.url" />
        </div>
        <div class="field">
          <label for="repoUrl">Repository URL</label>
          <input id="repoUrl" type="url" [formField]="f.repoUrl" aria-describedby="repoUrl-errors" />
          <app-field-errors id="repoUrl-errors" [field]="f.repoUrl" />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label for="startDate">Start date</label>
          <input id="startDate" type="date" [formField]="f.startDate" />
        </div>
        <div class="field">
          <label for="endDate">End date</label>
          <input id="endDate" type="date" [formField]="f.endDate" aria-describedby="endDate-errors" />
          <app-field-errors id="endDate-errors" [field]="f.endDate" />
        </div>
      </div>

      <app-skill-picker [formField]="f.skillIds" />

      <div class="field narrow">
        <label for="sortOrder">Sort order</label>
        <input id="sortOrder" type="number" step="1" [formField]="f.sortOrder" aria-describedby="sortOrder-hint" />
        <small id="sortOrder-hint" class="muted">Lower numbers are shown first.</small>
      </div>

      <app-form-actions [form]="f" />
    </form>
  `,
})
export class ProjectForm implements OnInit {
  readonly id = input<string>();

  protected readonly editor = createEntityEditor<ProjectModel, Project>({
    resource: 'projects',
    empty: {
      name: '',
      description: '',
      url: '',
      repoUrl: '',
      startDate: '',
      endDate: '',
      sortOrder: 0,
      skillIds: [],
    },
    schema: (path) => {
      required(path.name, { message: 'Name is required' });
      maxLength(path.name, 160, { message: 'Use at most 160 characters' });
      maxLength(path.description, 4000, { message: 'Use at most 4000 characters' });
      optionalUrl(path.url);
      optionalUrl(path.repoUrl);
      endAfterStart(path.startDate, path.endDate);
    },
    toModel: (project) => ({
      name: project.name,
      description: project.description ?? '',
      url: project.url ?? '',
      repoUrl: project.repoUrl ?? '',
      startDate: toDateInput(project.startDate),
      endDate: toDateInput(project.endDate),
      sortOrder: project.sortOrder,
      skillIds: project.skills.map((skill) => skill.id),
    }),
    toBody: (model) => model,
  });
  protected readonly f = this.editor.form;

  ngOnInit(): void {
    void this.editor.load(this.id());
  }
}

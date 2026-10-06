import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import type { Project } from '@shared/models';
import { API, AdminApi, errorMessage } from '../../data/admin-api';
import { ListRow, ListTable } from '../../shared/list-table';

@Component({
  selector: 'app-project-list',
  imports: [ListTable],
  template: `
    <app-list-table
      title="Projects"
      singular="project"
      [headers]="['Name', 'Skills', 'Order']"
      [rows]="rows()"
      [loading]="projects.isLoading()"
      [error]="error()"
      (remove)="remove($event)"
    />
  `,
})
export class ProjectList {
  private readonly api = inject(AdminApi);
  protected readonly projects = httpResource<Project[]>(() => `${API}/projects`);
  private readonly actionError = signal<string | null>(null);

  protected readonly error = computed(() =>
    this.projects.error() ? errorMessage(this.projects.error()) : this.actionError(),
  );
  protected readonly rows = computed<ListRow[]>(() =>
    (this.projects.hasValue() ? this.projects.value() : []).map((project) => ({
      id: project.id,
      label: project.name,
      cells: [
        project.name,
        project.skills.map((skill) => skill.name).join(', ') || '—',
        `${project.sortOrder}`,
      ],
    })),
  );

  protected async remove(row: ListRow): Promise<void> {
    try {
      await this.api.remove('projects', row.id);
      this.projects.reload();
    } catch (error) {
      this.actionError.set(errorMessage(error));
    }
  }
}

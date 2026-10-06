import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import type { Skill } from '@shared/models';
import { API, AdminApi, errorMessage } from '../../data/admin-api';
import { ListRow, ListTable } from '../../shared/list-table';

@Component({
  selector: 'app-skill-list',
  imports: [ListTable],
  template: `
    <app-list-table
      title="Skills"
      singular="skill"
      [headers]="['Name', 'Category', 'Order']"
      [rows]="rows()"
      [loading]="skills.isLoading()"
      [error]="error()"
      (remove)="remove($event)"
    />
  `,
})
export class SkillList {
  private readonly api = inject(AdminApi);
  protected readonly skills = httpResource<Skill[]>(() => `${API}/skills`);
  private readonly actionError = signal<string | null>(null);

  protected readonly error = computed(() =>
    this.skills.error() ? errorMessage(this.skills.error()) : this.actionError(),
  );
  protected readonly rows = computed<ListRow[]>(() =>
    (this.skills.hasValue() ? this.skills.value() : []).map((skill) => ({
      id: skill.id,
      label: skill.name,
      cells: [skill.name, skill.category === 'TOOL' ? 'Tool' : 'Technology', `${skill.sortOrder}`],
    })),
  );

  protected async remove(row: ListRow): Promise<void> {
    try {
      await this.api.remove('skills', row.id);
      this.skills.reload();
    } catch (error) {
      this.actionError.set(errorMessage(error));
    }
  }
}

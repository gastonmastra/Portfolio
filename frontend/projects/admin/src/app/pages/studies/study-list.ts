import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import type { Study } from '@shared/models';
import { API, AdminApi, errorMessage } from '../../data/admin-api';
import { ListRow, ListTable } from '../../shared/list-table';

@Component({
  selector: 'app-study-list',
  imports: [ListTable],
  template: `
    <app-list-table
      title="Studies"
      singular="study"
      [headers]="['Title', 'Institution', 'Years', 'Order']"
      [rows]="rows()"
      [loading]="studies.isLoading()"
      [error]="error()"
      (remove)="remove($event)"
    />
  `,
})
export class StudyList {
  private readonly api = inject(AdminApi);
  protected readonly studies = httpResource<Study[]>(() => `${API}/studies`);
  private readonly actionError = signal<string | null>(null);

  protected readonly error = computed(() =>
    this.studies.error() ? errorMessage(this.studies.error()) : this.actionError(),
  );
  protected readonly rows = computed<ListRow[]>(() =>
    (this.studies.hasValue() ? this.studies.value() : []).map((study) => ({
      id: study.id,
      label: study.title,
      cells: [
        study.title,
        study.institution,
        `${study.startYear} – ${study.endYear ?? 'In progress'}`,
        `${study.sortOrder}`,
      ],
    })),
  );

  protected async remove(row: ListRow): Promise<void> {
    try {
      await this.api.remove('studies', row.id);
      this.studies.reload();
    } catch (error) {
      this.actionError.set(errorMessage(error));
    }
  }
}

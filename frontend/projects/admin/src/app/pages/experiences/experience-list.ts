import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { formatMonthYear } from '@shared/dates';
import type { Experience } from '@shared/models';
import { API, AdminApi, errorMessage } from '../../data/admin-api';
import { ListRow, ListTable } from '../../shared/list-table';

@Component({
  selector: 'app-experience-list',
  imports: [ListTable],
  template: `
    <app-list-table
      title="Experience"
      singular="experience"
      [headers]="['Title', 'Company', 'Period', 'Order']"
      [rows]="rows()"
      [loading]="experiences.isLoading()"
      [error]="error()"
      (remove)="remove($event)"
    />
  `,
})
export class ExperienceList {
  private readonly api = inject(AdminApi);
  protected readonly experiences = httpResource<Experience[]>(() => `${API}/experiences`);
  private readonly actionError = signal<string | null>(null);

  protected readonly error = computed(() =>
    this.experiences.error() ? errorMessage(this.experiences.error()) : this.actionError(),
  );
  protected readonly rows = computed<ListRow[]>(() =>
    (this.experiences.hasValue() ? this.experiences.value() : []).map((job) => ({
      id: job.id,
      label: `${job.title} at ${job.company}`,
      cells: [
        job.title,
        job.company,
        `${formatMonthYear(job.startDate)} – ${job.endDate ? formatMonthYear(job.endDate) : 'Present'}`,
        `${job.sortOrder}`,
      ],
    })),
  );

  protected async remove(row: ListRow): Promise<void> {
    try {
      await this.api.remove('experiences', row.id);
      this.experiences.reload();
    } catch (error) {
      this.actionError.set(errorMessage(error));
    }
  }
}

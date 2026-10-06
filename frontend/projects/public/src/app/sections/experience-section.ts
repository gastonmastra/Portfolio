import { Component, inject } from '@angular/core';
import { formatPeriod } from '@shared/dates';
import { PortfolioApi } from '../data/portfolio-api';
import { FetchStatus } from './fetch-status';

@Component({
  selector: 'app-experience-section',
  imports: [FetchStatus],
  template: `
    <h2 class="section-title">Experience</h2>
    @if (experiences.hasValue()) {
      <ul class="entries">
        @for (job of experiences.value(); track job.id) {
          <li>
            <h3>{{ job.title }} <span class="dim">@</span> {{ job.company }}</h3>
            <div class="entry-body">
              <p class="dim">{{ period(job.startDate, job.endDate) }}</p>
              @if (job.description) {
                <p>{{ job.description }}</p>
              }
              @if (job.skills.length) {
                <p class="tags">
                  <span class="dim">stack:</span>
                  @for (skill of job.skills; track skill.id) {
                    {{ skill.name }}{{ $last ? '' : ' ·' }}
                  }
                </p>
              }
            </div>
          </li>
        } @empty {
          <li class="dim">No experience registered yet.</li>
        }
      </ul>
    } @else {
      <app-fetch-status [resource]="experiences" label="experience" />
    }
  `,
})
export class ExperienceSection {
  protected readonly experiences = inject(PortfolioApi).experiences;
  private readonly now = new Date();

  protected period(start: string, end: string | null): string {
    return formatPeriod(start, end, this.now);
  }
}

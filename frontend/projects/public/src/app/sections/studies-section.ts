import { Component, inject } from '@angular/core';
import { PortfolioApi } from '../data/portfolio-api';
import { FetchStatus } from './fetch-status';

@Component({
  selector: 'app-studies-section',
  imports: [FetchStatus],
  template: `
    <h2 class="section-title">Studies</h2>
    @if (studies.hasValue()) {
      <ul class="entries">
        @for (study of studies.value(); track study.id) {
          <li>
            <h3>{{ study.title }}</h3>
            <div class="entry-body">
              <p>{{ study.institution }}</p>
              <p class="dim">
                {{ study.startYear }} — {{ study.endYear ?? 'In progress' }} ·
                {{ study.modality === 'REMOTE' ? 'Remote' : 'Presential' }}
                @if (study.gradeAverage !== null) {
                  · GPA {{ study.gradeAverage }}
                }
              </p>
              @if (study.description) {
                <p>{{ study.description }}</p>
              }
            </div>
          </li>
        } @empty {
          <li class="dim">No studies registered yet.</li>
        }
      </ul>
    } @else {
      <app-fetch-status [resource]="studies" label="studies" />
    }
  `,
})
export class StudiesSection {
  protected readonly studies = inject(PortfolioApi).studies;
}

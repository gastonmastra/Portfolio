import { Component, inject } from '@angular/core';
import { formatMonthYear } from '@shared/dates';
import { PortfolioApi } from '../data/portfolio-api';
import { FetchStatus } from './fetch-status';

@Component({
  selector: 'app-projects-section',
  imports: [FetchStatus],
  template: `
    <h2 class="section-title">Projects</h2>
    @if (projects.hasValue()) {
      <ul class="entries">
        @for (project of projects.value(); track project.id) {
          <li>
            <h3>{{ project.name }}</h3>
            <div class="entry-body">
              @if (project.startDate) {
                <p class="dim">
                  {{ monthYear(project.startDate) }} —
                  {{ project.endDate ? monthYear(project.endDate) : 'Present' }}
                </p>
              }
              @if (project.description) {
                <p>{{ project.description }}</p>
              }
              @if (project.skills.length) {
                <p class="tags">
                  <span class="dim">stack:</span>
                  @for (skill of project.skills; track skill.id) {
                    {{ skill.name }}{{ $last ? '' : ' ·' }}
                  }
                </p>
              }
              @if (project.url || project.repoUrl) {
                <p>
                  @if (project.url) {
                    <a [href]="project.url" target="_blank" rel="noopener">
                      live<span class="visually-hidden"> site of {{ project.name }} (opens in a new tab)</span>
                    </a>
                  }
                  @if (project.url && project.repoUrl) {
                    <span class="dim"> | </span>
                  }
                  @if (project.repoUrl) {
                    <a [href]="project.repoUrl" target="_blank" rel="noopener">
                      source<span class="visually-hidden"> code of {{ project.name }} (opens in a new tab)</span>
                    </a>
                  }
                </p>
              }
            </div>
          </li>
        } @empty {
          <li class="dim">No projects published yet. Check back soon.</li>
        }
      </ul>
    } @else {
      <app-fetch-status [resource]="projects" label="projects" />
    }
  `,
})
export class ProjectsSection {
  protected readonly projects = inject(PortfolioApi).projects;
  protected readonly monthYear = formatMonthYear;
}

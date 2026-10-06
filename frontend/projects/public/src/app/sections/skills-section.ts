import { Component, computed, inject } from '@angular/core';
import type { Skill, SkillCategory } from '@shared/models';
import { PortfolioApi } from '../data/portfolio-api';
import { FetchStatus } from './fetch-status';

const GROUPS: { category: SkillCategory; title: string }[] = [
  { category: 'TECHNOLOGY', title: 'Technologies' },
  { category: 'TOOL', title: 'Tools' },
];

@Component({
  selector: 'app-skills-section',
  imports: [FetchStatus],
  template: `
    <h2 class="section-title">Skills</h2>
    @if (skills.hasValue()) {
      @for (group of groups(); track group.category) {
        <h3 class="group-title">{{ group.title }}</h3>
        <ul class="entries">
          @for (skill of group.items; track skill.id) {
            <li>
              <h4>{{ skill.name }}</h4>
              @if (skill.description) {
                <p class="entry-body">{{ skill.description }}</p>
              }
            </li>
          }
        </ul>
      } @empty {
        <p class="dim">No skills registered yet.</p>
      }
    } @else {
      <app-fetch-status [resource]="skills" label="skills" />
    }
  `,
  styles: `
    .group-title {
      margin-top: 1rem;
      font-size: 1rem;
      color: var(--prompt);
    }
    .group-title::before {
      content: '# ';
    }
  `,
})
export class SkillsSection {
  protected readonly skills = inject(PortfolioApi).skills;

  protected readonly groups = computed(() => {
    const skills: Skill[] = this.skills.hasValue() ? this.skills.value() : [];
    return GROUPS.map((group) => ({
      ...group,
      items: skills.filter((skill) => skill.category === group.category),
    })).filter((group) => group.items.length);
  });
}

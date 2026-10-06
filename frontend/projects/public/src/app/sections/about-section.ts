import { Component, inject } from '@angular/core';
import { PortfolioApi } from '../data/portfolio-api';
import { FetchStatus } from './fetch-status';

@Component({
  selector: 'app-about-section',
  imports: [FetchStatus],
  template: `
    <h2 class="section-title">About &amp; contact</h2>
    @if (profile.hasValue()) {
      @let me = profile.value();
      <div class="entry-body about">
        <p>
          <span class="accent">{{ me.firstName }} {{ me.lastName }}</span>
          @if (me.headline) {
            <span class="dim"> — {{ me.headline }}</span>
          }
        </p>
        @if (me.about) {
          <p class="about-text">{{ me.about }}</p>
        }
        <dl>
          @if (me.location) {
            <dt>location</dt>
            <dd>{{ me.location }}</dd>
          }
          @if (me.email) {
            <dt>email</dt>
            <dd><a [href]="'mailto:' + me.email">{{ me.email }}</a></dd>
          }
          @if (me.githubUrl) {
            <dt>github</dt>
            <dd><a [href]="me.githubUrl" target="_blank" rel="noopener">{{ me.githubUrl }}</a></dd>
          }
          @if (me.linkedinUrl) {
            <dt>linkedin</dt>
            <dd>
              <a [href]="me.linkedinUrl" target="_blank" rel="noopener">{{ me.linkedinUrl }}</a>
            </dd>
          }
        </dl>
      </div>
    } @else {
      <app-fetch-status [resource]="profile" label="profile" />
    }
  `,
  styles: `
    .about {
      margin-top: 0.75rem;
    }
    .about-text {
      white-space: pre-line;
    }
    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.15rem 2ch;
      margin: 0.5rem 0 0;
    }
    dt {
      color: var(--dim);
    }
    dt::after {
      content: ':';
    }
    dd {
      margin: 0;
      overflow-wrap: anywhere;
    }
  `,
})
export class AboutSection {
  protected readonly profile = inject(PortfolioApi).profile;
}

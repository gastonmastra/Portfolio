import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const NAV = [
  { path: '/profile', label: 'Profile' },
  { path: '/experiences', label: 'Experience' },
  { path: '/studies', label: 'Studies' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="shell">
      <header class="sidebar">
        <p class="brand">Portfolio <span>admin</span></p>
        <nav aria-label="Sections">
          <ul>
            @for (item of nav; track item.path) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  >{{ item.label }}</a
                >
              </li>
            }
          </ul>
        </nav>
      </header>
      <main id="main" class="content" tabindex="-1">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {
  protected readonly nav = NAV;
}

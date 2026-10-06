import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { Title } from '@angular/platform-browser';
import { PortfolioApi } from '../data/portfolio-api';
import { AboutSection } from '../sections/about-section';
import { ExperienceSection } from '../sections/experience-section';
import { ProjectsSection } from '../sections/projects-section';
import { SkillsSection } from '../sections/skills-section';
import { StudiesSection } from '../sections/studies-section';
import { Banner } from './banner';
import { MENU, OutputKind, parseCommand } from './commands';
import { HelpOutput } from './help-output';

interface LogEntry {
  id: number;
  input: string;
  output: OutputKind;
}

@Component({
  selector: 'app-console',
  imports: [
    FormField,
    Banner,
    HelpOutput,
    ExperienceSection,
    StudiesSection,
    ProjectsSection,
    SkillsSection,
    AboutSection,
  ],
  templateUrl: './console.html',
  styleUrl: './console.css',
})
export class Console {
  private readonly profile = inject(PortfolioApi).profile;
  private readonly injector = inject(Injector);
  private readonly commandInput = viewChild.required<ElementRef<HTMLInputElement>>('commandInput');
  private readonly log = viewChild.required<ElementRef<HTMLElement>>('log');

  protected readonly menu = MENU;
  protected readonly entries = signal<LogEntry[]>([]);
  protected readonly commandForm = form(signal({ command: '' }));

  protected readonly owner = computed(() =>
    this.profile.hasValue() ? this.profile.value() : null,
  );
  protected readonly fullName = computed(() => {
    const owner = this.owner();
    return owner ? `${owner.firstName} ${owner.lastName}` : '';
  });
  protected readonly promptUser = computed(
    () =>
      this.owner()
        ?.firstName.normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase() || 'portfolio',
  );

  private nextId = 0;
  private readonly history: string[] = [];
  private historyIndex = 0;

  constructor() {
    const title = inject(Title);
    effect(() => title.setTitle(this.fullName() ? `${this.fullName()} · Portfolio` : 'Portfolio'));
    afterNextRender(() => this.focusPrompt());
  }

  protected run(raw: string): void {
    const command = parseCommand(raw);
    if (raw.trim()) {
      this.history.push(raw.trim());
    }
    this.historyIndex = this.history.length;
    this.setCommand('');

    if (command.kind === 'clear') {
      this.entries.set([]);
    } else if (command.kind === 'output') {
      this.entries.update((entries) => [
        ...entries,
        { id: this.nextId++, input: raw.trim(), output: command.output },
      ]);
    }

    afterNextRender(() => this.revealLatest(), { injector: this.injector });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.run(this.commandForm.command().value());
  }

  protected browseHistory(event: Event, step: -1 | 1): void {
    if (!this.history.length) return;
    event.preventDefault();
    this.historyIndex = Math.min(this.history.length, Math.max(0, this.historyIndex + step));
    this.setCommand(this.history[this.historyIndex] ?? '');
  }

  private setCommand(command: string): void {
    this.commandForm.command().value.set(command);
    // Enter can be pressed before the typed text is rendered back into the input, in which case
    // the binding sees no change and would leave stale text behind, so the DOM is synced too.
    this.commandInput().nativeElement.value = command;
  }

  private revealLatest(): void {
    const latest = this.log().nativeElement.lastElementChild;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    latest?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
    this.focusPrompt();
  }

  private focusPrompt(): void {
    this.commandInput().nativeElement.focus({ preventScroll: true });
  }
}

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Console } from './console';

describe('Console', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  async function setup() {
    const fixture = TestBed.createComponent(Console);
    TestBed.tick();
    for (const url of ['api/experiences', 'api/projects', 'api/skills']) {
      http.expectOne(url).flush([]);
    }
    http.expectOne('api/profile').flush({
      firstName: 'Ada',
      lastName: 'Lovelace',
      headline: 'Engineer',
      about: '',
      email: null,
      location: null,
      githubUrl: null,
      linkedinUrl: null,
    });
    http.expectOne('api/studies').flush([
      {
        id: 1,
        title: 'Mathematics',
        institution: 'University',
        modality: 'REMOTE',
        gradeAverage: null,
        startYear: 2020,
        endYear: null,
        description: null,
        sortOrder: 0,
      },
    ]);
    await fixture.whenStable();
    return fixture;
  }

  async function run(fixture: Awaited<ReturnType<typeof setup>>, command: string) {
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector<HTMLInputElement>('#command')!;
    input.value = command;
    input.dispatchEvent(new Event('input'));
    element.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  }

  it('greets the visitor with the configured name', async () => {
    const fixture = await setup();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Ada Lovelace');
    expect(fixture.nativeElement.querySelector('.welcome').textContent).toContain('Engineer');
  });

  it('prints a section for an option number and clears the input', async () => {
    const fixture = await setup();
    await run(fixture, '2');
    const log: HTMLElement = fixture.nativeElement.querySelector('.log');
    expect(log.textContent).toContain('Mathematics');
    expect(fixture.nativeElement.querySelector('#command').value).toBe('');
  });

  it('reports unknown commands and supports clear', async () => {
    const fixture = await setup();
    await run(fixture, 'nope');
    expect(fixture.nativeElement.querySelector('.log').textContent).toContain('command not found');
    await run(fixture, 'clear');
    expect(fixture.nativeElement.querySelectorAll('.log > section').length).toBe(0);
  });
});

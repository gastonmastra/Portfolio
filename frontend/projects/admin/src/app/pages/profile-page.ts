import { AriaInvalid } from '../shared/aria-invalid';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormField, email, form, maxLength, required, submit } from '@angular/forms/signals';
import type { Profile } from '@shared/models';
import { AdminApi, errorMessage } from '../data/admin-api';
import { FieldErrors } from '../shared/field-errors';
import { FormActions } from '../shared/form-actions';
import { optionalUrl } from '../shared/validators';

type ProfileModel = { [K in keyof Profile]: string };

const EMPTY: ProfileModel = {
  firstName: '',
  lastName: '',
  headline: '',
  about: '',
  email: '',
  location: '',
  githubUrl: '',
  linkedinUrl: '',
};

@Component({
  selector: 'app-profile-page',
  imports: [FormField, AriaInvalid, FieldErrors, FormActions],
  template: `
    <h1>Profile</h1>
    <p class="muted">Your first and last name build the ASCII logo of the public console.</p>
    @if (loadError(); as error) {
      <p class="alert error" role="alert">{{ error }}</p>
    }
    @if (saved()) {
      <p class="alert success" role="status">Profile saved.</p>
    }

    <form class="form" novalidate (submit)="$event.preventDefault(); save()">
      <div class="row">
        <div class="field">
          <label for="firstName">First name</label>
          <input id="firstName" [formField]="f.firstName" autocomplete="given-name" aria-describedby="firstName-errors" />
          <app-field-errors id="firstName-errors" [field]="f.firstName" />
        </div>
        <div class="field">
          <label for="lastName">Last name</label>
          <input id="lastName" [formField]="f.lastName" autocomplete="family-name" aria-describedby="lastName-errors" />
          <app-field-errors id="lastName-errors" [field]="f.lastName" />
        </div>
      </div>

      <div class="field">
        <label for="headline">Headline</label>
        <input id="headline" [formField]="f.headline" aria-describedby="headline-errors" />
        <app-field-errors id="headline-errors" [field]="f.headline" />
      </div>

      <div class="field">
        <label for="about">About me</label>
        <textarea id="about" rows="6" [formField]="f.about" aria-describedby="about-errors"></textarea>
        <app-field-errors id="about-errors" [field]="f.about" />
      </div>

      <div class="row">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" [formField]="f.email" autocomplete="email" aria-describedby="email-errors" />
          <app-field-errors id="email-errors" [field]="f.email" />
        </div>
        <div class="field">
          <label for="location">Location</label>
          <input id="location" [formField]="f.location" aria-describedby="location-errors" />
          <app-field-errors id="location-errors" [field]="f.location" />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label for="githubUrl">GitHub URL</label>
          <input id="githubUrl" type="url" [formField]="f.githubUrl" aria-describedby="githubUrl-errors" />
          <app-field-errors id="githubUrl-errors" [field]="f.githubUrl" />
        </div>
        <div class="field">
          <label for="linkedinUrl">LinkedIn URL</label>
          <input id="linkedinUrl" type="url" [formField]="f.linkedinUrl" aria-describedby="linkedinUrl-errors" />
          <app-field-errors id="linkedinUrl-errors" [field]="f.linkedinUrl" />
        </div>
      </div>

      <app-form-actions [form]="f" [cancelLink]="null" />
    </form>
  `,
})
export class ProfilePage implements OnInit {
  private readonly api = inject(AdminApi);

  protected readonly loadError = signal<string | null>(null);
  protected readonly saved = signal(false);
  private readonly model = signal<ProfileModel>(EMPTY);
  protected readonly f = form(this.model, (path) => {
    required(path.firstName, { message: 'First name is required' });
    maxLength(path.firstName, 60, { message: 'Use at most 60 characters' });
    required(path.lastName, { message: 'Last name is required' });
    maxLength(path.lastName, 60, { message: 'Use at most 60 characters' });
    maxLength(path.headline, 160, { message: 'Use at most 160 characters' });
    maxLength(path.about, 4000, { message: 'Use at most 4000 characters' });
    email(path.email, { message: 'Enter a valid email address' });
    maxLength(path.location, 120, { message: 'Use at most 120 characters' });
    optionalUrl(path.githubUrl);
    optionalUrl(path.linkedinUrl);
  });

  async ngOnInit(): Promise<void> {
    try {
      const profile = await this.api.getProfile();
      if (profile) this.model.set(toModel(profile));
    } catch (error) {
      this.loadError.set(errorMessage(error));
    }
  }

  protected async save(): Promise<void> {
    this.saved.set(false);
    await submit(this.f, async () => {
      try {
        this.model.set(toModel(await this.api.saveProfile(this.model())));
        this.saved.set(true);
        return null;
      } catch (error) {
        return { kind: 'server', message: errorMessage(error) };
      }
    });
  }
}

function toModel(profile: Profile): ProfileModel {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    headline: profile.headline,
    about: profile.about,
    email: profile.email ?? '',
    location: profile.location ?? '',
    githubUrl: profile.githubUrl ?? '',
    linkedinUrl: profile.linkedinUrl ?? '',
  };
}

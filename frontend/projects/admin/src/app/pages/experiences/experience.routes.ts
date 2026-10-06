import { Routes } from '@angular/router';
import { ExperienceForm } from './experience-form';
import { ExperienceList } from './experience-list';

export default [
  { path: '', component: ExperienceList },
  { path: 'new', component: ExperienceForm },
  { path: ':id', component: ExperienceForm },
] satisfies Routes;

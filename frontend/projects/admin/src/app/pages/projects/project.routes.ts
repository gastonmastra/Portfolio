import { Routes } from '@angular/router';
import { ProjectForm } from './project-form';
import { ProjectList } from './project-list';

export default [
  { path: '', component: ProjectList },
  { path: 'new', component: ProjectForm },
  { path: ':id', component: ProjectForm },
] satisfies Routes;

import { Routes } from '@angular/router';
import { StudyForm } from './study-form';
import { StudyList } from './study-list';

export default [
  { path: '', component: StudyList },
  { path: 'new', component: StudyForm },
  { path: ':id', component: StudyForm },
] satisfies Routes;

import { Routes } from '@angular/router';
import { SkillForm } from './skill-form';
import { SkillList } from './skill-list';

export default [
  { path: '', component: SkillList },
  { path: 'new', component: SkillForm },
  { path: ':id', component: SkillForm },
] satisfies Routes;

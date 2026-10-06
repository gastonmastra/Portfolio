import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  {
    path: 'profile',
    title: 'Profile · Admin',
    loadComponent: () => import('./pages/profile-page').then((m) => m.ProfilePage),
  },
  {
    path: 'skills',
    title: 'Skills · Admin',
    loadChildren: () => import('./pages/skills/skill.routes'),
  },
  {
    path: 'experiences',
    title: 'Experience · Admin',
    loadChildren: () => import('./pages/experiences/experience.routes'),
  },
  {
    path: 'studies',
    title: 'Studies · Admin',
    loadChildren: () => import('./pages/studies/study.routes'),
  },
  {
    path: 'projects',
    title: 'Projects · Admin',
    loadChildren: () => import('./pages/projects/project.routes'),
  },
  { path: '**', redirectTo: 'profile' },
];

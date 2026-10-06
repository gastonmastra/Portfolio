import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./console/console').then((m) => m.Console) },
  { path: '**', redirectTo: '' },
];

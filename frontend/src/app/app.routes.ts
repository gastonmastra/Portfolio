import { Routes } from '@angular/router';
import { ExperienceComponent } from './pages/experience/experience.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StudiesComponent } from './pages/studies/studies.component';
import { KnowledgeComponent } from './pages/knowledge/knowledge.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'experience',
        component: ExperienceComponent
    },
    {
        path: 'studies',
        component: StudiesComponent
    },
    {
        path: 'knowledge',
        component: KnowledgeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

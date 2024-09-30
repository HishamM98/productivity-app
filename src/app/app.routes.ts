import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { ProjectComponent } from './features/projects/pages/project/project.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'projects', component: ProjectComponent },
    // Add other routes as needed
];
// loadComponent: () => import("./features/projects/pages/project/project.component").then(m => m.ProjectComponent);
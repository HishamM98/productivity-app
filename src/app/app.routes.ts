import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { ProjectComponent } from './features/projects/pages/project/project.component';
import { TasksComponent } from './features/tasks/pages/tasks/tasks.component';
import { EventsComponent } from './features/events/pages/events/events.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'projects', loadComponent: () => import("./features/projects/pages/project/project.component").then(m => m.ProjectComponent) },
    { path: 'tasks', loadComponent: () => import("./features/tasks/pages/tasks/tasks.component").then(m => m.TasksComponent) },
    { path: 'events', loadComponent: () => import("./features/events/pages/events/events.component").then(m => m.EventsComponent) },
    { path: '**', redirectTo: '/dashboard' }
    // Add other routes as needed
];
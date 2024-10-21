import { AuthComponent } from './core/pages/auth/auth.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/pages/auth/components/login/login.component';


export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], title: "Dashboard" },
            { path: 'projects', loadComponent: () => import("./features/projects/pages/project/project.component").then(c => c.ProjectComponent), title: "Projects" },
            { path: 'tasks', loadComponent: () => import("./features/tasks/pages/tasks/tasks.component").then(c => c.TasksComponent), title: "Tasks" },
            { path: 'events', loadComponent: () => import("./features/events/pages/events/events.component").then(c => c.EventsComponent), title: "Events" },
        ]
    },
    {
        path: 'auth', component: AuthComponent, children: [
            { path: '', component: LoginComponent },
            { path: 'login', loadComponent: () => import("./core/pages/auth/components/login/login.component").then(c => c.LoginComponent), title: "Login" },
            { path: 'register', loadComponent: () => import("./core/pages/auth/components/register/register.component").then(c => c.RegisterComponent), title: "Sign Up" }
        ]
    },
    { path: '**', component: NotFoundComponent, title: "Page Not Found" }
    // Add other routes as needed
];
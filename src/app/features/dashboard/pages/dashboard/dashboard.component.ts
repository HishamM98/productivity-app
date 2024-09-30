import { map, Subscription } from 'rxjs';
import { DashboardService } from './../../services/dashboard.service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DashboardData } from '../../../../shared/models/dashboard-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashService = inject(DashboardService);
  private subscriptions: Subscription[] = [];
  dashboardSig = signal<DashboardData | null>(null);

  ngOnInit(): void {
    this.subscriptions.push(this.dashService.getDashboardData(1).pipe(
      map(dashboardData => {
        console.log(dashboardData);
        return {
          projectCount: dashboardData.userProjectsCount,
          taskCount: dashboardData.userTasksCount,
          projectsDeadlineCount: dashboardData.userProjectsDeadlineCount,
          tasksDeadlineCount: dashboardData.userTasksDeadlineCount,
          pendingProjects: dashboardData.userProjectsStatusCount.find(obj => obj.status === "Not Started")?.count || 0,
          startedProjects: dashboardData.userProjectsStatusCount.find(obj => obj.status === "In Progress")?.count || 0,
          completedProjects: dashboardData.userProjectsStatusCount.find(obj => obj.status === "Completed")?.count || 0,
          pendingTasks: dashboardData.userTasksStatusCount.find(obj => obj.status === "To Do")?.count || 0,
          startedTasks: dashboardData.userTasksStatusCount.find(obj => obj.status === "In Progress")?.count || 0,
          completedTasks: dashboardData.userTasksStatusCount.find(obj => obj.status === "Done")?.count || 0,
        };
      })
    ).subscribe({
      next: (res) => {
        console.log(res);

        this.dashboardSig.set(res);
      },
      error: (err) => {
        console.error(err.message);
      },
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

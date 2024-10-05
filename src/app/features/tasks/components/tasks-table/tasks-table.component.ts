import { Component, computed, inject, Signal, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../../../shared/models/task';
import { TaskService } from '../../services/task.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../projects/services/project.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatChipsModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent {
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  tasks: Task[] = [];

  priorityFilter = signal<string[] | null>(null);
  statusFilter = signal<string[] | null>(null);

  filteredTasks = signal<Task[] | null>(null);

  displayedColumns: string[] = ["title", "description", "project_name", "status", "priority", "due_date", "actions"];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    // Assign the data to the data source for the table to render
    this.taskService.getTasks(1).pipe(
      map((tasks) => {
        tasks.forEach((task) => {
          task.project_name = this.projectService.projects().find(el => el.id === task.project_id)?.name;
        });
        return tasks;
      })
    ).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks.set(tasks);
        this.dataSource = new MatTableDataSource(this.filteredTasks()!);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => console.error(err.message)
    });
  }

  filterPriority(priority: string) {
    this.priorityFilter.update(priorities => {
      if (!priorities) return [priority];
      if (priorities.includes(priority)) {
        return priorities.filter(el => el !== priority);
      }
      return [...priorities, priority];
    });
    console.log("Updated priority filters:", this.priorityFilter());
    this.filterTasks();
  }

  filterStatus(status: string) {
    this.statusFilter.update(statuses => {
      if (!statuses) return [status];
      if (statuses.includes(status)) {
        return statuses.filter(el => el !== status);
      }
      return [...statuses, status];
    });
    console.log("Updated status filters:", this.statusFilter());
    this.filterTasks();
  }

  private filterTasks() {
    const priorityFilters = this.priorityFilter();
    const statusFilters = this.statusFilter();

    let filteredTasks = this.tasks;

    if (priorityFilters && priorityFilters.length) {
      console.log("filtering priority");
      filteredTasks = filteredTasks?.filter(task => priorityFilters.includes(task.priority)) || filteredTasks;
    }

    if (statusFilters && statusFilters.length) {
      console.log("filtering status");
      filteredTasks = filteredTasks?.filter(task => statusFilters.includes(task.status)) || filteredTasks;
    }

    console.log(filteredTasks);
    this.filteredTasks.set(filteredTasks);
    this.dataSource.data = this.filteredTasks()!;
  }

  resetFilters(type: string) {
    if (type === 'status') this.statusFilter.set(null);
    if (type === 'priority') this.priorityFilter.set(null);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeTaskStatus(id: number, status: string) {
    this.taskService.updateTaskStatus(status, id).pipe(
      take(1)
    ).subscribe({
      next: (res: string) => console.log(res),
      error: (err: Error) => console.error(err.message)
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).pipe(
      take(1)
    ).subscribe({
      next: (res: string) => console.log(res),
      error: (err: Error) => console.error(err.message)
    });
  }
}


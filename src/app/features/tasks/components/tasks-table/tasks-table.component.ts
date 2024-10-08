import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
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
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatChipsModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements AfterViewInit {
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private dialog = inject(MatDialog);
  tasks = this.taskService.tasks;

  priorityFilter = signal<string[] | null>(null);
  statusFilter = signal<string[] | null>(null);

  filteredTasks = signal<Task[] | null>(null);

  displayedColumns: string[] = ["title", "description", "project_name", "status", "priority", "due_date", "actions"];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    this.filteredTasks.set(this.tasks());
    this.dataSource = new MatTableDataSource(this.filteredTasks()!);
    effect(() => {
      this.tasks().forEach(task => {
        task.project_name = this.projectService.projects().find(project => project.id === task.project_id)?.name;
      });

      this.dataSource.data = this.tasks();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterPriority(priority: string) {
    this.priorityFilter.update(priorities => {
      if (!priorities) return [priority];
      if (priorities.includes(priority)) {
        return priorities.filter(el => el !== priority);
      }
      return [...priorities, priority];
    });
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
    this.filterTasks();
  }

  private filterTasks() {
    const priorityFilters = this.priorityFilter();
    const statusFilters = this.statusFilter();

    let filteredTasks = this.tasks();

    if (priorityFilters && priorityFilters.length) {
      filteredTasks = filteredTasks?.filter(task => priorityFilters.includes(task.priority)) || filteredTasks;
    }

    if (statusFilters && statusFilters.length) {
      filteredTasks = filteredTasks?.filter(task => statusFilters.includes(task.status)) || filteredTasks;
    }

    this.filteredTasks.set(filteredTasks);
    this.dataSource.data = this.filteredTasks()!;
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

  editTaskModal(task: Task): void {
    this.dialog.open(AddTaskComponent, {
      disableClose: false,
      hasBackdrop: true,
      enterAnimationDuration: 200,
      data: {
        task
      },
    });
  }
}


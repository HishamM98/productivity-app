import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { environment as env } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private tasks = signal<Task[] | null>(null);
  tasksSig = computed(() => this.tasks);

  constructor() {
    this.getTasks(1).pipe(
      takeUntilDestroyed()
    ).subscribe((tasks) => {
      console.log(tasks);
    });
  }

  getTasks(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${env.serverUrl}/tasks/user-tasks/${userId}`).pipe(
      tap((tasks) => this.tasks.set(tasks))
    );
  }

  deleteTask(taskId: number): Observable<string> {
    return this.http.delete<string>(`${env.serverUrl}/tasks/delete-task/${taskId}`).pipe(
      tap(() => {
        this.tasks.update((tasks) => tasks!.filter(el => el.id !== taskId));
      })
    );
  }

  addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${env.serverUrl}/tasks/create-task`, task).pipe(
      tap((newTask) => {
        this.tasks.update((tasks) => {
          if (!tasks) {
            return [newTask];
          }
          return [...tasks, newTask];
        });
      })
    );
  }

  updateTask(updatedTask: Task): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/tasks/update-task/${updatedTask.id}`, updatedTask).pipe(
      tap(() => {
        this.tasks.update((tasks) => {
          if (!tasks) {
            return [updatedTask];
          }
          return tasks.map((task) => task.id === updatedTask.id ? updatedTask : task);
        });
      })
    );
  }

  updateTaskStatus(status: string, id: number): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/tasks/update-task/${id}`, { status }).pipe(
      tap(() => {
        this.tasks.update((tasks) => {
          return tasks?.map((task) => task.id === id ? { ...task, status } : task) || tasks;
        });
      })
    );
  }
}

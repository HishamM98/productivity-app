import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment as env } from '../../../../environments/environment.development';
import { ProjectService } from '../../projects/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private projectService = inject(ProjectService);
  private projects = this.projectService.projects();
  //TODO: fix userid
  private tasks$ = this.http.get<Task[]>(`${env.serverUrl}/tasks/user-tasks/1`).pipe(
    catchError(this.handleError)
  );
  private tasksImm = toSignal(this.tasks$, { initialValue: [] });
  private tasksWrittable = computed(() => signal(this.tasksImm()));
  tasks = computed(() => this.tasksWrittable()());

  constructor() { }

  deleteTask(taskId: number): Observable<string> {
    return this.http.delete<string>(`${env.serverUrl}/tasks/delete-task/${taskId}`).pipe(
      tap(() => {
        this.tasksWrittable().update(tasks => tasks.filter(t => t.id !== taskId));
      }),
      catchError(this.handleError)
    );
  }

  addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${env.serverUrl}/tasks/create-task`, task).pipe(
      tap(newTask => this.tasksWrittable().update(tasks => [...tasks, newTask])),
      catchError(this.handleError)
    );
  }

  updateTask(updatedTask: Task): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/tasks/update-task/${updatedTask.id}`, updatedTask).pipe(
      tap(() => {
        this.tasksWrittable().update(tasks => tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      }),
      catchError(this.handleError)
    );
  }

  updateTaskStatus(status: string, id: number): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/tasks/update-task/${id}`, { status }).pipe(
      tap(() => {
        this.tasksWrittable().update(tasks => tasks.map(t => t.id === id ? { ...t, status } : t));
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
        }`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}

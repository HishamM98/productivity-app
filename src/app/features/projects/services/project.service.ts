import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../../../environments/environment.development';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Project } from '../../../shared/models/project';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);

  private projects$ = this.http.get<Project[]>(`${env.serverUrl}/projects`).pipe(
    catchError(this.handleError)
  );
  private projectsImm = toSignal(this.projects$, { initialValue: [] });
  private projectsWrittable = computed(() => signal(this.projectsImm()));
  projects = computed(() => this.projectsWrittable()());

  constructor() { }

  deleteProject(projectId: number): Observable<string> {
    return this.http.delete<string>(`${env.serverUrl}/projects/delete-project?projectId=${projectId}`).pipe(
      tap(() => {
        this.projectsWrittable().update(projects => projects.filter(p => p.id !== projectId));
      }),
      catchError(this.handleError)
    );
  }

  addNewProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${env.serverUrl}/projects/create-project`, project).pipe(
      tap((newProject: Project) => this.projectsWrittable().update(projects => [...projects, newProject])),
      catchError(this.handleError)
    );
  }

  updateProject(updatedProject: Project): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/projects/update-project?projectId=${updatedProject.id}`, updatedProject).pipe(
      tap(() => {
        this.projectsWrittable().update(projects => projects.map(p => p.id === updatedProject.id ? updatedProject : p));
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
      errorMessage = `Code: ${err.status}, ${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}

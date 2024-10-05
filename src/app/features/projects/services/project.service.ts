import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from '../../../shared/models/project';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);

  //TODO: fix userId
  private projects$ = this.http.get<Project[]>(`${env.serverUrl}/projects?userId=1`).pipe(
    catchError(this.handleError)
  );
  projects = toSignal(this.projects$, { initialValue: [] });

  constructor() { }

  deleteProject(projectId: number): Observable<string> {
    return this.http.delete<string>(`${env.serverUrl}/projects/delete-project/${projectId}`);
  }

  addNewProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${env.serverUrl}/projects/create-project`, project);
  }

  updateProject(updatedProject: Project): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/projects/update-project/${updatedProject.id}`, updatedProject);
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

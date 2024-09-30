import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment as env } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Project } from '../../../shared/models/project';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private projects = signal<Array<Project> | null>(null);
  projectSig = computed(() => this.projects);

  constructor() {
    this.getProjects(1).pipe(
      takeUntilDestroyed()
    ).subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  getProjects(userId: number): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(`${env.serverUrl}/projects?userId=${userId}`);
  }

  deleteProject(projectId: number): Observable<string> {
    return this.http.delete<string>(`${env.serverUrl}/projects/delete-project/${projectId}`).pipe(
      tap(() => {
        this.projects.update((projects) => projects!.filter(el => el.id !== projectId));
      })
    );
  }

  addNewProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${env.serverUrl}/projects/create-project`, project).pipe(
      tap((newProject) => {
        this.projects.update((projects) => {
          if (!projects) {
            return [newProject];
          }
          return [...projects, newProject];
        });
      })
    );
  }

  updateProject(updatedProject: Project): Observable<string> {
    return this.http.put<string>(`${env.serverUrl}/projects/update-project/${updatedProject.id}`, updatedProject).pipe(
      tap(() => {
        this.projects.update((projects) => {
          if (!projects) {
            return [updatedProject];
          }
          return projects.map((project) => project.id === updatedProject.id ? updatedProject : project);
        });
      })
    );
  }

  // getProject(projectId: number, userId: number): Observable<Array<Project>> {
  // return this.http.get<Array<Project>>(`${env.serverUrl}/projects/${projectId}?${userId}`);
  // }
}

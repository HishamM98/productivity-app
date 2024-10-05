import { ProjectService } from './../../services/project.service';
import { Component, Input, inject } from '@angular/core';
import { Project } from '../../../../shared/models/project';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  private projectService = inject(ProjectService);
  private dialog = inject(MatDialog);

  getStatusColor(status: string): string {
    switch (status) {
      case "Completed":
        return 'green';
      case 'Not Started':
        return 'red';
      default:
        return 'yellow';
    }
  }

  editProjectModal(): void {
    this.dialog.open(AddProjectComponent, {
      disableClose: false,
      hasBackdrop: true,
      enterAnimationDuration: 200,
      minWidth: 500,
      data: {
        project: this.project
      },
    });
  }

  removeProject(projectId: number): void {
    this.projectService.deleteProject(projectId).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err.message);
      }
    });
  }
}

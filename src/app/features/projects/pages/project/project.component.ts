import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from "../../components/project-card/project-card.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  private project$ = inject(ProjectService);
  projectsSignal = this.project$.projectSig();


}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../services/project.service';
import { take } from 'rxjs';
import { dateRangeValidator } from '../../../../core/validators/date.validator';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private dialogRef = inject(MatDialogRef<AddProjectComponent>);
  currentStartDate: string;
  currentEndDate: string;

  projectForm!: FormGroup;
  data = inject(MAT_DIALOG_DATA);

  constructor() {
    const currentDate = new Date();
    this.currentStartDate = currentDate.toISOString().slice(0, 10);
    this.currentEndDate = new Date(currentDate.getTime() + 86400000).toISOString().slice(0, 10);

    this.initForm();
    if (this.data?.project) {
      this.projectForm.setValue({
        name: this.data.project.name,
        description: this.data.project.description,
        status: this.data.project.status,
        startDate: this.data.project.start_date,
        endDate: this.data.project.end_date,
      });
    }

  }

  initForm() {
    const options: AbstractControlOptions = {
      validators: [dateRangeValidator]
    };

    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      status: ['Not Started', [Validators.required]],
      startDate: [this.currentStartDate, [Validators.required]],
      endDate: [this.currentEndDate, [Validators.required]]
    }, options);
  }

  resetForm() {
    this.projectForm.reset({
      name: '',
      description: '',
      status: 'Not Started',
      startDate: this.currentStartDate,
      endDate: this.currentEndDate
    });
  }

  submitForm() {
    let form = this.projectForm.value;
    const project: Project = {
      name: form.name,
      description: form.description,
      status: form.status,
      start_date: form.startDate,
      end_date: form.endDate
    };

    if (this.data?.project) {
      this.editProject(project);
    }
    else {
      this.addNewProject(project);
    }
  }

  addNewProject(project: Project) {
    this.projectService.addNewProject(project).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.projectForm.reset();
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  editProject(project: Project) {
    project.id = this.data.project.id;
    this.projectService.updateProject(project).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }
}
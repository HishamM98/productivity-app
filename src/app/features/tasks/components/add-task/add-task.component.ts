import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../../shared/models/task';
import { take } from 'rxjs';
import { ProjectService } from '../../../projects/services/project.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  projects = this.projectService.projects;
  private dialogRef = inject(MatDialogRef<AddTaskComponent>);
  dueDateMin: string;

  taskForm!: FormGroup;
  data = inject(MAT_DIALOG_DATA);

  constructor() {
    const currentDate = new Date();
    this.dueDateMin = new Date(currentDate.getTime() + 86400000).toISOString().slice(0, 10);

    this.initForm();
    if (this.data?.task) {
      this.taskForm.setValue({
        title: this.data.task.title,
        description: this.data.task.description,
        projectID: this.data.task.project_id,
        status: this.data.task.status,
        priority: this.data.task.priority,
        dueDate: this.data.task.due_date,
      });
    }
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      projectID: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      dueDate: [this.dueDateMin, [Validators.required]],
    });
  }

  resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      projectID: '',
      status: '',
      priority: '',
      dueDate: this.dueDateMin
    });
  }

  submitForm() {
    let form = this.taskForm.value;
    const task: Task = {
      title: form.title,
      description: form.description,
      project_id: form.projectID,
      status: form.status,
      priority: form.priority,
      due_date: form.dueDate,
    };

    if (this.data?.task) {
      this.editTask(task);
    }
    else {
      this.addNewTask(task);
    }
  }

  addNewTask(task: Task) {
    this.taskService.addNewTask(task).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.taskForm.reset();
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  editTask(task: Task) {
    task.id = this.data.task.id;
    this.taskService.updateTask(task).pipe(
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

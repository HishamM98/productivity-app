import { Component, inject } from '@angular/core';
import { TasksTableComponent } from "../../components/tasks-table/tasks-table.component";
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../../components/add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TasksTableComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddTaskComponent, {
      disableClose: false,
      hasBackdrop: true,
      enterAnimationDuration: 200,
      minWidth: 500,
    });
  }
}

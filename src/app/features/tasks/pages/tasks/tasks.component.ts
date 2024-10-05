import { Component } from '@angular/core';
import { TasksTableComponent } from "../../components/tasks-table/tasks-table.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TasksTableComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

}

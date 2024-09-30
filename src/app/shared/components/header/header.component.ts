import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../../../features/projects/components/add-project/add-project.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  @Output() toggleSidebar = new EventEmitter<void>();
  private dialog = inject(MatDialog);
  darkMode$ = this.themeService.darkMode$;

  constructor() { }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  openDialog() {
    this.dialog.open(AddProjectComponent, {
      disableClose: false,
      hasBackdrop: true,
      enterAnimationDuration: 200,
      minWidth: 500,
    });
  }
}

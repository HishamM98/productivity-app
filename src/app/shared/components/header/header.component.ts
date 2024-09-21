import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';

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
  darkMode$ = this.themeService.darkMode$;

  constructor() { }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}

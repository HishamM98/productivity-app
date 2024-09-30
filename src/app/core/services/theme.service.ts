import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(true);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    this.setInitialTheme();
  }

  private setInitialTheme() {
    document.documentElement.classList.add('dark');
  }

  toggleDarkMode() {
    this.darkMode.next(!this.darkMode.value);
    document.documentElement.classList.toggle('dark');
  }
}

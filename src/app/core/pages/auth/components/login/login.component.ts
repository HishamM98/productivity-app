import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  error = "";
  passwordType: string = "password";

  login(loginForm: NgForm) {
    this.auth.login(loginForm.value.username, loginForm.value.password).subscribe({
      next: res => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        console.error(err);
        this.error = (err);
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../../../../validators/password.validator';
import { User } from '../../../../../shared/models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  error = "";
  passwordType: string = "password";
  private fb = inject(FormBuilder);
  registerForm!: FormGroup;

  constructor() {
    //TODO: fix validators
    const options: AbstractControlOptions = {
      validators: [passwordValidator]
    };

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9_-]{3,50}$/)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z][A-Za-z\s'-]{3,50}$/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z][A-Za-z\s'-]{3,50}$/)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email, Validators.pattern(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/)]],
    }, options);
  }

  register() {
    const { value } = this.registerForm;

    const user: User = {
      username: value.username,
      email: value.email,
      password: value.password,
      first_name: value.firstName,
      last_name: value.lastName
    };

    this.auth.register(user).subscribe({
      next: (res) => {
        console.log(res);
        this.registerForm.reset();
        this.router.navigate(['auth', 'login']);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}

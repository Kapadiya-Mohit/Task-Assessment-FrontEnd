import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/module/material/material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initUserForm();
  }

  /**
   *
   *Initialization of user form
   * @memberof LoginComponent
   */
  initUserForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   *
   *Save user form
   * @memberof LoginComponent
   */
  save(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
  }

  /**
   * Return true if any error occur, otherwise false
   * @param {string} control
   * @param {string} errorName
   * @memberof LoginComponent
   */
  hasError(control: string, errorName: string) {
    return this.loginForm.get(control)?.hasError(errorName);
  }
}

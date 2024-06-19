import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/module/material/material.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initUserForm();
  }

  /**
   *
   *Initialization of user form
   * @memberof SignupComponent
   */
  initUserForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   *
   *Save user form
   * @memberof SignupComponent
   */
  save(): void {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) return;
  }

  /**
   * Return true if any error occur, otherwise false
   * @param {string} control
   * @param {string} errorName
   * @memberof SignupComponent
   */
  hasError(control: string, errorName: string) {
    return this.signupForm.get(control)?.hasError(errorName);
  }
}

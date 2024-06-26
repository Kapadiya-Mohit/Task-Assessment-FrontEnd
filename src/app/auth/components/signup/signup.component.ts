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
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  fieldTextType = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  /**
   *
   * Hide and show password visibility
   * @memberof SignupComponent
   */
  toggleFieldType(): void {
    this.showPassword = !this.showPassword;
    this.fieldTextType = this.showPassword ? 'text' : 'password';
  }

  /**
   *
   *Initialization of signup form
   * @memberof SignupComponent
   */
  initSignupForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }

  /**
   *
   *Save signup form
   * @memberof SignupComponent
   */
  save(): void {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) return;
    this.authService.signUp(this.signupForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('User register successfully', 'Success', {
            timeOut: 2000,
          });
          this.router.navigate(['/']);
        }
      },
      error: (err) => this.toast.error(err.error.message),
    });
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

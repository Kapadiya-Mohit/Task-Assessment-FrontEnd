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
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

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
   *Save user form
   * @memberof LoginComponent
   */
  save(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('User Login successfully', 'Success', {
            timeOut: 2000,
          });
          this.authService.setJWTToken(res.token);
          this.authService.$isLogginUser.next(true);
          this.router.navigate(['/user']);
        }
      },
      error: (err) => this.toast.error(err.error.message),
    });
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

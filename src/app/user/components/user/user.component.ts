import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

/** Material dependencies */
import { MaterialModule } from '../../../shared/module/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserComponent>,
    private userService: UserService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) private userId: string
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    if (this.userId) {
      this.getUserById();
    }
  }

  /**
   *
   *Initialization of user form
   * @memberof UpdateUserComponent
   */
  initUserForm(): void {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  /**
   *
   * Get user by id
   * @memberof UserComponent
   */
  getUserById(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        if (user) {
          this.userForm.patchValue({
            title: user.title,
            description: user.description,
            status: user.status,
          });
        }
      },
      error: (err) => console.log(err),
    });
  }

  /**
   *
   *Save or Update user based on id
   * @memberof UpdateUserComponent
   */
  saveOrUpdateUser(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
    if (this.userId) {
      this.update();
    } else {
      this.save();
    }
  }

  /**
   *
   * Save user
   * @memberof UserComponent
   */
  save(): void {
    this.userService.saveUser(this.userForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('User save successfully', 'Success', {
            timeOut: 2000,
          });
          this.dialogRef.close(res);
        }
      },
      error: (err) => this.toast.error(err),
    });
  }

  /**
   *
   * Update user
   * @memberof UserComponent
   */
  update(): void {
    this.userService.updateUser(this.userForm.value, this.userId).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('User updated successfully', 'Success', {
            timeOut: 2000,
          });
          this.dialogRef.close(res);
        }
      },
      error: (err) => this.toast.error(err),
    });
  }

  /**
   *
   * Cancle add user and close dialog
   * @memberof UserComponent
   */
  cancelAddUser(): void {
    this.dialogRef.close();
  }

  /**
   * Return true if any error occur, otherwise false
   * @param {string} control
   * @param {string} errorName
   * @memberof UpdateUserComponent
   */
  hasError(control: string, errorName: string) {
    return this.userForm.get(control)?.hasError(errorName);
  }
}

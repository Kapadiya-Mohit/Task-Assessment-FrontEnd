import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserComponent>
  ) {}

  ngOnInit(): void {
    this.initUserForm();
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
   *Save user form
   * @memberof UpdateUserComponent
   */
  saveUser(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
  }

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

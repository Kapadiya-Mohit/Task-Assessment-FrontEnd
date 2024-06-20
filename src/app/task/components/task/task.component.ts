import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../shared/services/task.service';

/** Material dependencies */
import { MaterialModule } from '../../../shared/module/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskComponent>,
    private taskService: TaskService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) private taskId: string
  ) {}

  ngOnInit(): void {
    this.inittaskForm();
    if (this.taskId) {
      this.getTaskById();
    }
  }

  /**
   *
   *Initialization of task form
   * @memberof TaskComponent
   */
  inittaskForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  /**
   *
   * Get task by id
   * @memberof TaskComponent
   */
  getTaskById(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        if (task) {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
          });
        }
      },
      error: (err) => console.log(err),
    });
  }

  /**
   *
   *Save or Update task based on id
   * @memberof TaskComponent
   */
  saveOrUpdateTask(): void {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.invalid) return;
    if (this.taskId) {
      this.update();
    } else {
      this.save();
    }
  }

  /**
   *
   * Save task
   * @memberof TaskComponent
   */
  save(): void {
    this.taskService.saveTask(this.taskForm.value).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('Task added successfully', 'Success', {
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
   * Update task
   * @memberof TaskComponent
   */
  update(): void {
    this.taskService.updateTask(this.taskForm.value, this.taskId).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('Task updated successfully', 'Success', {
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
   * Cancle add task and close dialog
   * @memberof TaskComponent
   */
  cancelAddTask(): void {
    this.dialogRef.close();
  }

  /**
   * Return true if any error occur, otherwise false
   * @param {string} control
   * @param {string} errorName
   * @memberof TaskComponent
   */
  hasError(control: string, errorName: string) {
    return this.taskForm.get(control)?.hasError(errorName);
  }
}

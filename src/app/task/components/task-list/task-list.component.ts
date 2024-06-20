import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

/** Material dependencies */
import { MaterialModule } from '../../../shared/module/material/material.module';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../../shared/services/task.service';
import { Task } from '../../../shared/modal/task.modal';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'status', 'action'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tasks!: Task[];

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  /**
   *
   * Get tasks list
   * @memberof TaskListComponent
   */
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        if (tasks) {
          this.tasks = tasks;
          this.dataSource = new MatTableDataSource<Task>(this.tasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
    });
  }

  /**
   *
   * Search task
   * @param {Event} event
   * @memberof TaskListComponent
   */
  searchTask(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   *
   *Open save task dialog
   * @memberof TaskListComponent
   */
  openaddTaskDialog(taskId?: string): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '500px',
      data: taskId,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getTasks();
      }
    });
  }

  /**
   *
   * Open delete task dialog for confirmation
   * @param {string} taskId
   * @memberof TaskListComponent
   */
  openDeleteTaskDialog(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteTask(taskId);
      }
    });
  }

  /**
   *
   * Delete task based on taskId
   * @param {string} taskId
   * @memberof TaskListComponent
   */
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: (task) => {
        if (task) {
          this.toast.success('Task deleted successfully', 'Success', {
            timeOut: 2000,
          });
          this.getTasks();
        }
      },
    });
  }
}

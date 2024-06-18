import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { UserComponent } from '../user/user.component';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/modal/user.modal';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

/** Material dependencies */
import { MaterialModule } from '../../../shared/module/material/material.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'status', 'action'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users!: User[];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   *
   * Get users list
   * @memberof UserListComponent
   */
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        if (users) {
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  /**
   *
   *Open save user dialog
   * @memberof UserListComponent
   */
  openSaveUserDialog(userId: string): void {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '500px',
      data: userId,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getUsers();
      }
    });
  }

  /**
   *
   * Open delete user dialog for confirmation
   * @param {string} userId
   * @memberof UserListComponent
   */
  openDeleteUserDialog(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteUser(userId);
      }
    });
  }

  /**
   *
   * Delete user based on userId
   * @param {string} userId
   * @memberof UserListComponent
   */
  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: (users) => {
        if (users) {
          this.toast.success('User deleted successfully', 'Success', {
            timeOut: 2000,
          });
          this.getUsers();
        }
      },
    });
  }
}

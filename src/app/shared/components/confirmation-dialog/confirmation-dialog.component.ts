import { Component } from '@angular/core';

/** Material dependencies */
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../module/material/material.module';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  /**
   *
   * Close dialog after user confirmation
   * @param {boolean} isDeleteUser
   * @memberof ConfirmationDialogComponent
   */
  closeDialog(isDeleteUser: boolean): void {
    this.dialogRef.close(isDeleteUser);
  }
}

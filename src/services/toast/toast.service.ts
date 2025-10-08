import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type MsgType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  show(
    message: string,
    type: MsgType = 'success',
    action = 'OK',
    duration = 3000
  ) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}

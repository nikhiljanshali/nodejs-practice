import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  // ✅ Basic Alert
  showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'info'
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#3085d6'
    });
  }

  // ✅ Success Alert
  success(message: string, title: string = 'Success') {
    return this.showAlert(title, message, 'success');
  }

  // ✅ Error Alert
  error(message: string, title: string = 'Error') {
    return this.showAlert(title, message, 'error');
  }

  // ✅ Warning Alert
  warning(message: string, title: string = 'Warning') {
    return this.showAlert(title, message, 'warning');
  }

  // ✅ Confirmation Dialog
  confirm(
    message: string,
    title: string = 'Are you sure?'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(result => result.isConfirmed);
  }

  // ✅ Toast Notification
  toast(message: string, icon: SweetAlertIcon = 'success') {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

}

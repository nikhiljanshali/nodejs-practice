import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {


  public formatDateToDDMMYYYY(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  public formatDateForInput(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

}

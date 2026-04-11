import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../services/notification';
import { Appointmentapi } from '../../services/appointment';
import { Subject, takeUntil } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Patientapi } from '../../services/patient';
import { Doctorapi } from '../../services/doctor';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList {

  appointments: any[] = [];
  filteredAppointments: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private appointmentService: Appointmentapi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private patientService: Patientapi,
    private doctorService: Doctorapi
  ) { }

  ngOnInit() {
    this.loadAppointments();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  loadAppointments() {
    this.spinner.show();
    this.appointmentService.getAllAppointments()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.appointments = Array.isArray(res.data)
              ? res.data.map((result: any) => ({
                ...result,
                showPatient: false,
                showDoctor: false
              })) : [];

            this.filteredAppointments = [...this.appointments];
            this.spinner.hide();
            // CRITICAL: Manually trigger change detection
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
            this.appointments = [];
            this.filteredAppointments = [];
          }
        },
        error: (err) => {
          this.spinner.hide();
          console.error('Error loading todos:', err);
          this.appointments = [];
          this.filteredAppointments = [];
        },
        // complete: () => {
        //   console.log('Todos loading completed');
        // }
      });
  }
  getStatusClass(status: string): string {
    const map: any = {
      scheduled: 'status-scheduled',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
      'no-show': 'status-noshow'
    };

    return map[status] || 'status-default';
  }

  getStatusIcon(status: string): string {
    const map: any = {
      scheduled: 'bi-clock',
      completed: 'bi-check-circle',
      cancelled: 'bi-x-circle',
      'no-show': 'bi-person-x'
    };

    return map[status] || 'bi-info-circle';
  }
  getConsultClass(type: string): string {
    const map: any = {
      'in-person': 'consult-inperson',
      'video': 'consult-video',
      'phone': 'consult-phone'
    };

    return map[type] || 'consult-default';
  }

  getConsultIcon(type: string): string {
    const map: any = {
      'in-person': 'bi-person-check',
      'video': 'bi-camera-video',
      'phone': 'bi-telephone'
    };

    return map[type] || 'bi-info-circle';
  }

  addAppointment(): void {
    this.router.navigate(['/appointment/create']);
  }

  togglePatientDetails(item: any) {
    item.showPatient = !item.showPatient;
    item.showDoctor = false;

    // 👉 If closing OR already loaded → do nothing
    if (!item.showPatient || item.patientDetails) return;

    item.isPatientLoading = true;

    this.patientService.getPatientById(item.patient).subscribe({
      next: (res) => {
        if (res?.status && res.data) {
          item.patientDetails = res.data; // ✅ keep separate
        }
      },
      error: (err) => {
        console.error('Patient fetch error:', err);
      },
      complete: () => {
        item.isPatientLoading = false;
      }
    });
  }

  toggleDoctorDetails(item: any) {
    item.showDoctor = !item.showDoctor;
    item.showPatient = false;

    // 👉 If closing OR already loaded → do nothing
    if (!item.showDoctor || item.doctorDetails) return;

    item.isDoctorLoading = true;

    this.doctorService.getDoctrorById(item.doctor).subscribe({
      next: (res) => {
        if (res?.status && res.data) {
          item.doctorDetails = res.data; // ✅ keep separate
        }
      },
      error: (err) => {
        console.error('Patient fetch error:', err);
      },
      complete: () => {
        item.isDoctorLoading = false;
      }
    });
  }
}

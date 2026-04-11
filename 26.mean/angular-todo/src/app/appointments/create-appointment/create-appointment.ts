import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctorapi } from '../../services/doctor';
import { NotificationService } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { Patientapi } from '../../services/patient';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { PatientDetails } from '../../interface/patient.interface';
import { DoctorResponseData } from '../../interface/doctor.interface';
import { Appointmentapi } from '../../services/appointment';

@Component({
  selector: 'app-create-appointment',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
})
export class CreateAppointment {
  appointmentForm!: FormGroup;
  private destroy$ = new Subject<void>();

  public doctors: DoctorResponseData[] = [];
  public patients: PatientDetails[] = [];

  constructor(
    private router: Router,
    private patientService: Patientapi,
    private doctorservice: Doctorapi,
    private appointmentService: Appointmentapi,
    private fb: FormBuilder,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getDoctors();
    this.getPatients();
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      patient: ['', Validators.required],
      doctor: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['scheduled'],
      consultationType: ['in-person'],
      reason: [''],
      notes: ['']
    });
  }

  private getDoctors(): void {
    this.spinner.show();
    this.doctorservice.getAllDoctors()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.doctors = Array.isArray(res.data)
              ? res.data.map((result: any) => ({
                ...result,
              }))
              : [];

            this.spinner.hide();
            // CRITICAL: Manually trigger change detection
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
            this.doctors = [];
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
          this.doctors = [];
        },
        complete: () => {
          console.log('Todos loading completed');
        }
      });
  }

  private getPatients() {
    this.spinner.show();
    this.patientService.getAllPatients()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.patients = Array.isArray(res.data)
              ? res.data.map((result: any) => ({
                ...result,
              }))
              : [];

            this.spinner.hide();
            // CRITICAL: Manually trigger change detection
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
            this.patients = [];
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
          this.patients = [];
        },
        complete: () => {
          console.log('Todos loading completed');
        }
      });
  }

  public generateDummyData() {
    const today = new Date();

    // Random time generator
    const getRandomTime = () => {
      const hour = Math.floor(Math.random() * 8) + 9; // 9 AM - 5 PM
      const minute = Math.random() > 0.5 ? '00' : '30';
      return `${hour.toString().padStart(2, '0')}:${minute}`;
    };

    const startTime = getRandomTime();

    // Add 30 mins for end time
    const [h, m] = startTime.split(':').map(Number);
    const endHour = m === 30 ? h + 1 : h;
    const endMinute = m === 30 ? '00' : '30';

    const dummyData = {
      // ❌ DO NOT PATCH
      patient: '',
      doctor: '',

      appointmentDate: today.toISOString().split('T')[0],
      startTime: startTime,
      endTime: `${endHour.toString().padStart(2, '0')}:${endMinute}`,

      status: this.getRandomItem(['scheduled', 'completed', 'cancelled']),
      consultationType: this.getRandomItem(['in-person', 'video', 'phone']),

      reason: this.getRandomItem([
        'Fever and headache',
        'Routine checkup',
        'Skin allergy',
        'Follow-up consultation',
        'Back pain'
      ]),

      notes: this.getRandomItem([
        'Patient needs rest',
        'Prescribed medication',
        'Further tests required',
        'All vitals normal',
        'Follow up after 1 week'
      ])
    };

    this.appointmentForm.patchValue(dummyData);
  }

  getRandomItem(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  goBack(): void {
    this.router.navigateByUrl('/appointment/list');
  }

  submitForm(): void {
    // if (this.appointmentForm.valid) {
    //   console.log(this.appointmentForm.value);
    //   this.
    // } else {
    //   this.appointmentForm.markAllAsTouched();
    // }
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.appointmentForm.value,
    };
    // ✅ Call API
    this.appointmentService.createWithValidation(payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.notification.showAlert('Success', 'Appointment Created Successfuly', 'success');
          // ✅ Redirect to list page
          this.router.navigate(['/appointment/list']);
        }
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }
}

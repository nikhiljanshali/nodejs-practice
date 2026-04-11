import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';
import { Patientapi } from '../../services/patient';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-edit-patient',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './edit-patient.html',
  styleUrl: './edit-patient.css',
})
export class EditPatient {
  private destroy$ = new Subject<void>();
  public patientId!: string;
  public patientForm!: FormGroup;
  public bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  public skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  public allergiesList = ['Dust', 'Pollen', 'Peanuts', 'Milk', 'None'];
  public medicationsList = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'None'];
  public diseasesList = ['Diabetes', 'Hypertension', 'Asthma', 'None'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: Patientapi,
    private fb: FormBuilder,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef,
    private commonServices: CommonServices
  ) {

  }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      skinType: ['', Validators.required],
      allergies: [''],
      medication: [''],
      diseases: [''],
      email: ['', Validators.required],
    });
    this.getPatientDetails(this.patientId);
  }


  private getPatientDetails(id: string): void {
    this.patientService.getPatientById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res?.status && res?.data) {
            const data = res.data;
            console.log(data);

            this.patientForm.patchValue({
              firstName: data.firstName,
              lastName: data.lastName,
              age: data.age,
              gender: data.gender,
              dateofBirth: this.commonServices.formatDateForInput(data.dateofBirth), // ✅ important
              bloodGroup: data.bloodGroup,
              skinType: data.skinType,
              allergies: data.allergies,
              medication: data.medication,
              diseases: data.diseases,
              email: data.email
            });

            this.cdr.markForCheck();
          } else {
            console.error('Invalid API response:', res);
          }
        },
        error: (err) => {
          console.error('Error loading patient:', err);
        }
      });
  }

  backToList(): void {
    this.router.navigateByUrl('/patient/list');
  }

  goBack(): void {
    this.router.navigateByUrl('/patient/list');
  }

  submitUpdate(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const payload = this.patientForm.value;

    console.log(payload); // ✅ your data

    // ✅ Call API
    this.patientService.updatePatient(this.patientId, payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.notification.showAlert('Success', 'Patient Updated successfully', 'success');

          // ✅ Redirect to list page
          this.router.navigate(['/patient/list']);
        }
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }
}

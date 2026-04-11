import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';
import { Patientapi } from '../../services/patient';

@Component({
  selector: 'app-create-patient',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './create-patient.html',
  styleUrl: './create-patient.css',
})
export class CreatePatient {
  private destroy$ = new Subject<void>();
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
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
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
  }

  backToList(): void {
    this.router.navigateByUrl('/patient/list');
  }

  submitCreate() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.patientForm.value,
      dateofBirth: new Date(this.patientForm.value.dateofBirth + 'T10:30:00Z').toISOString(),
    };

    console.log(payload); // ✅ your data

    // ✅ Call API
    this.patientService.createPatient(payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.notification.showAlert('Success', 'Patient Created Successfuly', 'success');
          // ✅ Redirect to list page
          this.router.navigate(['/patient/list']);
        }
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/patient/list');
  }

  generatePatientDummy(
  ) {
    const firstNames = ['Aarav', 'Vanya', 'Reyansh', 'Anika', 'Ishaan', 'Kiara'];
    const lastNames = ['Mehta', 'Desai', 'Agarwal', 'Khanna', 'Jain', 'Rao'];

    this.patientForm.patchValue({
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      age: Math.floor(18 + Math.random() * 65),
      gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
      dateofBirth: '19' + Math.floor(60 + Math.random() * 40) + '-0' +
        Math.floor(1 + Math.random() * 9) + '-1' +
        Math.floor(1 + Math.random() * 9),
      bloodGroup: this.bloodGroups[Math.floor(Math.random() * this.bloodGroups.length)],
      skinType: this.skinTypes[Math.floor(Math.random() * this.skinTypes.length)],
      allergies: this.allergiesList[Math.floor(Math.random() * this.allergiesList.length)],
      medication: this.medicationsList[Math.floor(Math.random() * this.medicationsList.length)],
      diseases: this.diseasesList[Math.floor(Math.random() * this.diseasesList.length)],
      email: Math.random().toString(36).substring(2) + '@mail.com'
    });
  }

}

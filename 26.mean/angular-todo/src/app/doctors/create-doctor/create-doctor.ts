import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subject } from 'rxjs';
import { NotificationService } from '../../services/notification';
import { Patientapi } from '../../services/patient';
import { Doctorapi } from '../../services/doctor';

@Component({
  selector: 'app-create-doctor',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './create-doctor.html',
  styleUrl: './create-doctor.css',
})
export class CreateDoctor {

  private destroy$ = new Subject<void>();
  public doctorForm!: FormGroup;

  public specializations = [
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Orthopedic Surgeon',
    'Pediatrician',
    'Psychiatrist',
    'Gynecologist',
    'Ophthalmologist',
    'ENT Specialist',
    'Dentist',
    'Diabetologist',
    'Pulmonologist',
    'Gastroenterologist',
    'Nephrologist',
    'Oncologist'
  ];

  public hospitals = [
    'Apollo Hospitals',
    'Fortis Healthcare',
    'AIIMS - All India Institute of Medical Sciences',
    'Medanta - The Medicity',
    'Max Super Specialty Hospital',
    'Narayana Health',
    'Jaslok Hospital',
    'Christian Medical College Hospital (CMC Vellore)',
    'Lilavati Hospital',
    'Sir Ganga Ram Hospital',
    'Kokilaben Dhirubhai Ambani Hospital',
    'Manipal Hospitals',
    'Yashoda Hospitals',
    'Rainbow Children’s Hospital',
    'Global Hospitals'
  ];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: Doctorapi,
    private fb: FormBuilder,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.doctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      specialization: ['', Validators.required],
      licenseNumber: ['', [Validators.required, Validators.minLength(6)]],

      contact: this.fb.group({
        phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
        email: ['', Validators.email],
        address: ['']
      }),

      hospital: [''],

      availability: this.fb.array([
        this.createAvailabilityGroup()
      ]),

      rating: [0]
    });
  }

  private createAvailabilityGroup(data?: any): FormGroup {
    return this.fb.group({
      day: [data?.day ?? '', Validators.required],
      from: [data?.from ?? '', Validators.required],
      to: [data?.to ?? '', Validators.required]
    });
  }

  get availabilityControls(): FormArray {
    return this.doctorForm.get('availability') as FormArray;
  }

  addAvailability() {
    this.availabilityControls.push(this.createAvailabilityGroup());
  }

  removeAvailability(index: number) {
    this.availabilityControls.removeAt(index);
  }

  backToList(): void {
    this.router.navigateByUrl('/doctor/list');
  }

  goBack(): void {
    this.router.navigateByUrl('/doctor/list');
  }

  generateLicense() {
    const prefix = 'DL';
    const rand = Math.floor(1000000 + Math.random() * 9000000);
    this.doctorForm.get('licenseNumber')?.setValue(prefix + rand);
  }

  generateDummyData() {
    const firstNames = [
      'Arjun', 'Anaya', 'Rohan', 'Isha', 'Karan', 'Nisha',
      'Vivek', 'Megha', 'Aditya', 'Pooja', 'Siddharth', 'Tanvi',
      'Harsh', 'Divya', 'Neil', 'Ritika', 'Aryan', 'Shreya'
    ];

    const lastNames = [
      'Verma', 'Joshi', 'Gupta', 'Mishra', 'Choudhury', 'Bhat',
      'Iyer', 'Nair', 'Reddy', 'Das', 'Malik', 'Khan',
      'Lodha', 'Pillai', 'Rao', 'Sengupta', 'Dutta', 'Banerjee'
    ];

    const specializations = [
      'General Physician',
      'Cardiologist',
      'Dermatologist',
      'Neurologist',
      'Orthopedic Surgeon',
      'Pediatrician',
      'Psychiatrist',
      'Gynecologist',
      'Ophthalmologist',
      'ENT Specialist',
      'Dentist',
      'Diabetologist',
      'Pulmonologist',
      'Gastroenterologist',
      'Nephrologist',
      'Oncologist'
    ];
    const hospitals = [
      'Apollo Hospitals',
      'Fortis Healthcare',
      'AIIMS - All India Institute of Medical Sciences',
      'Medanta - The Medicity',
      'Max Super Specialty Hospital',
      'Narayana Health',
      'Jaslok Hospital',
      'Christian Medical College Hospital (CMC Vellore)',
      'Lilavati Hospital',
      'Sir Ganga Ram Hospital',
      'Kokilaben Dhirubhai Ambani Hospital',
      'Manipal Hospitals',
      'Yashoda Hospitals',
      'Rainbow Children’s Hospital',
      'Global Hospitals'
    ];
    const availability = this.doctorForm.get('availability') as FormArray;
    availability.clear();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const fromTimes = ['09:00', '10:00', '11:00'];
    const toTimes = ['13:00', '14:00', '15:00', '16:00'];

    // Pick 2-3 unique days
    const shuffled = days.sort(() => 0.5 - Math.random());
    const selectedDays = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    selectedDays.forEach(day => {
      availability.push(this.createAvailabilityGroup({
        day,
        from: fromTimes[Math.floor(Math.random() * fromTimes.length)],
        to: toTimes[Math.floor(Math.random() * toTimes.length)]
      }));
    });

    this.doctorForm.patchValue({
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      specialization: specializations[Math.floor(Math.random() * specializations.length)],
      licenseNumber: 'DL' + Math.floor(100000 + Math.random() * 900000),
      hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
      rating: (Math.random() * 5).toFixed(1),
      contact: {
        phone: '9' + Math.random().toString().slice(2, 11),
        email: Math.random().toString(36).substring(2) + '@doctor.com',
        address: '123 Medical St, City'
      }
    });
  }




  submitCreate(): void {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.doctorForm.value,
    };
    // ✅ Call API
    this.doctorService.createDoctor(payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.notification.showAlert('Success', 'Patient Created Successfuly', 'success');
          // ✅ Redirect to list page
          this.router.navigate(['/doctor/list']);
        }
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }

}

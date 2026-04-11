import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Patientapi } from '../../services/patient';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServices } from '../../services/common-services';
import { NotificationService } from '../../services/notification';
import { Doctorapi } from '../../services/doctor';
import { DoctorResponseData } from '../../interface/doctor.interface';

@Component({
  selector: 'app-doctors-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-list.html',
  styleUrl: './doctors-list.css',
})
export class DoctorsList {
  doctors: DoctorResponseData[] = [];
  filteredDoctors: DoctorResponseData[] = [];
  expandedDoctorId: string | null = null;

  // Filter state
  searchQuery = '';
  specializationFilter = '';
  hospitalFilter = '';
  ratingFilter = '';
  availabilityDayFilter = '';

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

  public availabilityDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  private destroy$ = new Subject<void>();

  constructor(
    private doctorservice: Doctorapi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loaddoctors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  creatNewPatient(): void {
    this.router.navigateByUrl('doctor/create');
  }

  loaddoctors() {
    this.spinner.show();
    this.doctorservice.getAllDoctors()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.doctors = Array.isArray(res.data)
              ? res.data.map((todo: any) => ({
                ...todo,
                selected: false
              }))
              : [];

            this.filteredDoctors = [...this.doctors];
            this.spinner.hide();
            // CRITICAL: Manually trigger change detection
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
            this.doctors = [];
            this.filteredDoctors = [];
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
          this.doctors = [];
          this.filteredDoctors = [];
        },
        // complete: () => {
        //   console.log('Todos loading completed');
        // }
      });
  }

  getSpecClass(spec: string): string {
    const map: any = {
      'Cardiologist': 'spec-red',
      'Dermatologist': 'spec-pink',
      'Neurologist': 'spec-purple',
      'Orthopedic Surgeon': 'spec-orange',
      'Pediatrician': 'spec-blue',
      'Psychiatrist': 'spec-indigo',
      'Gynecologist': 'spec-rose',
      'Ophthalmologist': 'spec-teal',
      'ENT Specialist': 'spec-cyan',
      'Dentist': 'spec-yellow',
      'Diabetologist': 'spec-amber',
      'Pulmonologist': 'spec-sky',
      'Gastroenterologist': 'spec-green',
      'Nephrologist': 'spec-emerald',
      'Oncologist': 'spec-gray',
      'General Physician': 'spec-default'
    };

    return map[spec] || 'spec-default';
  }

  getSpecIcon(spec: string): string {
    const map: any = {
      'Cardiologist': 'bi-heart-pulse',
      'Dermatologist': 'bi-droplet',
      'Neurologist': 'bi-cpu',
      'Orthopedic Surgeon': 'bi-bandaid',
      'Pediatrician': 'bi-emoji-smile',
      'Psychiatrist': 'bi-brain',
      'Gynecologist': 'bi-gender-female',
      'Ophthalmologist': 'bi-eye',
      'ENT Specialist': 'bi-ear',
      'Dentist': 'bi-emoji-grin',
      'Diabetologist': 'bi-activity',
      'Pulmonologist': 'bi-lungs',
      'Gastroenterologist': 'bi-capsule',
      'Nephrologist': 'bi-droplet-half',
      'Oncologist': 'bi-shield-plus',
      'General Physician': 'bi-person-badge'
    };

    return map[spec] || 'bi-person';
  }

  toggleDetails(item: any) {
    this.expandedDoctorId =
      this.expandedDoctorId === item._id ? null : item._id;
  }

  applyFilters() {
    this.filteredDoctors = this.doctors.filter(doc => {

      // 🔍 Search (name + specialization)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();

        const matchesSearch =
          doc.firstName?.toLowerCase().includes(query) ||
          doc.lastName?.toLowerCase().includes(query) ||
          doc.specialization?.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // 🩺 Specialization
      if (this.specializationFilter && doc.specialization !== this.specializationFilter) {
        return false;
      }

      // 🏥 Hospital
      if (this.hospitalFilter && doc.hospital !== this.hospitalFilter) {
        return false;
      }

      // ⭐ Rating
      if (this.ratingFilter && doc.rating < +this.ratingFilter) {
        return false;
      }

      // 📅 Availability (check inside array)
      if (this.availabilityDayFilter) {
        const hasDay = doc.availability?.some(
          (slot: any) => slot.day === this.availabilityDayFilter
        );

        if (!hasDay) return false;
      }

      return true;
    });

    this.cdr.markForCheck();
  }
  clearFilters() {
    this.searchQuery = '';
    this.specializationFilter = '';
    this.hospitalFilter = '';
    this.ratingFilter = '';
    this.availabilityDayFilter = '';

    this.applyFilters();
  }

  getDoctordetails(data: DoctorResponseData) {
    console.log('Doctor details:', data);
  }
  editPatient(data: any) {
    this.router.navigateByUrl('/doctor/edit/' + data._id);
  }
  deletePatient(data: any) {
    this.doctorservice.deleteDoctor(data._id).subscribe((res) => {
      if (res) {
        this.loaddoctors()
        this.notification.showAlert('Success', 'Patient Deleted Successfuly', 'success');
      }
    })
  }

  // ✅ Correct trackBy
  trackById(index: number, item: any) {
    return item._id || index;
  }

  // Toggle all (custom checkbox)
  toggleAllCustom() {
    const shouldSelectAll = !this.isAllSelected();

    this.filteredDoctors.forEach((item: any) => {
      item.selected = shouldSelectAll;
    });
  }

  // Toggle single row
  toggleRow(item: any) {
    item.selected = !item.selected;
  }

  // All selected?
  isAllSelected(): boolean {
    return this.filteredDoctors?.length > 0 &&
      this.filteredDoctors.every((item: any) => item.selected);
  }

  // Partial selection
  isIndeterminate(): boolean {
    const selectedCount = this.filteredDoctors.filter((x: any) => x.selected).length;
    return selectedCount > 0 && selectedCount < this.filteredDoctors.length;
  }

  getBloodGroupClass(bg: string): string {
    switch (bg) {
      case 'A+': return 'bg-a';
      case 'B+': return 'bg-b';
      case 'O+': return 'bg-o';
      case 'AB+': return 'bg-ab';
      default: return 'bg-default';
    }
  }

  getSkinTypeClass(type: string): string {
    return 'skin-' + type?.toLowerCase();
  }

  getAllergyClass(allergy: string): string {
    return allergy === 'None' ? 'allergy-none' : 'allergy-active';
  }

  getDiseaseClass(disease: string): string {
    return disease === 'None' ? 'disease-none' : 'disease-active';
  }

  getMedicationClass(med: string): string {
    return med === 'None' ? 'medication-none' : 'medication-active';
  }
}

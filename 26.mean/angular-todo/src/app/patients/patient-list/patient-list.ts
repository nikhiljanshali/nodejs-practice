import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Patientapi } from '../../services/patient';
import { PatientDetails } from '../../interface/patient.interface';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  patients: PatientDetails[] = [];
  filteredPatients: PatientDetails[] = [];

  public bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  public skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  public allergiesList = ['Dust', 'Pollen', 'Peanuts', 'Milk', 'None'];
  public medicationsList = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'None'];
  public diseasesList = ['Diabetes', 'Hypertension', 'Asthma', 'None'];

  // Filter state
  searchQuery = '';
  bloodGroupFilter = '';
  skinTypeFilter = '';
  allergyFilter = '';
  medicationFilter = '';
  diseaseFilter = '';
  dateFilter = '';

  private destroy$ = new Subject<void>();

  constructor(
    private patientService: Patientapi,
    private commonService: CommonServices,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loadPatients();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  creatNewPatient(): void {
    this.router.navigateByUrl('patient/create');
  }

  loadPatients() {
    this.spinner.show();
    this.patientService.getAllPatients()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.patients = Array.isArray(res.data)
              ? res.data.map((todo: any) => ({
                ...todo,
                dateofBirth: this.commonService.formatDateToDDMMYYYY(todo.dateofBirth),
                selected: false
              }))
              : [];

            this.filteredPatients = [...this.patients];
            this.spinner.hide();
            // CRITICAL: Manually trigger change detection
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
            this.patients = [];
            this.filteredPatients = [];
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
          this.patients = [];
          this.filteredPatients = [];
        },
        // complete: () => {
        //   console.log('Todos loading completed');
        // }
      });
  }

  applyFilters() {
    console.log('Applying filters:', {
      search: this.searchQuery,
      bloodGroup: this.bloodGroupFilter,
      skinType: this.skinTypeFilter,
      allergy: this.allergyFilter,
      medication: this.medicationFilter,
      disease: this.diseaseFilter,
      date: this.dateFilter
    });

    this.filteredPatients = this.patients.filter(patient => {

      // ✅ Search filter (First + Last Name)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();

        const matchesSearch =
          patient.firstName?.toLowerCase().includes(query) ||
          patient.lastName?.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // ✅ Blood Group filter
      if (this.bloodGroupFilter && patient.bloodGroup !== this.bloodGroupFilter) {
        return false;
      }

      // ✅ Skin Type filter
      if (this.skinTypeFilter && patient.skinType !== this.skinTypeFilter) {
        return false;
      }

      // ✅ Allergy filter
      if (this.allergyFilter && patient.allergies !== this.allergyFilter) {
        return false;
      }

      // ✅ Medication filter
      // ✅ Medication filter
      if (this.medicationFilter && patient.medications !== this.medicationFilter) {
        return false;
      }

      // ✅ Disease filter
      if (this.diseaseFilter && patient.diseases !== this.diseaseFilter) {
        return false;
      }

      // ✅ Date filter (DOB match)
      if (this.dateFilter && patient.dateofBirth) {
        const filterDate = new Date(this.dateFilter).toISOString().split('T')[0];
        const patientDate = new Date(patient.dateofBirth.$date).toISOString().split('T')[0];

        if (filterDate !== patientDate) return false;
      }

      return true;
    });

    console.log('Filtered patients count:', this.filteredPatients.length);
    this.cdr.markForCheck();
  }

  // ✅ Clear all filters
  // clearFilters() {
  //   console.log('Clearing filters');
  //   this.searchQuery = '';
  //   this.bloodGroupFilter = '';
  //   this.skinTypeFilter = '';
  //   this.allergyFilter = '';
  //   this.medicationFilter = '';
  //   this.diseaseFilter = '';
  //   this.dateFilter = '';

  //   this.filteredPatients = [...this.patients];
  //   this.cdr.markForCheck();
  // }

  clearFilters() {
    (document.getElementById('filter-search') as HTMLInputElement).value = '';
    (document.getElementById('filter-date') as HTMLInputElement).value = '';

    document.querySelectorAll('select').forEach((el: any) => el.value = '');

    // reset variables
    this.searchQuery = '';
    this.bloodGroupFilter = '';
    this.skinTypeFilter = '';
    this.allergyFilter = '';
    this.medicationFilter = '';
    this.diseaseFilter = '';
    this.dateFilter = '';

    this.applyFilters();
  }

  // ✅ Update filter on search input
  onSearchChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onDateChange(event: Event) {
    this.dateFilter = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  editPatient(data: PatientDetails) {
    this.router.navigateByUrl('/patient/edit/' + data._id);
  }
  deletePatient(data: PatientDetails) {
    this.patientService.deletePatient(data._id).subscribe((res) => {
      if (res) {
        this.loadPatients()
        this.notification.showAlert('Success', 'Patient Deleted Successfuly', 'success');
      }
    })
  }

  // ✅ Correct trackBy
  trackById(index: number, item: PatientDetails) {
    return item._id || index;
  }

  // Toggle all (custom checkbox)
  toggleAllCustom() {
    const shouldSelectAll = !this.isAllSelected();

    this.filteredPatients.forEach((item: any) => {
      item.selected = shouldSelectAll;
    });
  }

  // Toggle single row
  toggleRow(item: any) {
    item.selected = !item.selected;
  }

  // All selected?
  isAllSelected(): boolean {
    return this.filteredPatients?.length > 0 &&
      this.filteredPatients.every((item: any) => item.selected);
  }

  // Partial selection
  isIndeterminate(): boolean {
    const selectedCount = this.filteredPatients.filter((x: any) => x.selected).length;
    return selectedCount > 0 && selectedCount < this.filteredPatients.length;
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

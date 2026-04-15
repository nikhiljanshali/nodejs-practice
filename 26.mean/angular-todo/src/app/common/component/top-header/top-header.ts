import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../../../services/storage-service';
import { CommonModule, SlicePipe } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-top-header',
  imports: [SlicePipe, CommonModule],
  templateUrl: './top-header.html',
  styleUrl: './top-header.css',
})
export class TopHeader {
  public userDetails: any = '';
  public isDropdownOpen = false;

  public pageTitle = '';
  public breadcrumb = '';
  public routePath = '';

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateRouteData(event.urlAfterRedirects);
      });
    this.userDetails = this.storageService.getLocal('user');
  }

  ngOnInit() {
    this.updateRouteData(this.router.url);
  }

  createNewTodo(): void {
    this.router.navigateByUrl('/create');
  }

  bookAppointment(): void {
    this.router.navigateByUrl('/appointment/create');
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // 🔥 IMPORTANT
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.isDropdownOpen = false;
  }
  // Actions
  goToProfile() {
    console.log('Profile clicked');
  }

  goToSettings() {
    console.log('Settings clicked');
  }

  logout() {
    console.log('Logout clicked');
  }

  updateRouteData(url: string) {
    this.routePath = url;

    if (url === '/' || url === '') {
      this.pageTitle = 'All Todos';
      this.breadcrumb = 'todos';
    }

    // Patients
    else if (url.includes('/patient/list')) {
      this.pageTitle = 'Patient List';
      this.breadcrumb = 'patient / list';
    }
    else if (url.includes('/patient/create')) {
      this.pageTitle = 'Create Patient';
      this.breadcrumb = 'patient / create';
    }
    else if (url.includes('/patient/edit')) {
      this.pageTitle = 'Edit Patient';
      this.breadcrumb = 'patient / edit';
    }

    // Doctors
    else if (url.includes('/doctor/list')) {
      this.pageTitle = 'Doctor List';
      this.breadcrumb = 'doctor / list';
    }
    else if (url.includes('/doctor/create')) {
      this.pageTitle = 'Create Doctor';
      this.breadcrumb = 'doctor / create';
    }
    else if (url.includes('/doctor/edit')) {
      this.pageTitle = 'Edit Doctor';
      this.breadcrumb = 'doctor / edit';
    }

    // Todos
    else if (url.includes('/create')) {
      this.pageTitle = 'Create Todo';
      this.breadcrumb = 'todos / create';
    }
    else if (url.includes('/edit')) {
      this.pageTitle = 'Edit Todo';
      this.breadcrumb = 'todos / edit';
    }
  }
}

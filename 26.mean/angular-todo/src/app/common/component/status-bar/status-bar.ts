import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../../services/notification';
import { Todoapi } from '../../../services/todoapi';
import { Patientapi } from '../../../services/patient';
import { Doctorapi } from '../../../services/doctor';
import { StorageService } from '../../../services/storage-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-bar',
  imports: [CommonModule],
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.css',
})
export class StatusBar {
  private destroy$ = new Subject<void>();
  public todosCounter: any;
  public patientsCounter: any;
  public doctorCounter: any;
  public url: string = '';

  constructor(
    private doctorService: Doctorapi,
    private todoService: Todoapi,
    private patientService: Patientapi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService,
    private storageService: StorageService
  ) {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.url = event.url;
    });
  }

  ngOnInit() {
    if (this.storageService.getLocal('user') != null) {
      this.countTodos();
      this.countPatients();
      this.countDoctors();
    }
  }

  countTodos() {
    this.todoService.getTodosCount()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.todosCounter = res.data;
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
        },
      });
  }

  countPatients() {
    this.patientService.getPatientsCount()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.patientsCounter = res.data;
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
        },

      });
  }

  countDoctors() {
    this.doctorService.getDoctorsCount()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.doctorCounter = res.data;
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
        },
      });
  }

  get progressPercentage(): number {
    if (!this.todosCounter?.total) return 0;

    return Math.round(
      (this.todosCounter.completed / this.todosCounter.total) * 100
    );
  }

  getRatingStyle(range: string) {
    const styles: any = {
      "0-1": {
        icon: { background: "#FEE2E2", color: "#DC2626" },
        text: { color: "#DC2626" }
      },
      "1-2": {
        icon: { background: "#FEF3C7", color: "#D97706" },
        text: { color: "#D97706" }
      },
      "2-3": {
        icon: { background: "#E0F2FE", color: "#0284C7" },
        text: { color: "#0284C7" }
      },
      "3-4": {
        icon: { background: "#DCFCE7", color: "#16A34A" },
        text: { color: "#16A34A" }
      },
      "4-5": {
        icon: { background: "#EDE9FE", color: "#7C3AED" },
        text: { color: "#7C3AED" }
      }
    };

    return styles[range] || styles["2-3"];
  }

  getRatingLabel(range: string): string {
    const map: any = {
      "0-1": "Poor",
      "1-2": "Below Average",
      "2-3": "Average",
      "3-4": "Good",
      "4-5": "Excellent"
    };

    return map[range] || "Unknown";
  }
}

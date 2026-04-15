import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage-service';
import { Commonapi } from '../../services/common';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private destroy$ = new Subject<void>();
  public url: string = '';
  public allCounter: any;

  constructor(
    private commonServices: Commonapi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.url = event.url;
    });
  }

  ngOnInit() {
    if (this.storageService.getLocal('user') != null) {
      this.getAllCounters();
    }
  }

  getAllCounters() {
    this.commonServices.getAllCounter()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.allCounter = res.data;
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
    if (!this.allCounter?.todoCounts?.total) return 0;

    return Math.round(
      (this.allCounter?.todoCounts?.completed / this.allCounter?.todoCounts?.total) * 100
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

  getAppointmentStyle(status: string) {
    debugger;
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return {
          card: { background: '#FFF7ED', border: '1px solid #FED7AA' },
          icon: { background: '#F97316', color: '#fff' },
          text: { color: '#F97316' },
          iconClass: 'bi bi-hourglass-split'
        };

      case 'in-progress':
        return {
          card: { background: '#EFF6FF', border: '1px solid #BFDBFE' },
          icon: { background: '#2563EB', color: '#fff' },
          text: { color: '#2563EB' },
          iconClass: 'bi bi-arrow-repeat'
        };

      case 'completed':
        return {
          card: { background: '#ECFDF5', border: '1px solid #BBF7D0' },
          icon: { background: '#16A34A', color: '#fff' },
          text: { color: '#16A34A' },
          iconClass: 'bi bi-check-circle'
        };

      case 'cancelled':
        return {
          card: { background: '#FEF2F2', border: '1px solid #FECACA' },
          icon: { background: '#DC2626', color: '#fff' },
          text: { color: '#DC2626' },
          iconClass: 'bi bi-x-circle'
        };

      default:
        return {
          card: { background: '#F1F5F9', border: '1px solid #E2E8F0' },
          icon: { background: '#64748B', color: '#fff' },
          text: { color: '#64748B' },
          iconClass: 'bi bi-question-circle'
        };
    }
  }
}

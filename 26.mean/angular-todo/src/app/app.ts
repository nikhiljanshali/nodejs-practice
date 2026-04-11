import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonBar } from "./common/component/common-bar/common-bar";
import { TopHeader } from "./common/component/top-header/top-header";
import { StatusBar } from "./common/component/status-bar/status-bar";
import { filter } from 'rxjs';
import { StorageService } from './services/storage-service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NgxSpinnerModule, CommonBar, TopHeader, StatusBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  public isAuthRoute = false;


  protected readonly title = signal('angular-todo');
  public url: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService,
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.url = event.url;

        this.isAuthRoute =
          event.url.includes('/login') ||
          event.url.includes('/signup');
      });
  }

  ngOnInit() {
    if (this.storageService.getLocal('token')) this.router.navigate(['/']);
    else this.router.navigate(['/auth']);
  }

  // get showStatusBar(): boolean {
  //   // && this.url !== '/patient/list' && this.url !== '/patient/create';
  //   return this.url !== '/create' && !this.url.startsWith('/edit') && this.url !== '/createMultiple';
  // }

  isAuthPage(): boolean {
    const url = this.router.url;
    return url.includes('/auth') || url.includes('/signup');
  }
}

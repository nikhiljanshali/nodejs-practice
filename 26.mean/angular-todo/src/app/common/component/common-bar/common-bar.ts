import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../services/notification';
import { Todoapi } from '../../../services/todoapi';
import { StorageService } from '../../../services/storage-service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-common-bar',
  imports: [RouterModule, SlicePipe],
  templateUrl: './common-bar.html',
  styleUrl: './common-bar.css',
})
export class CommonBar {
  @Input() title: string = '';
  public userDetails: any = '';

  constructor(
    private todoService: Todoapi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService,
    private storageService: StorageService
  ) {
    this.userDetails = this.storageService.getLocal('user');
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  logout(): void {
    this.storageService.clearLocal();
    this.storageService.clearSession();
    this.router.navigateByUrl('/auth');
  }

}

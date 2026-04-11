import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todoapi } from '../../services/todoapi';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-todo-edit',
  standalone: true, // ✅ REQUIRED
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './todo-edit.html',
})
export class TodoEdit {

  private destroy$ = new Subject<void>();
  todoForm!: FormGroup;
  todoId!: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: Todoapi,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    // ✅ Get ID from URL
    this.todoId = this.route.snapshot.paramMap.get('id') || '';
    // ✅ Create form
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required],
      tags: ['']
    });
    this.getTodoDetails(this.todoId);
  }

  backToList(): void {
    this.router.navigateByUrl('/');
  }

  private getTodoDetails(id: any): void {
    this.todoService.getTodoById(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            const data = res.data;
            this.todoForm.patchValue({
              title: data.title,
              description: data.description,
              status: data.status,
              priority: data.priority,
              dueDate: this.formatDateForInput(data.date), // ✅ FIXED
              tags: data.tags
            });
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
        },
        // complete: () => {
        //   console.log('Todos loading completed');
        // }
      });
  }

  // formatDateToDDMMYYYY(isoDate?: string): string {
  //   if (!isoDate) return '';
  //   const date = new Date(isoDate);
  //   return `${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCDate()).padStart(2, '0')}/${date.getUTCFullYear()}`;
  // }

  formatDateForInput(isoDate?: string): string {
    if (!isoDate) return '';

    const date = new Date(isoDate);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  submitEdit() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const payload = this.todoForm.value;

    console.log(payload); // ✅ your data

    // ✅ Call API
    this.todoService.updateTodo(this.todoId, payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.notification.showAlert('Success', 'Todo Updated successfully', 'success');

          // ✅ Redirect to list page
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todoapi } from '../../services/todoapi';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-todo-create',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './todo-create.html',
  styleUrl: './todo-create.css',
})
export class TodoCreate {

  private destroy$ = new Subject<void>();
  todoForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: Todoapi,
    private fb: FormBuilder,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.todoForm = this.fb.group({
      completed: [''],
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      date: ['', Validators.required],
      tags: ['']
    });
  }

  backToList(): void {
    this.router.navigateByUrl('/');
  }

  submitCreate() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }


    const payload = {
      ...this.todoForm.value,
      dueDate: new Date(this.todoForm.value.date + 'T10:30:00Z').toISOString(),
      completed: false
    };

    console.log(payload); // ✅ your data

    // ✅ Call API
    this.todoService.createTodo(payload).subscribe({
      next: (res) => {
        if (res.status) {
          this.notification.showAlert('Success', 'Todo Created Successfuly', 'success');
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

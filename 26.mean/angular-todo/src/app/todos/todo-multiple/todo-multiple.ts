import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { Todoapi } from '../../services/todoapi';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-multiple',
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './todo-multiple.html',
  styleUrl: './todo-multiple.css',
})
export class TodoMultiple {
  todoForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: Todoapi,
    private fb: FormBuilder,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef,
  ) {
    this.todoForm = this.fb.group({
      todos: this.fb.array([])
    });
    for (let i = 0; i < 5; i++) {
      this.addRow();
    }
    // this.addRow(); // initial row
  }



  get todos(): FormArray {
    return this.todoForm.get('todos') as FormArray;
  }
  createTodoGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pending', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['low', Validators.required],
      tags: [''],
      completed: [false]
    });
  }

  addRow() {
    this.todos.push(this.createTodoGroup());
  }

  removeRow(index: number) {
    this.todos.removeAt(index);
  }

  onSubmit() {

    if (this.todoForm.valid) {
      if (this.todoForm.invalid) {
        this.todoForm.markAllAsTouched();
        return;
      }



      const payload = this.todoForm.value.todos.map((todo: any) => ({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        dueDate: todo.date
          ? new Date(todo.date + 'T00:00:00Z').toISOString()
          : null,
        priority: todo.priority,
        tags: todo.tags || '',
        completed: false
      }));

      console.log(payload); // ✅ your data

      // ✅ Call API
      this.todoService.createMultipleTodos(payload).subscribe({
        next: (res) => {
          if (res.status) {
            this.notification.showAlert('Success', 'Todo(s) Created Successfuly', 'success');
            // ✅ Redirect to list page
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    } else {
      this.todoForm.markAllAsTouched();
    }
  }


  backToList(): void {
    this.router.navigateByUrl('/');
  }

}

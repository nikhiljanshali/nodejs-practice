import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todoapi } from '../../services/todoapi';
import { Todo, TodoCounter, TodoCounterList } from '../../interface/todo.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush // ✅ CRITICAL: Explicit change detection
})
export class TodoList implements OnInit, OnDestroy {

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];

  // Filter state
  searchQuery = '';
  statusFilter = '';
  priorityFilter = '';
  dateFilter = '';

  private destroy$ = new Subject<void>();

  constructor(
    private todoService: Todoapi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loadTodos();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTodos() {
    this.spinner.show();
    this.todoService.getAllTodos()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          if (res && res.status && res.data) {
            this.todos = Array.isArray(res.data)
              ? res.data.map((todo: any) => ({
                ...todo,
                selected: false
              }))
              : [];

            this.filteredTodos = [...this.todos];
            this.spinner.hide();
            // CRITICAL: Manually trigger change detection
            this.cdr.markForCheck();
          } else {
            console.error('API response format invalid:', res);
            this.todos = [];
            this.filteredTodos = [];
          }
        },
        error: (err) => {
          console.error('Error loading todos:', err);
          this.todos = [];
          this.filteredTodos = [];
        },
        // complete: () => {
        //   console.log('Todos loading completed');
        // }
      });
  }

  applyFilters() {
    console.log('Applying filters:', {
      search: this.searchQuery,
      status: this.statusFilter,
      priority: this.priorityFilter,
      date: this.dateFilter
    });

    this.filteredTodos = this.todos.filter(todo => {

      // ✅ Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();

        const matchesSearch =
          todo.title?.toLowerCase().includes(query) ||
          todo.description?.toLowerCase().includes(query) ||
          todo.tags?.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // ✅ Status filter (based on API status field)
      if (this.statusFilter && todo.status !== this.statusFilter) {
        return false;
      }

      // ✅ Priority filter
      if (this.priorityFilter && todo.priority !== this.priorityFilter) {
        return false;
      }

      // ✅ Completed filter (optional if you use it)
      if (this.statusFilter === 'completed' && !todo.completed) {
        return false;
      }

      // ✅ Date filter (compare only date part)
      if (this.dateFilter && todo.date) {
        const filterDate = new Date(this.dateFilter).toISOString().split('T')[0];
        const todoDate = new Date(todo.date).toISOString().split('T')[0];

        if (filterDate !== todoDate) return false;
      }

      return true;
    });

    console.log('Filtered todos count:', this.filteredTodos.length);
    this.cdr.markForCheck();
  }

  // ✅ Clear all filters
  clearFilters() {
    console.log('Clearing filters');
    this.searchQuery = '';
    this.statusFilter = '';
    this.priorityFilter = '';
    this.dateFilter = '';
    this.filteredTodos = [...this.todos];
    this.cdr.markForCheck();
  }

  // ✅ Update filter on search input
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    this.applyFilters();
  }

  // ✅ Update filter on status change
  onStatusChange(event: any) {
    this.statusFilter = event.target.value;
    this.applyFilters();
  }

  // ✅ Update filter on priority change
  onPriorityChange(event: any) {
    this.priorityFilter = event.target.value;
    this.applyFilters();
  }

  // ✅ Update filter on date change
  onDateChange(event: any) {
    this.dateFilter = event.target.value;
    this.applyFilters();
  }

  editTodo(id: string) {
    this.router.navigateByUrl('edit/' + id);
  }

  toggleComplete(item: any) {
    item.completed = !item.completed;
    // ✅ Optional: Call API
    this.todoService.updateTodo(item._id, {
      completed: item.completed
    }).subscribe();
  }

  async deleteTodo(id: string) {
    const confirmed = await this.notification.confirm('Delete this todo?', 'Delete');

    if (confirmed) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.notification.success('Deleted successfully');
        this.loadTodos();
      });
    }
    // if (confirm('Are you sure you want to delete this todo?')) {
    //   this.todoService.deleteTodo(id).subscribe({
    //     next: () => {
    //       console.log('Todo deleted:', id);
    //       this.loadTodos();
    //     },
    //     error: (err) => {
    //       console.error('Error deleting todo:', err);
    //       alert('Failed to delete todo');
    //     }
    //   });
    // }
  }

  // ✅ Correct trackBy
  trackById(index: number, item: Todo) {
    return item._id || index;
  }

  // Toggle all (custom checkbox)
  toggleAllCustom() {
    const shouldSelectAll = !this.isAllSelected();

    this.filteredTodos.forEach((item: any) => {
      item.selected = shouldSelectAll;
    });
  }

  // Toggle single row
  toggleRow(item: any) {
    item.selected = !item.selected;
  }

  // All selected?
  isAllSelected(): boolean {
    return this.filteredTodos?.length > 0 &&
      this.filteredTodos.every((item: any) => item.selected);
  }

  // Partial selection
  isIndeterminate(): boolean {
    const selectedCount = this.filteredTodos.filter((x: any) => x.selected).length;
    return selectedCount > 0 && selectedCount < this.filteredTodos.length;
  }
}

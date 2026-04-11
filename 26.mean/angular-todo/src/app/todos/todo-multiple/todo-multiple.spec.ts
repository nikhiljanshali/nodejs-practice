import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMultiple } from './todo-multiple';

describe('TodoMultiple', () => {
  let component: TodoMultiple;
  let fixture: ComponentFixture<TodoMultiple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoMultiple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoMultiple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

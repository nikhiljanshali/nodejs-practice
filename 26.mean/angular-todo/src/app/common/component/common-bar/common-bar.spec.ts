import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBar } from './common-bar';

describe('CommonBar', () => {
  let component: CommonBar;
  let fixture: ComponentFixture<CommonBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

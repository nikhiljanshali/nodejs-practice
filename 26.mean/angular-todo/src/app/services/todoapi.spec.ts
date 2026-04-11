import { TestBed } from '@angular/core/testing';

import { Todoapi } from './todoapi';

describe('Todoapi', () => {
  let service: Todoapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Todoapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

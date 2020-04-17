import { TestBed } from '@angular/core/testing';

import { DailyLayoutService } from './daily-layout.service';

describe('DailyLayoutService', () => {
  let service: DailyLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

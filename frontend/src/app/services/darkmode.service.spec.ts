import { TestBed } from '@angular/core/testing';
import { DarkmodeService } from './darkmode.service';
import { LocalStorageService } from './local-storage.service';

describe('DarkmodeService', () => {
  let service: DarkmodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [DarkmodeService, LocalStorageService]
    });
    service = TestBed.inject(DarkmodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the darkmode', () => {
    let darkmodeStatus = service.isEnabled();
    service.toggleDarkmode()
    expect(service.isEnabled()).toEqual(!darkmodeStatus);
  });
});

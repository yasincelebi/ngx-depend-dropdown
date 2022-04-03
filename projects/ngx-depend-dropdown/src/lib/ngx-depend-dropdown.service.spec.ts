import { TestBed } from '@angular/core/testing';

import { NgxDependDropdownService } from './ngx-depend-dropdown.service';

describe('NgxDependDropdownService', () => {
  let service: NgxDependDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDependDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

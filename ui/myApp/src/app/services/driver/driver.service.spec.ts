/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverService } from './driver.service';

describe('Service: Driver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverService]
    });
  });

  it('should ...', inject([DriverService], (service: DriverService) => {
    expect(service).toBeTruthy();
  }));
});

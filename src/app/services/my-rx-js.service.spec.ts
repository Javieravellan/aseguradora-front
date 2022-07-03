import { TestBed } from '@angular/core/testing';

import { MyRxJSService } from './my-rx-js.service';

describe('MyRxJSService', () => {
  let service: MyRxJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRxJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

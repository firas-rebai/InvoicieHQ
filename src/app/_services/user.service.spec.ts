import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule],
      providers: [TokenStorageService]});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

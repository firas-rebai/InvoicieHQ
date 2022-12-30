import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule],
      providers: [ClientService]});
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

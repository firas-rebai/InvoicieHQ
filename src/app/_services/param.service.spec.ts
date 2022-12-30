import { TestBed } from '@angular/core/testing';

import { ParamService } from './param.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";

describe('ParamService', () => {
  let service: ParamService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule],
      providers: [ParamService]});
    service = TestBed.inject(ParamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DocumentService } from './document.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule],
      providers: [DocumentService]});
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

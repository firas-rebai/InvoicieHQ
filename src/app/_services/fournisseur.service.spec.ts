import { TestBed } from '@angular/core/testing';

import { FournisseurService } from './fournisseur.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";

describe('FournisseurService', () => {
  let service: FournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule],
      providers: [FournisseurService]});
    service = TestBed.inject(FournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

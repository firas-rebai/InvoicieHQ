import { Injectable } from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fournisseur} from "../_models/Fournisseur";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl + "/fournisseur");
  }

  public addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl + "/fournisseur/add", fournisseur);
  }

  public deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/fournisseur/delete/" + id);
  }

  public getFournisseurId(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(this.apiUrl + "/fournisseur/" + id)
  }

}

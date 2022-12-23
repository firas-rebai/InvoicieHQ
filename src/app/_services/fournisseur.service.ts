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

  public getClients(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl + "/fournisseur");
  }

  public addClient(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl + "/fournisseur/add", fournisseur);
  }

  public deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/fournisseur/delete/" + id);
  }

  public getClientId(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(this.apiUrl + "/fournisseur/" + id)
  }

}

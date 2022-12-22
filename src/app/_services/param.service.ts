import { Injectable } from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../_models/Client";
import {Unite} from "../_models/Unite";
import {TVA} from "../_models/TVA";
import {Assujetti} from "../_models/Assujetti";

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAssujettis(): Observable<Assujetti[]> {
    return this.http.get<Assujetti[]>(this.apiUrl + "/assujetti");
  }

  public addAssujetti(assujetti: Assujetti): Observable<Assujetti> {
    return this.http.post<Assujetti>(this.apiUrl + "/assujetti/add", assujetti);
  }

  public deleteAssujetti(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/assujetti/delete/" + id);
  }

  public getAssujettiId(id: number): Observable<Assujetti> {
    return this.http.get<Assujetti>(this.apiUrl + "/assujetti/" + id)
  }


  public getTVAs(): Observable<TVA[]> {
    return this.http.get<TVA[]>(this.apiUrl + "/tva");
  }

  public addTVA(tva: TVA): Observable<TVA> {
    return this.http.post<TVA>(this.apiUrl + "/tva/add", tva);
  }

  public deleteTVA(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/tva/delete/" + id);
  }

  public getTVAId(id: number): Observable<TVA> {
    return this.http.get<TVA>(this.apiUrl + "/tva/" + id)
  }


  public getUnites(): Observable<Unite[]> {
    return this.http.get<Unite[]>(this.apiUrl + "/unite");
  }

  public addUnite(unite: Unite): Observable<Unite> {
    return this.http.post<Unite>(this.apiUrl + "/unite/add", unite);
  }

  public deleteUnite(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/unite/delete/" + id);
  }

  public getUniteId(id: number): Observable<Unite> {
    return this.http.get<Unite>(this.apiUrl + "/unite/" + id)
  }
}

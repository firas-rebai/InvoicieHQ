import {Injectable} from '@angular/core';
import {GlobalConfig} from "../global-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../_models/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = GlobalConfig.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + "/client");
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + "/client/add", client);
  }

  public deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/client/delete/" + id);
  }

  public getClientId(id: number): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + "/client/" + id)
  }

}

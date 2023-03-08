import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../_models/Fournisseur';
import { HttpClient } from '@angular/common/http';
import { GlobalConfig } from '../global-config';
import { Settings } from '../_models/Settings';

@Injectable({
	providedIn: 'root',
})
export class ParameterService {
	apiUrl: string = GlobalConfig.apiUrl;

	constructor(private http: HttpClient) {}

	public getSettings(): Observable<Settings> {
		return this.http.get<Settings>(this.apiUrl + '/settings');
	}

	public updateSettings(settings: Settings): Observable<Settings> {
		return this.http.put<Settings>(
			this.apiUrl + '/settings/update',
			settings
		);
	}

	public updateLogo(file: FormData): Observable<Settings> {
		return this.http.put<Settings>(this.apiUrl + '/settings/logo', file);
	}
}

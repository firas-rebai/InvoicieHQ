import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../_models/User";

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

	public isUserLogged() : boolean {
		return window.localStorage.getItem('isUserLoggedIn') == 'true';
	}

	public userLoggedIn(): void {
		window.localStorage.setItem('isUserLoggedIn', 'true')
	}

	public userLoggedOut(): void {
		window.localStorage.setItem('isUserLoggedIn', 'false')
	}

	public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserLogged());
	public connectedUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
	public trans: BehaviorSubject<string> = new BehaviorSubject<string>('');


}

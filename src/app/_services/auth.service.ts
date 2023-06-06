import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataSharingService } from './data-sharing.service';
import { TokenStorageService } from './token-storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../_models/User';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private http: HttpClient,
		private firebaseAuth: AngularFireAuth,
		private tokenStorage: TokenStorageService,
		private dataSharingService: DataSharingService,
		private store: AngularFirestore,
		private router : Router
	) {}

	async signin(email: string, password: string) {
		await this.firebaseAuth
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				localStorage.clear()
				this.dataSharingService.isUserLoggedIn.next(true);
				this.dataSharingService.userLoggedIn();
				this.store.collection("users", ref => ref.where("uid", "==", response.user?.uid).limit(1)).snapshotChanges().subscribe(
					response => {
						const user : User = response[0].payload.doc.data() as User;
						this.dataSharingService.connectedUser.next(user);
						localStorage.setItem("uid", JSON.stringify(user.uid));
						localStorage.setItem("role", JSON.stringify(user.role));
						this.router.navigate(["/home"])
					}
				)

			});
	}

	login(username: string, password: string): Observable<any> {
		return this.http.post(
			AUTH_API + 'signin',
			{
				username,
				password,
			},
			httpOptions
		);
	}

	register(
		username: string,
		email: string,
		password: string
	): Observable<any> {
		return this.http.post(
			AUTH_API + 'signup',
			{
				username,
				email,
				password,
			},
			httpOptions
		);
	}
}

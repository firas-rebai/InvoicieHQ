import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	form: any = {
		username: null,
		password: null,
	};
	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';
	roles: string[] = [];
	hide: boolean = true;

	constructor(
		private tokenStorage: TokenStorageService,
	) {}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.roles = this.tokenStorage.getUser().roles;
		}
	}

	onSubmit(): void {
		/* const { username, password } = this.form;
		this.authService.signin(username, password); */
	}

	reloadPage(): void {
		window.location.reload();
	}

	register() {
		/* this.authService
			.register('admin', 'firasrebai01@gmail.com', '123456789')
			.subscribe(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			); */
	}
}

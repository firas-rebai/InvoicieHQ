import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataSharingService } from '../_services/data-sharing.service';
import { Router } from '@angular/router';

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
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
		private dataSharingService: DataSharingService,
		private router: Router
	) {}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.roles = this.tokenStorage.getUser().roles;
		}
	}

	onSubmit(): void {
		const { username, password } = this.form;
		console.log(this.form);
		this.authService.signin(username, password);
		/* this.authService.login(username, password).subscribe(
			data => {
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveUser(data);

				this.dataSharingService.isUserLoggedIn.next(true);
				this.dataSharingService.connectedUser.next(data);
				this.dataSharingService.userLoggedIn();
				this.roles = this.tokenStorage.getUser().roles;
				this.router.navigate(['/home']);
			},
			err => {
				console.log(err)
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
			}
		); */
	}

	reloadPage(): void {
		window.location.reload();
	}

	register() {
		this.authService
			.register('admin', 'firasrebai01@gmail.com', '123456789')
			.subscribe(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);
	}
}

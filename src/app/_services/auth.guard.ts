import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {DataSharingService} from "./data-sharing.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private dataSharingService: DataSharingService, private router: Router) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// console.log(this.dataSharingService.isUserLoggedIn.value)
		// console.log("url", state.url)
		if (state.url == '/login') {
			if (this.dataSharingService.isUserLoggedIn.value) {
				this.router.navigate(['/home']);
				return false;
			} else
				return true;
		} else {
			if (this.dataSharingService.isUserLoggedIn.value) {
				return true;
			} else {
				this.router.navigate(['/login']);
				return false;
			}
		}
	}

}

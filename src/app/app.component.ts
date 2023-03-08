import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AddFournisseurComponent} from "./fournisseur-components/add-fournisseur/add-fournisseur.component";
import {MatDialog} from "@angular/material/dialog";
import {ParameterDialogComponent} from "./parameter-dialog/parameter-dialog.component";
import {DataSharingService} from "./_services/data-sharing.service";
import {TokenStorageService} from "./_services/token-storage.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'dhd-frontend-angular';
	@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
	active_achat: string = 'menu-button';
	active_vente: string = 'menu-button';
	showNavbar: boolean = true;

	constructor(private router: Router,
			public dialog: MatDialog,
			private dataSharingService: DataSharingService,
			private tokenStorage: TokenStorageService) {
		this.dataSharingService.isUserLoggedIn.subscribe(value => {
			this.showNavbar = value;
			// console.log(value)
		})
	}

	sideBarOpen = true;

	sideBarToggler() {
		this.sideBarOpen = !this.sideBarOpen;
	}

	openMenu(trans: string) {

		// window.location.href = window.location.protocol + '//' + window.location.host + '/document/' + trans;
		this.router.navigate(['document', trans]);
		if (trans == 'vente') {
			this.active_achat = 'menu-button';
			this.active_vente = 'active-link'
		} else {
			this.active_vente = 'menu-button';
			this.active_achat = 'active-link'
		}
		this.dataSharingService.trans.next(trans);
	}

	toggleSidebar() {
		this.toggleSidebarForMe.emit();
	}

	openParam() {
		const dialogRef = this.dialog.open(ParameterDialogComponent);

	}


	logout() {
		this.tokenStorage.signOut();
		this.dataSharingService.isUserLoggedIn.next(false);
		this.dataSharingService.userLoggedOut();
		this.router.navigate(["/login"])
	}
}

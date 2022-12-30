import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dhd-frontend-angular';

  constructor(private router: Router) {
  }

  openMenu(type: string, trans: string) {

    window.location.href = window.location.protocol + '//' + window.location.host + '/document/' + trans + "/" + type;
  }


}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
  }

  ngOnInit(): void {
    this.message = this.data.message
  }
}

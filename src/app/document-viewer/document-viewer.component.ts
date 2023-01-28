import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DocumentService} from "../_services/document.service";

@Component({
	selector: 'app-document-viewer',
	templateUrl: './document-viewer.component.html',
	styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {
	pdf: any;
	zoom: any;
	pageVariable: any;
	loading: boolean;

	constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }, private documentService: DocumentService) {
	}

	ngOnInit(): void {
		this.documentService.generatePDF(this.data.id).subscribe(
			(response) => {
				const file = new Blob([response], { type: 'application/pdf' });
				this.pdf = URL.createObjectURL(file);
				// this.pdf = 'data:application/pdf;base64,' + file.text;
				window.open(this.pdf)
			}, (error) => {
				console.log(error)
			}
		)

	}

	zoomIn() {
		this.zoom += 1
	}

	zoomOut() {
		this.zoom -= 1
	}

	previousPage() {
		if (this.pageVariable === 1) {
			return;
		}
		this.pageVariable -= 1;
	}

	nextPage() {
		this.pageVariable += 1;
	}
}

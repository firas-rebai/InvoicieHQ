import { Injectable } from '@angular/core';
import { Settings } from '../_models/Settings';
import PouchDB from 'pouchdb';

@Injectable({
	providedIn: 'root',
})
export class ParameterService {
	db: any;
	attachments: any;

	constructor() {
		this.db = new PouchDB('settings');
		this.attachments = new PouchDB('attachments');
	}

	public getSettings() {
		let settings = this.db
			.get('1')
			.then((response) => {
				return this.db.get('1');
			})
			.catch((error) => {
				console.log(error);
				this.set().then((response) => {
					return this.db.get('1');
				});
			});
		if (settings == null || settings == undefined) {
			this.set().then((response) => {
				return this.db.get('1');
			});
		} else {
			return this.db.get('1');
		}
		return this.db.get('1');
	}

	public updateSettings(settings: any) {
		return this.db.get('1').then((doc) => {
			settings._rev = doc._rev;
			return this.db.put(settings);
		});
	}

	public get_logo() {
		return this.attachments.getAttachment('logo', 'logo/image');
	}

	public upload_logo(file) {
		let document = {
			_id: 'logo',
			_attachments: {
				'logo/image': {
					content_type: file.type,
					data: file,
				},
			},
		};

		return this.attachments.get('logo', { attachments: true }).then((doc) => {
			console.log(doc);
			doc._rev = doc._rev;
			doc._id = 'logo';
			doc._attachments = {
				'logo/image': {
					content_type: file.type,
					data: file,
				},
			};
			return this.attachments.put(doc).then((doc) => {
				return this.attachments.getAttachment('logo', 'logo/image');
			});
		}, (error) => {
			if (error.message == 'missing') {
				return this.attachments.post(document).then((doc) => {
					return this.attachments.getAttachment('logo', 'logo/image');
				});
			} else {
				console.log(error);

			}

		});
	}

	private set() {
		let set = {
			_id: '1',

			raison_social: 'DEMO',

			email: 'demo@gmail.com',

			fax: '0000000',

			telephone: '0000000',

			mobile: '0000000',

			adresse: 'adresse',

			registre_commerce: 'Societé DEMO	',

			fodec: 1,

			retenue_source: 1,

			timbre: 1,

			fb_acc: 'facebook',

			RIB: '123456789',

			last_document_id: '00000',
		} as Settings;
		return this.db.put(set);
	}
}

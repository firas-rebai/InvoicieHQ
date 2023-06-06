
import * as c from 'firebase-config.json'

let config = c

export const environment = {
  firebase: {
    projectId: config.projectId,
    appId: config.appId,
    storageBucket: config.storageBucket,
    locationId: config.locationId,
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    messagingSenderId: config.messagingSenderId,
    measurementId: config.measurementId,
  },
	production: true,

};




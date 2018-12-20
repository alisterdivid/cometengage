import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersproviderProvider {
	firedata = firebase.database().ref('/users');
	firedata1 = firebase.database().ref('/users/interlocutor');
	firedata2 = firebase.database().ref('/addedagents');
	spclMsgProvider = firebase.database().ref('/specialmessage');

	constructor(public http: Http, public local: Storage, public db: AngularFireDatabase) {}
	getUid() {
		return this.local.get('uid');
	}

	/** get all users service **/
	getallusers() {
		var promise = new Promise((resolve, reject) => {
			this.firedata
				.orderByChild('uid')
				.once('value', snapshot => {
					let userdata = snapshot.val();
					let temparr = [];
					for (var key in userdata) {
						temparr.push(userdata[key]);
					}
					resolve(temparr);
				})
				.catch(err => {
					reject(err);
				});
		});
		return promise;
	}
}



// WEBPACK FOOTER //
// ./src/providers/usersprovider/usersprovider.ts
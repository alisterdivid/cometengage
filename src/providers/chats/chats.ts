import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

import { UsersproviderProvider } from '../usersprovider/usersprovider';

@Injectable()
export class ChatsProvider {
	firedata = firebase.database().ref('/chatusers');

	constructor(public db: AngularFireDatabase, public up: UsersproviderProvider) {}

	getChats() {
		return this.up.getUid().then(uid => {
			let chats = this.db.list(`/users/${uid}/chats`);
			return chats;
		});
	}

	addChats(uid, interlocutor) {
		let endpoint = this.db.object(`/users/${uid}/chats/${interlocutor}`);
		endpoint.set(true);
		let endpoint2 = this.db.object(`/users/${interlocutor}/chats/${uid}`);
		endpoint2.set(true);
	}

	getChatRef(uid, interlocutor) {
		let firstRef = this.db.object(`/chats/${uid},${interlocutor}`, { preserveSnapshot: true });
		let promise = new Promise((resolve, reject) => {
			firstRef.subscribe(snapshot => {
				let a = snapshot.exists();
				if (a) {
					resolve(`/chats/${uid},${interlocutor}`);
				} else {
					let secondRef = this.db.object(`/chats/${interlocutor},${uid}`, { preserveSnapshot: true });
					secondRef.subscribe(snapshot => {
						let b = snapshot.exists();
						if (!b) {
							//this.addChats(uid,interlocutor);
						}
					});
					resolve(`/chats/${interlocutor},${uid}`);
				}
			});
		});
		return promise;
	}

	/** to fetch chat from particular room for single agent **/
	getAgentChatRef(interlocutor) {
		let firstRef = this.db.object(`/chats/${interlocutor}`, { preserveSnapshot: true });
		let promise = new Promise((resolve, reject) => {
			firstRef.subscribe(snapshot => {
				let a = snapshot.exists();
				if (a) {
					resolve(`/chats/${interlocutor}`);
				} else {
					let secondRef = this.db.object(`/chats/${interlocutor}`, { preserveSnapshot: true });
					secondRef.subscribe(snapshot => {
						let b = snapshot.exists();
						if (!b) {
							//this.addChats(interlocutor);
						}
					});
					resolve(`/chats/${interlocutor}`);
				}
			});
		});
		return promise;
	}
}



// WEBPACK FOOTER //
// ./src/providers/chats/chats.ts
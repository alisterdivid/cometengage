import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CommondataProvider } from '../../providers/commondata/commondata';

@Injectable()
export class MessagingServiceProvider {
	messaging = firebase.messaging();
	currentMessage = new BehaviorSubject(null);
	permission;
	appUrl: any;
	constructor(public http: Http, public db: AngularFireDatabase, public commondata: CommondataProvider, public afAuth: AngularFireAuth) {
		this.appUrl = commondata.appUrl;
	}

	getPermission() {
		this.messaging
			.requestPermission()
			.then(() => {
				// console.log('Notification permission granted.');
				return this.messaging.getToken();
			})
			.then(token => {
				// console.log('token => '+token);
				localStorage.setItem('FCMToken', token);
			})
			.catch(err => {
				// console.log('Unable to get permission to notify.', err);
			});
	}

	/** Invoke when user receives message through notification **/
	receiveMessage() {
		let appUrl = this.appUrl;
		this.messaging.onMessage(payload => {
			//console.log("Message received. ", payload);
			if (localStorage.currentNotiPage == 'MychatPage') {
				let soundRef = firebase.database().ref(`/notifysounds/${localStorage.getItem('firebaseuid')}`);
				soundRef.once('value', data => {
					let item = data.val();
					if (item != null) {
						for (let key in item) {
							let audio = new Audio(`${appUrl}assets/sounds/${item[key].sound}`);
							// audio.volume=0.1;
							item[key].loudSound ? '(audio.volume=1)' : '(audio.volume=0.2)';
							audio.play();
						}
					} else {
						let audio = new Audio(`${appUrl}assets/sounds/default.mp3`);
						audio.play();
					}
				});
			} else if (localStorage.currentNotiPage == 'MyqueuePage') {
				this.notifyMe(payload.notification.body);
				let soundRef = firebase.database().ref(`/notifysounds/${localStorage.getItem('firebaseuid')}`);
				soundRef.once('value', data => {
					let item = data.val();
					if (item != null) {
						for (let key in item) {
							let audio = new Audio(`${appUrl}assets/sounds/${item[key].sound}`);
							// audio.volume=0.1;
							item[key].loudSound ? '(audio.volume=1)' : '(audio.volume=0.2)';
							audio.play();
						}
					} else {
						let audio = new Audio(`${appUrl}assets/sounds/default.mp3`);
						audio.play();
					}
				});
			} else {
				this.notifyMe(payload.notification.body); //show side notification
				let soundRef = firebase.database().ref(`/notifysounds/${localStorage.getItem('firebaseuid')}`);
				soundRef.once('value', data => {
					let item = data.val();
					if (item != null) {
						for (let key in item) {
							let audio = new Audio(`${appUrl}assets/sounds/${item[key].sound}`);
							item[key].loudSound ? '(audio.volume=1)' : '(audio.volume=0.2)';
							audio.play();
						}
					} else {
						let audio = new Audio(`${appUrl}assets/sounds/default.mp3`);
						audio.play();
					}
				});
			}
			this.currentMessage.next(payload);
		});
	}

	notifyMe(msg) {
		let appUrl = this.appUrl;
		var notification;
		// Let's check if the browser supports notifications
		if (!('Notification' in window)) {
		} else if (this.permission === 'granted') {
			// Let's check whether notification permissions have already been granted
			notification = new Notification('Notification title', {
				icon: appUrl + 'assets/icon/logo.png',
				body: msg
			});
		} else if (this.permission !== 'denied') {
			// Otherwise, we need to ask the user for permission
			Notification.requestPermission(function(permission) {
				// If the user accepts, let's create a notification
				if (permission === 'granted') {
					notification = new Notification('Notification title', {
						icon: appUrl + 'assets/icon/logo.png',
						body: msg
					});
				}
			});
		}
	}
}



// WEBPACK FOOTER //
// ./src/providers/messaging-service/messaging-service.ts
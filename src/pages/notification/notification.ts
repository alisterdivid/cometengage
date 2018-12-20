import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { CommondataProvider } from '../../providers/commondata/commondata';
import { MessagingServiceProvider } from '../../providers/messaging-service/messaging-service';

@IonicPage()
@Component({
	selector: 'page-notification',
	templateUrl: 'notification.html'
})
export class NotificationPage {
	appUrl: any;
	appLogo: string;
	appName: string;
	uid: any;
	permission: any;
	showhide: any;
	audio: any;

	soundURL: string;
	sound: string;
	loudSound: any;
	repeatSound: any;
	defaultSoundData: any = {
		sound: 'default.mp3',
		loudSound: false,
		repeatSound: false
	};
	audioVolume: any = {
		low: 0.2,
		high: 1
	};

	sounds: any = {
		'default.mp3': 'Default',
		'nice-cut.mp3': 'Nice Cut',
		'jingle-bells-sms.mp3': 'Jingle Bell',
		'announcement.mp3': 'Announcement',
		'gets-in-the-way.mp3': 'Gets in the way',
		'short-trip.mp3': 'Short trip to the bottom',
		'thrown.mp3': 'Thrown'
	};
	soundFiles: Array<string> = Object.keys(this.sounds);

	dbnodes: any = {
		notifysounds: '/notifysounds/',
		users: '/users/'
	};
	dbRef: any = {};

	constructor(public msgService: MessagingServiceProvider, public navCtrl: NavController, public navParams: NavParams, public events: Events, public commondata: CommondataProvider, public db: AngularFireDatabase) {
		this.uid = localStorage.getItem('firebaseuid');
		this.appUrl = commondata.appUrl;
		this.soundURL = this.appUrl + 'assets/sounds/';
		this.appLogo = this.appUrl + 'assets/icon/logo.png';
		this.appName = 'CometEngage';
		this.createDBReferences();
		if (!('Notification' in window)) {
			this.permission = false;
			alert('This browser does not support desktop notification');
		} else {
			this.permission = Notification['permission'] == 'granted';
		}

		this.updateSoundData();
		//this.setEnableNotification('enter');
	}

	/** IonView Events Start */

	ionViewWillEnter() {
		this.events.publish('user:checksession');
	}

	ionViewDidEnter() {
		localStorage.currentNotiPage = 'NotificationPage';
	}

	ionViewWillLeave() {
		localStorage.currentNotiPage = '';
	}

	/** IonView Events End */

	createDBReferences() {
		for (let dbnode in this.dbnodes) {
			this.dbRef[dbnode] = firebase.database().ref(this.dbnodes[dbnode] + this.uid);
		}
		console.log(this.dbRef);
	}

	chatbutton() {
		this.events.publish('user:chat');
	}

	sendNotification() {
		let notification = this.notification;
		let setPermission = this.setPermission;
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		} else if (Notification['permission'] === 'granted') {
			notification();
		} else if (Notification['permission'] !== 'denied') {
			Notification.requestPermission(function(permission) {
				if (permission === 'granted') {
					setPermission(true);
					notification();
				}
			});
		}
	}

	notification() {
		let sound = this.soundURL + this.sound;
		let loudSound = this.loudSound;
		let appLogo = this.appLogo;
		let appName = this.appName;
		let audio = this.audio;
		audio = new Audio(sound);
		loudSound ? (audio.volume = 1) : (audio.volume = 0.2);
		audio.play();
		new Notification(appName, { icon: appLogo, body: 'Hey there! This is a test notification by ' + appName + '!' });
	}

	setPermission(granted) {
		this.permission = granted;
		console.log('setPermission granted', granted);
	}

	testNotification() {
		let soundUrl = this.soundURL;
		let appLogo = this.appLogo;
		let appName = this.appName;
		let audio = this.audio;
		let sounddata = this.defaultSoundData;
		let sounddataRef = this.dbRef.notifysounds;
		if (this.permission) {
			/**Notify sound */
			sounddataRef.once('value', data => {
				let itemVal = data.val();
				if (itemVal != null) {
					audio = new Audio(soundUrl + (itemVal.sound || sounddata.sound));
					itemVal.loudSound ? (audio.volume = 1) : (audio.volume = 0.2);
					audio.play();
				}
			});
			new Notification(appName, {
				icon: appLogo,
				body: 'Hey there! This is a test notification by ' + appName + '!'
			});
		} else {
		}
	}

	setVolume(loudSound) {
		let audio = this.audio;
		audio = new Audio(this.soundURL + this.sound);
		audio.volume = this.audioVolume.low;
		if (loudSound) {
			audio.volume = this.audioVolume.high;
		}
		audio.play();
		this.updateSoundData(null, loudSound, null);
	}

	setSound(sound) {
		let audio = this.audio;
		audio = new Audio(this.soundURL + sound);
		audio.volume = this.audioVolume.low;
		if (this.loudSound) {
			audio.volume = this.audioVolume.high;
		}
		audio.play();
		this.updateSoundData(sound, null, null);
	}

	updateSoundData(sound = null, loudSound = null, repeatSound = null) {
		let sounddataRef = this.dbRef.notifysounds;
		let params = {
			sound: sound,
			loudSound: loudSound,
			repeatSound: repeatSound
		};
		sounddataRef.once('value', item => {
			let sounddata = {};
			let dataMethod = 'set';
			let itemVal = item.val();
			if (itemVal != null) {
				dataMethod = 'update';
				for (let property in params) {
					if ((sounddata[property] = params[property]) == null) {
						sounddata[property] = itemVal[property] || this.defaultSoundData[property];
					}
				}
			} else {
				for (let property in params) {
					if ((sounddata[property] = params[property]) == null) {
						sounddata[property] = this.defaultSoundData[property];
					}
				}
			}
			sounddataRef[dataMethod](sounddata).then(() => {
				for (let property in sounddata) {
					this[property] = sounddata[property];
				}
			});
		});
	}

	/** Enable notification function call from html click button and when entered in page constructor  */
	setEnableNotification(type) {
		let usersRef = this.dbRef.users;
		console.log('setEnableNotification ', type);
		usersRef
			.once('value', item => {
				let itemVal = item.val();
				console.log('got value', itemVal);
				if (itemVal != null) {
					if (itemVal.FCMToken != undefined) {
						if (itemVal.FCMToken != 'null') {
							this.showhide = false;
						} else {
							if (type == 'press') {
							} else {
								this.showhide = true;
							}
						}
					} else {
						if (type == 'press') {
						} else {
							this.showhide = true;
						}
					}
				}
			})
			.then(() => {
				console.log('then 1');
				if (type == 'press') {
					let messaging = firebase.messaging();
					messaging.useServiceWorker(window['CE_ServiceWorkerRegistration']);
					messaging.requestPermission().then(() => {
						console.log('then 2');
						messaging
							.getToken()
							.then(token => {
								console.log('then 3');
								localStorage.setItem('FCMToken', token);
								this.showhide = false;
								usersRef.update({ FCMToken: token });
								console.log('FB requestpermission', token);
								window.location.reload();
							})
							.catch(err => {});
					});
				}
			});
	}
}



// WEBPACK FOOTER //
// ./src/pages/notification/notification.ts
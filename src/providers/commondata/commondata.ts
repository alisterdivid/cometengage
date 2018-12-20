import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Events, ModalController, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Injectable()
export class CommondataProvider {
	/** Declare variables **/
	userid: any = localStorage.getItem('chatfirstid') || 0;
	usertoken: any = localStorage.getItem('chatfirsttoken') || '';
	useremail: any = localStorage.getItem('chatfirstEmail') || '';
	userimage: any = localStorage.getItem('chatfirstImage') || '';
	usertype: any = localStorage.getItem('chatfirsttype') || '';
	username: any = localStorage.getItem('chatfirstName') || '';
	userstatus: any;
	userdevice: any;
	plan: any = 'free';
	profile = {};
	fbconfig = {
		apiKey: 'AIzaSyCI4q4Tjh9BPWRTkqxLKs1mrFrKggssOgo',
		authDomain: 'cometengage.firebaseapp.com',
		databaseURL: 'https://cometengage.firebaseio.com',
		projectId: 'cometengage',
		storageBucket: 'cometengage.appspot.com',
		messagingSenderId: '316966730584'
	};

	apiUrl = 'https://api.cometengage.com/api/';
	appUrl = 'https://app.cometengage.com/';

	constructor(public http: Http, public events: Events, public modalCtrl: ModalController, public alertCtrl: AlertController) {
		/** user session service **/
		/*events.subscribe('user:chat', () => {
			this.startchat()
		});*/
		this.userid = localStorage.getItem('chatfirstid') || 0;
		this.usertoken = localStorage.getItem('chatfirsttoken') || '';
		this.useremail = localStorage.getItem('chatfirstEmail') || '';
		this.userimage = localStorage.getItem('chatfirstImage') || '';
		this.usertype = localStorage.getItem('chatfirsttype') || '';
		this.username = localStorage.getItem('chatfirstName') || '';
		if (window.location.host == 'app.chatforyoursite.com') {
			this.apiUrl = 'https://api.chatforyoursite.com/api/';
			this.appUrl = 'https://app.chatforyoursite.com/';
			this.fbconfig = {
				apiKey: 'AIzaSyBTFld93SKOZoQZXkjdc_OMyImlTH9NPhY',
				authDomain: 'ccapp-00004.firebaseapp.com',
				databaseURL: 'https://ccapp-00004.firebaseio.com',
				projectId: 'ccapp-00004',
				storageBucket: 'ccapp-00004.appspot.com',
				messagingSenderId: '702094498151'
			};
		}
	}

	/*startchat(){
			let modal = this.modalCtrl.create(ModalPage, { enableBackdropDismiss: true });
			modal.present();
	}*/
	/** check user session service **/
}



// WEBPACK FOOTER //
// ./src/providers/commondata/commondata.ts
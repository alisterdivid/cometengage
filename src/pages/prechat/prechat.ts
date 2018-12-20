import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { CommondataProvider } from '../../providers/commondata/commondata';

@IonicPage()
@Component({
	selector: 'page-prechat',
	templateUrl: 'prechat.html'
})
export class PrechatPage {
	/** Define variables **/
	disableemail = true;
	disablenumber = true;
	data: any;
	namerequire = false;
	emailcheck = false;
	emailrequire = false;
	phonecheck = false;
	phonerequire = false;
	onlinecheck = false;
	prechatcheck = false;
	errdata: any;
	Adminid: any;
	apiUrl: any;
	/** as page loaded constructor called **/
	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public commondata: CommondataProvider, public http: Http, public events: Events) {
		this.apiUrl = commondata.apiUrl;
	}

	ionViewDidLoad() {
		localStorage.setItem('emailrequirecheck', 'false');
		if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
			this.events.publish('user:checksession');
		}
		this.getprechat();
		this.Adminid = localStorage.getItem('companyid');
	}
	/** hit backend API to get prechat info **/
	getprechat() {
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
			let body = JSON.stringify({
				userId: localStorage.getItem('chatfirstid')
			});
			this.http.post(this.apiUrl + 'prechat-info', body, { headers: headers }).subscribe(
				res => {
					this.data = res.json();
					console.log(this.data);
					if (this.data.data.nameRequired == '1' || this.data.data.nameRequired == true) {
						this.namerequire = true;
					}
					if (this.data.data.email == '1' || this.data.data.email == true) {
						this.emailcheck = true;
						this.disableemail = false;
					}
					if (this.data.data.emailRequired == '1' || this.data.data.emailRequired == true) {
						this.emailrequire = true;
						localStorage.setItem('emailrequirecheck', this.data.data.emailRequired);
					} else {
						localStorage.setItem('emailrequirecheck', 'false');
					}
					if (this.data.data.phone == '1' || this.data.data.phone == true) {
						this.phonecheck = true;
						this.disablenumber = false;
					}
					if (this.data.data.phoneRequired == '1' || this.data.data.phoneRequired == true) {
						this.phonerequire = true;

						localStorage.setItem('phonerequirecheck', this.data.data.phoneRequired);
					} else {
						localStorage.setItem('phonerequirecheck', 'false');
					}
					if (this.data.data.formAutoFillRequest == '1' || this.data.data.formAutoFillRequest == true) {
						this.onlinecheck = true;
					}
					if (this.data.data.formEnable == '1' || this.data.data.formEnable == true) {
						this.prechatcheck = true;
					}
					resolve(res.json());
				},
				err => {
					this.errdata = err.json();
					if (this.errdata.error == 'token_invalid') {
						this.events.publish('user:checksession');
					}
				}
			);
		});
	}

	/** enable disable email field **/
	emailvalue(val) {
		if (val == true) {
			this.disableemail = false;
		} else {
			this.disableemail = true;
			this.emailrequire = false;
		}
	}

	/** enable disable number field **/
	numbervalue(val) {
		if (val == true) {
			this.disablenumber = false;
		} else {
			this.disablenumber = true;
			this.phonerequire = false;
		}
	}
	/** click on save button of prechat **/
	saveform() {
		/** start the loader  **/
		let loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loader.present();
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
			let body = JSON.stringify({
				userId: localStorage.getItem('chatfirstid'),
				name: 1,
				nameRequired: this.namerequire,
				email: this.emailcheck,
				emailRequired: this.emailrequire,
				phone: this.phonecheck,
				phoneRequired: this.phonerequire,
				formAutoFillRequest: this.onlinecheck,
				formEnable: this.prechatcheck,
				firebaseId: this.Adminid
			});
			/** send data to backend to save prechat info for taht admin or agent **/
			this.http.post(this.apiUrl + 'setup-prechat', body, { headers: headers }).subscribe(
				res => {
					this.data = res.json();
					loader.dismiss();
					loader = null;
					this.getprechat();
					resolve(res.json());
				},
				err => {
					loader.dismiss();
					loader = null;
					this.errdata = err.json();
					if (this.errdata.error == 'token_invalid') {
						this.events.publish('user:checksession');
					}
				}
			);
		});
	}

	chatbutton() {
		this.events.publish('user:chat');
	}
	/** click on cancel button of prechat page **/
	cancelform() {
		this.navCtrl.push('MyqueuePage');
	}
}



// WEBPACK FOOTER //
// ./src/pages/prechat/prechat.ts
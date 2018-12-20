import { Component, ElementRef, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Push, PushToken } from '@ionic/cloud-angular';

import { FCM } from '@ionic-native/fcm';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

import { AlertController, App, Content, Events, LoadingController, MenuController, Nav, Platform } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

import { CommondataProvider } from '../providers/commondata/commondata';
import { MessagingServiceProvider } from '../providers/messaging-service/messaging-service';

@Component({
	templateUrl: 'app.html'
})
export class CometEngage {
	@ViewChild(Content) content: Content;
	@ViewChild(Nav) nav: Nav;

	/** declare all variables **/
	showprofileimage: any;
	showtypes: any;
	accessToVisitorsTab: boolean = false;
	rootPage: any = 'LoginPage';
	status = 'Online';
	setstatus = 'status-select online-status';
	profilestatus = 'online';
	phone: any;
	selectOptions: any;
	errdata: any;
	selected: any;
	statusCounter: any;
	Adminid: any;
	imagesrc: any;
	message: any;
	isDevice: any;
	permission: any;
	menus = {
		Account: '',
		Agent: '',
		Allchat: '',
		Custombutton: '',
		Group: '',
		Login: '',
		Myqueue: 'active',
		Notification: '',
		Prechat: '',
		Visitors: ''
	};
	apiUrl: any;
	plan: any;
	isLoggedIn: any;

	/** inject all services to constructor **/
	constructor(public msgService: MessagingServiceProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, public alertCtrl: AlertController, public app: App, public http: Http, public loadingCtrl: LoadingController, public commondata: CommondataProvider, public push: Push, public element: ElementRef, public events: Events, public af: AngularFireAuth, public local: Storage, public fcm: FCM, public db: AngularFireDatabase) {
		this.apiUrl = commondata.apiUrl;
		this.Adminid = localStorage.getItem('companyid');
		/** Events */
		events.subscribe('user:login', user => {
			console.log('Event user:login', user);
			if (user) {
				if (user.hasOwnProperty('plan')) {
					if (user.userId == '18') {
						user.plan = 'PRO';
					}
					this.plan = user.plan;
					localStorage.setItem('plan', user.plan);
					this.commondata.plan = user.plan;
				}
				this.setimage();
				let userStatus = firebase.database().ref(`/users/${localStorage.getItem('firebaseuid')}/`);
				userStatus.once('value', item => {
					if (item.val() != null) {
						if (item.val().isOnline) {
							this.status = 'Online';
						} else {
							this.status = 'Offline';
						}
					}
				});
			} else {
				this.setActiveMenu('Login');
			}
		});
		events.subscribe('user:sessionexpired', data => {
			console.log('Event user:sessionexpired', data);
			this.sessionexpired();
		});
		events.subscribe('user:checksession', data => {
			console.log('Event user:checksession', data);
			this.checksession();
		});
		events.subscribe('user:logout', data => {
			console.log('Event user:logout', data);
			this.logoutSuccess();
		});

		/**** Web Push Notify */
		platform.ready().then(() => {
			Keyboard.hideKeyboardAccessoryBar(false);
			this.events.publish('user:login');
			let loggedinId = localStorage.getItem('chatfirstid');

			if (loggedinId && loggedinId != '0' && loggedinId != 'null' && loggedinId != 'undefined') {
				this.rootPage = localStorage.getItem('prevPage') || 'MyqueuePage';

				if (this.platform.is('cordova')) this.isDevice = true;
				if (this.isDevice) {
					fcm.onNotification().subscribe(data => {
						if (data.wasTapped) {
							//console.log("Received in background");
						} else {
						}
					});
				} else {
					this.msgService.receiveMessage();
					this.message = this.msgService.currentMessage;
				}
				if (localStorage.getItem('chatfirsttype') == '2') {
					this.showtypes = true;
				} else {
					this.showtypes = false;
				}
				if (this.commondata.userstatus == undefined || this.commondata.userstatus == null) {
					this.commondata.userstatus = 'online';
				} else {
					this.commondata.userstatus = 'offline';
				}
				this.plan = 'trial';
				if (localStorage.getItem('plan') == 'PRO') {
					this.plan = 'PRO';
				} else if (localStorage.getItem('plan') == 'trial') {
					this.plan = 'trial';
				}

				if (localStorage.getItem('hatfirstEmail') == 'demo@demo.com') {
					this.plan = 'PRO';
				}

				this.commondata.plan = this.plan;
				localStorage.setItem('plan', this.plan);
			}
			if (this.platform.is('ios') || this.platform.is('android')) {
				this.phone = true;
				this.commondata.userdevice = false;
				this.commondata.usertoken = localStorage.getItem('chatfirsttoken');
			} else {
				this.phone = false;
				this.commondata.userdevice = true;
				let browser;
				if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
					browser = 'Chrome';
				} else if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
					browser = 'Safari';
				} else if (navigator.userAgent.search('Firefox')) {
					browser = 'Firefox';
				}
				if (localStorage.getItem('browserworking') == undefined) {
					localStorage.setItem('browserworking', browser);
				} else if (localStorage.getItem('browserworking') != browser) {
					this.commondata.usertoken = '';
				} else {
					this.commondata.usertoken = localStorage.getItem('chatfirsttoken');
				}
			}

			/** check logged in device is web or mobile **/

			statusBar.styleDefault();
			splashScreen.hide();
		});

		/** check user status online or offline as logged in , show in side menu green or dull light **/

		/** add css class  **/
		this.selectOptions = {
			cssClass: 'online-offline'
		};
	}
	/** navigate user to logout page **/
	logoutuser() {
		this.logoutSuccess();
	}

	setimage() {
		var image = this.element.nativeElement.querySelector('.profileimg');
		if (image) {
			this.imagesrc = localStorage.getItem('imagetosend') || 'assets/icon/user_img.png';
			this.content.scrollToTop();
			if (localStorage.getItem('chatfirsttype') == '2') {
				this.showtypes = true;
			} else {
				this.showtypes = false;
			}
			image.src = this.imagesrc;
		}
	}

	registerPush() {
		this.push
			.register()
			.then((t: PushToken) => {
				//console.log('Generated Token' + JSON.stringify(t));
				return this.push.saveToken(t);
			})
			.then((t: PushToken) => {
				//console.log('Token Saved', t);
			});
		this.push.rx.notification().subscribe(msg => {
			//console.log('Received notification: ' + msg);
		});
	}
	/** As user select side menu dropdown for online offline **/
	onChange() {
		let currentUserRef = this.db.object(`/users/${localStorage.getItem('firebaseuid')}`);
		if (this.status == 'Online') {
			this.setstatus = 'status-select online-status';
			this.profilestatus = 'online';
			this.commondata.userstatus = 'online';
			this.statusCounter = 1;
			currentUserRef.update({ isOnline: true });
		} else if (this.status == 'Offline') {
			this.setstatus = 'status-select offline-status';
			this.profilestatus = 'offline';
			this.commondata.userstatus = 'offline';
			this.statusCounter = 0;
			currentUserRef.update({ isOnline: false });
		} else {
			this.setstatus = 'status-select invisible-status';
			this.profilestatus = 'invisible';
			this.commondata.userstatus = 'invisible';
		}
		/** publish user status **/
		this.events.publish('user:status');
		let loginId = localStorage.getItem('companyid');
		let dbRef = firebase.database().ref(`/supportOnline/${loginId}/`);
		dbRef.set({ status: this.statusCounter });
	}

	/*** all menu navigation methods ***/

	setActiveMenu(activemenu, setRootPage = false) {
		for (let menu in this.menus) {
			this.menus[menu] = '';
			if (menu == activemenu) {
				this.menus[menu] = 'active';
			}
		}
		this.menuCtrl.close();
		if (setRootPage) {
			this.rootPage = activemenu + 'Page';
		} else {
			this.nav.setRoot(activemenu + 'Page');
		}
	}

	/** menu logout **/
	logout() {
		this.menuCtrl.close();
		let confirm = this.alertCtrl.create({
			title: 'Sign Out',
			cssClass: 'logout',
			message: 'Are you sure, you want to sign out?',
			buttons: [
				{
					text: 'CANCEL',
					handler: () => {
						// console.log('Disagree clicked');
					}
				},
				{
					text: 'OK',
					cssClass: 'ok-popup',
					handler: () => {
						let loader = this.loadingCtrl.create({
							content: 'Please wait...',
							dismissOnPageChange: true
						});
						loader.present();
						let headers = new Headers();
						let body = JSON.stringify({
							userId: localStorage.getItem('chatfirstid')
						});
						headers.append('Content-Type', 'application/json');
						headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
						this.http
							.post(this.apiUrl + 'logout', body, {
								headers: headers
							})
							.subscribe(
								res => {
									loader.dismiss();
									this.logoutSuccess();
								},
								err => {
									loader.dismiss();
									this.logoutSuccess();
								}
							);
					}
				}
			]
		});
		confirm.present();
	}

	checksession() {
		if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
			this.events.publish('user:sessionexpired');
		}
	}

	sessionexpired() {
		let confirm = this.alertCtrl.create({
			title: 'Session expired',
			cssClass: 'logout',
			message: 'Your session expired, please login to continue.',
			buttons: [
				{
					text: 'OK',
					cssClass: 'ok-popup',
					handler: () => {
						this.events.publish('user:logout');
					}
				}
			]
		});
		confirm.present();
	}

	logoutSuccess() {
		this.fcm.unsubscribeFromTopic(localStorage.getItem('companyid'));
		let currentUserRef = this.db.object(`/users/${localStorage.getItem('firebaseuid')}`);
		currentUserRef.update({ FCMToken: null, isOnline: false });

		this.local.remove('uid');
		this.af.auth.signOut();

		localStorage.clear();

		this.setActiveMenu('Login');
	}
}



// WEBPACK FOOTER //
// ./src/app/app.component.ts
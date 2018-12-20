import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';

import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { IonicPage, Platform, NavController, MenuController, LoadingController, Events } from 'ionic-angular';

import { CommondataProvider } from '../../providers/commondata/commondata';
import { MessagingServiceProvider } from '../../providers/messaging-service/messaging-service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	submitAttempt = false;
	loginerror = false;
	validEmailCheck: any;
	validPasswordCheck: any;
	public email: any;
	public password: any;
	data: any;
	myForm: FormGroup;
	apiUrl: any;
	/** As load page **/
	constructor(public msgService: MessagingServiceProvider, public platform: Platform, public navCtrl: NavController, public menuCtrl: MenuController, public http: Http, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public commondata: CommondataProvider, public events: Events, public af: AngularFireAuth, public db: AngularFireDatabase, public storage: Storage, public fcm: FCM) {
		this.apiUrl = commondata.apiUrl;
		/** login form validations **/
		this.myForm = formBuilder.group({
			email: ['', Validators.compose([Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), Validators.required])],
			password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required])]
		});
		/** check users platform **/
		if (this.platform.is('ios') || this.platform.is('android')) {
			fcm.getToken().then(token => {
				if (token != null) localStorage.setItem('FCMToken', token);
				else this.checkToken();
			});
		} else {
			//this.msgService.getPermission();
		}
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}
	ionViewWillLeave() {
		// to enable menu.
		this.menuCtrl.enable(true);
	}

	/** store FCM token **/
	checkToken() {
		this.fcm.getToken().then(token => {
			if (token != null) localStorage.setItem('FCMToken', token);
			else this.checkToken();
		});
	}
	/** sign in functionality **/
	isDemo(event) {
		if (event.target.value == 'demo@demo.com') {
			localStorage.setItem('plan', 'PRO');
		} else {
			localStorage.removeItem('plan');
		}
	}
	signin() {
		this.submitAttempt = true;
		this.loginerror = false;
		if (!this.myForm.valid) {
			//
		} else {
			this.submitAttempt = false;
			return new Promise((resolve, reject) => {
				let loader = this.loadingCtrl.create({
					content: 'Please wait...',
					dismissOnPageChange: true
				});
				loader.present();
				/** check email validation  **/
				this.validEmailCheck = this.email;
				this.validPasswordCheck = this.password;
				/*****  Login Api *****/
				let headers = new Headers();
				let body = JSON.stringify({
					email: this.email,
					password: this.password
				});
				headers.append('Content-Type', 'application/json');
				this.http
					.post(this.apiUrl + 'login', body, {
						headers: headers
					})
					.subscribe(
						res => {
							/** If success */
							this.data = res.json();
							this.loginerror = false;
							localStorage.setItem('chatfirsttype', this.data.data.userType);
							localStorage.setItem('plan', this.data.data.plan);
							this.commondata.userid = this.data.data.userId;
							this.commondata.usertoken = this.data.data.token;
							this.commondata.useremail = this.data.data.email;
							this.commondata.usertype = this.data.data.userType;
							this.commondata.plan = this.data.data.plan;
							let tempPwd;
							if (this.data.data.password) {
								tempPwd = atob(this.data.data.password);
								tempPwd = tempPwd.slice(4);
							} else {
								tempPwd = this.password;
							}
							localStorage.setItem('isLoggedIn', '1');
							localStorage.setItem('chatfirsttoken', this.data.data.token);
							localStorage.setItem('chatfirstid', this.data.data.userId);
							localStorage.setItem('chatfirstEmail', this.data.data.email);

							/** Google O Auth Sign In  **/
							this.af.auth.signInWithEmailAndPassword(this.email, tempPwd).then(
								data => {
									localStorage.setItem('firebaseuid', data.uid);
									let currentUserRef = this.db.object(`/users/${data.uid}`);
									currentUserRef.set({
										email: this.email,
										FCMToken: localStorage.getItem('FCMToken'),
										id: localStorage.getItem('chatfirstid'),
										userType: localStorage.chatfirsttype,
										isOnline: true
									});
									this.storage.set('uid', data.uid);
									localStorage.setItem('companyid', data.uid);
									this.fcm.subscribeToTopic(localStorage.getItem('companyid'));
									loader.dismiss();
									resolve(res.json());
									this.navCtrl.push('MyqueuePage');
								},
								error => {
									/*** Sign Up user to firebase if not already logged in  ***/
									if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
										this.af.auth.createUserWithEmailAndPassword(this.email, this.password).then(
											data => {
												localStorage.setItem('firebaseuid', data.uid);
												this.storage.set('uid', data.uid);
												localStorage.setItem('companyid', data.uid);
												let currentUserRef = this.db.object(`/users/${data.uid}`);
												currentUserRef.set({
													email: this.email,
													FCMToken: localStorage.getItem('FCMToken'),
													id: localStorage.getItem('chatfirstid'),
													userType: localStorage.chatfirsttype,
													isOnline: true
												});
												resolve(res.json());
												loader.dismiss();
												this.navCtrl.push('MyqueuePage');
											},
											error => {
												console.log('Error  :: ' + JSON.stringify(error));
												loader.dismiss();
											}
										);
									}
								}
							);
						},
						err => {
							loader.dismiss();
							if (err.status == '401') {
								this.loginerror = true;
							}
						}
					);
			}).then(() => {
				/** after successfully login **/
				let headers1 = new Headers();
				headers1.append('Content-Type', 'application/json');
				headers1.append('Authorization', 'Bearer ' + this.commondata.usertoken);
				let body1 = JSON.stringify({
					userId: this.commondata.userid,
					userType: this.commondata.usertype
				});
				/** get user profile api **/
				this.http
					.post(this.apiUrl + 'get-user-profile', body1, {
						headers: headers1
					})
					.subscribe(
						res => {
							this.data = res.json();
							this.commondata.profile = this.data.data.profile;
							this.commondata.plan = this.data.data.plan;
							this.commondata.username = this.data.data.profile.name;
							this.commondata.userimage = this.data.data.profile.profilePicture;
							localStorage.setItem('plan', this.data.data.plan);
							localStorage.setItem('chatfirstName', this.data.data.profile.name);
							localStorage.setItem('chatfirstImage', this.data.data.email);
							localStorage.setItem('imagetosend', this.data.data.profile.profilePicture);
							this.events.publish('user:login', this.data.data.profile);
						},
						err => {
							console.log(JSON.stringify(err));
						}
					);
			});
		}
	}
	/** click on forgot password **/
	forgot() {
		this.navCtrl.push('ForgotPage');
	}
	/** click on signup **/
	signup() {
		this.navCtrl.push('SignupPage');
	}
}



// WEBPACK FOOTER //
// ./src/pages/login/login.ts
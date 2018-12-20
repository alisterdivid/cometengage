import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';

import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { IonicPage, NavController, MenuController, Content, LoadingController, Platform, Events, AlertController } from 'ionic-angular';

import { CommondataProvider } from '../../providers/commondata/commondata';

@IonicPage()
@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage {
	@ViewChild(Content) content: Content;

	/***** Define Variables  *******/

	name: any;
	title: any;
	fullNameErr = false;
	fullNameErrMsg = '';
	titleErr = false;
	titleErrMsg = '';
	data: any;
	timeData: any;
	timezonedata = [];
	selectBoxValue: any;
	validEmailCheck: any;
	timeArr = [];
	timearr24format = [];
	timeArrlower = [];
	allDaysArr = [];
	allFormatArr = [];
	indexFormat = 0;
	checkBoxValue = undefined;
	serverData: any;
	showRangeBool: any;
	format24: any;
	time24formatlower = [];
	notistatus: any;
	newemail: '';
	showhide = false;
	submitAttempt = false;
	emailexist = false;
	errdata: any;
	emailid: any;
	notifctnchck: any;
	phone: any;
	public photos: any;
	public base64Image: string;
	public abc = { imageData: 'assets/icon/add_icon.png' };
	filename: any;
	filesize: any;
	showsize: any;
	imagephone: any;
	imagesend: any;
	showRange: any;
	apiUrl: any;
	disableOperatingHours: boolean = true;
	days: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday', 'Sunday'];

	editagentForm = new FormGroup({
		firstName: new FormControl()
	});
	editemailForm = new FormGroup({
		email: new FormControl()
	});
	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public formBuilder: FormBuilder, public http: Http, public commondata: CommondataProvider, public loadingCtrl: LoadingController, public platform: Platform, public element: ElementRef, private actionSheet: ActionSheet, private camera: Camera, public events: Events, public alertCtrl: AlertController) {
		this.apiUrl = commondata.apiUrl;

		/******** Form Validation *********/
		this.editemailForm = formBuilder.group({
			email: ['', Validators.compose([Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), Validators.required])]
		});
	}

	/**** When first page Loads  this method invokes automatically ****/
	ionViewWillEnter() {
		if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
			/******* Maintaining User Session ******/
			this.events.publish('user:checksession');
		}
		/******** Generating Range Slider For Notifications *********/

		this.notistatus = true;
		var componentRef = this;
		componentRef.getprofile();
		if (this.platform.is('mobileweb')) {
			this.phone = false;
		} else if (this.platform.is('ios') || this.platform.is('android')) {
			this.phone = true;
		} else {
			this.phone = false;
		}
		var image = this.element.nativeElement.querySelector('.accountimage');
		var imagesplit = image.src.split(/[/]+/).pop();
		if (imagesplit == 'user_img.png') {
			this.showsize = false;
		} else {
			this.showsize = true;
		}
		this.selectBoxValue = '(UTC-12:00) International Date Line West';
		this.menuCtrl.enable(true);
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');

			/****Setting timezone which is already saved****/
			this.http.get(this.apiUrl + 'timezone', { headers: headers }).subscribe(
				res => {
					this.timeData = res.json();
					this.timezonedata = this.timeData.timezoneList;
					resolve(res.json());
				},
				err => {
					this.errdata = err.json();
					console.log('err' + JSON.stringify(err));
					if (this.errdata.error == 'token_invalid') {
						this.events.publish('user:checksession');
					}
				}
			);
		});
	}

	/**** Function to change range from Range slider ******/
	changeRange(i: any, type: string) {
		/** FIXME */
		if (this.disableOperatingHours) {
			return;
		}
		let accountData = this.data.data.operation_hours;
		let formatTime = this.allFormatArr[this.indexFormat];
		console.log('In change Range for i');

		/**** changeRange method called by multiple for this take parameter -enter called when enter to page  ****/
		if (type == 'enter') {
			console.log('If Enter');

			for (let i = 0; i < this.allDaysArr.length; i++) {
				for (let key in accountData) {
					if (accountData.hasOwnProperty(key)) {
						console.log('If got key');
						if (key == this.allDaysArr[i].servKey) {
							console.log('If got key match');
							if (accountData[key] == '') {
								console.log('If got empty key val');
								this.allDaysArr[i].isChkbox = false;
								this.allDaysArr[i].className = 'sum-range account-range';
								if (this.checkBoxValue) {
									console.log('If got checkBoxValue');
									this.allDaysArr[i].lowerTime = '09:00';
									this.allDaysArr[i].upperTime = '18:00';
									this.allDaysArr[i].rangeModel = { lower: formatTime.indexOf(this.allDaysArr[i].lowerTime) * 30, upper: formatTime.indexOf(this.allDaysArr[i].upperTime) * 30 };
								} else {
									console.log('If not checkBoxValue');
									this.allDaysArr[i].lowerTime = '09:00 AM';
									this.allDaysArr[i].upperTime = '06:00 PM';
									this.allDaysArr[i].rangeModel = { lower: formatTime.indexOf(this.allDaysArr[i].lowerTime) * 30, upper: formatTime.indexOf(this.allDaysArr[i].upperTime) * 30 };
								}
							} else {
								console.log('If not empty key val');
								this.allDaysArr[i].isChkbox = true;
								this.allDaysArr[i].className = 'cus-range account-range';
								this.allDaysArr[i].lowerTime = accountData[key].split('-')[0];
								this.allDaysArr[i].upperTime = accountData[key].split('-')[1];
								this.allDaysArr[i].rangeModel = { lower: formatTime.indexOf(this.allDaysArr[i].lowerTime) * 30, upper: formatTime.lastIndexOf(this.allDaysArr[i].upperTime) * 30 };
							}
						} else {
							console.log('If not key match');
						}
					} else {
						console.log('If not key');
					}
				}
			}
		} else {
			console.log('else enter');

			this.allDaysArr[i].lowerTime = formatTime[this.allDaysArr[i].rangeModel.lower / 30];
			this.allDaysArr[i].upperTime = formatTime[this.allDaysArr[i].rangeModel.upper / 30];
		}
		this.showRangeBool = true;
	}

	/**** Save all detail in Account page ****/
	saveDetail() {
		if (this.name == undefined || this.name == '') {
			this.fullNameErr = true;
			this.fullNameErrMsg = 'Please enter name.';
			this.content.scrollToTop();
		} else if (this.name.length < 2 || this.name.length > 30) {
			this.fullNameErrMsg = 'Name should be between 2 to 30 characters.';
			this.fullNameErr = true;
			this.content.scrollToTop();
		} else {
			this.fullNameErr = false;
			let loader = this.loadingCtrl.create({
				content: 'Please wait...',
				dismissOnPageChange: true
			});
			loader.present();
			return new Promise((resolve, reject) => {
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
				if (localStorage.getItem('imagetosend') == null || localStorage.getItem('imagetosend') == undefined || localStorage.getItem('imagetosend') == '') {
					this.imagesend = 'assets/icon/user_img.png';
				} else {
					this.imagesend = localStorage.getItem('imagetosend');
				}
				let body = JSON.stringify({
					userId: localStorage.getItem('chatfirstid'),
					name: this.name,
					profilePicture: this.imagesend,
					title: this.title,
					timezone: this.selectBoxValue,
					/** FIXME */
					/* monday: this.allDaysArr[0].className == 'cus-range account-range' ? this.allDaysArr[0].lowerTime + '-' + this.allDaysArr[0].upperTime : '',
					tuesday: this.allDaysArr[1].className == 'cus-range account-range' ? this.allDaysArr[1].lowerTime + '-' + this.allDaysArr[1].upperTime : '',
					wednesday: this.allDaysArr[2].className == 'cus-range account-range' ? this.allDaysArr[2].lowerTime + '-' + this.allDaysArr[2].upperTime : '',
					thursday: this.allDaysArr[3].className == 'cus-range account-range' ? this.allDaysArr[3].lowerTime + '-' + this.allDaysArr[3].upperTime : '',
					friday: this.allDaysArr[4].className == 'cus-range account-range' ? this.allDaysArr[4].lowerTime + '-' + this.allDaysArr[4].upperTime : '',
					saturday: this.allDaysArr[5].className == 'cus-range account-range' ? this.allDaysArr[5].lowerTime + '-' + this.allDaysArr[5].upperTime : '',
					sunday: this.allDaysArr[6].className == 'cus-range account-range' ? this.allDaysArr[6].lowerTime + '-' + this.allDaysArr[6].upperTime : '', */
					notification_status: this.notistatus ? 1 : 0,
					imagesize: this.filesize,
					imagename: this.filename,
					time_format: this.checkBoxValue == true ? '24' : '12'
				});
				this.http
					.post(this.apiUrl + 'update_profile', body, {
						headers: headers
					})
					.subscribe(
						res => {
							this.data = res.json();
							loader.dismiss();
							loader = null;
							this.content.scrollToTop();
							var componentRef = this;
							componentRef.getprofile();
							resolve(res.json());
						},
						err => {
							this.errdata = err.json();
							console.log('err' + JSON.stringify(err));
							loader.dismiss();
							loader = null;
							if (this.errdata.error == 'token_invalid') {
								this.events.publish('user:checksession');
							}
						}
					);
			});
		}
	}

	/**** When user open Account page then get users Profile Data *****/
	getprofile() {
		let loader = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: true
		});
		loader.present();
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
			let body = JSON.stringify({
				userId: localStorage.getItem('chatfirstid'),
				userType: localStorage.getItem('chatfirsttype')
			});
			this.http
				.post(this.apiUrl + 'get-user-profile', body, {
					headers: headers
				})
				.subscribe(
					res => {
						this.data = res.json();
						this.commondata.profile = this.data.data.profile;
						this.data.data.operation_hours.notification_status == 1 ? (this.notistatus = true) : (this.notistatus = false);
						localStorage.setItem('imagetosend', this.data.data.profile.profilePicture);
						if (this.data.data.profile.name.indexOf('.') !== -1) {
							this.name = this.data.data.profile.name.replace(/\./g, ' ');
						} else {
							this.name = this.data.data.profile.name;
						}
						this.title = this.data.data.profile.title;
						this.emailid = this.data.data.profile.email;
						// this.commondata.useremail = this.data.data.profile.email
						if (this.phone == true) {
							this.abc.imageData = this.data.data.profile.profilePicture;
							localStorage.setItem('imagetosend', this.abc.imageData);
						} else {
							var image = this.element.nativeElement.querySelector('.accountimage');
							image.src = this.data.data.profile.profilePicture;
							localStorage.setItem('imagetosend', image.src);
						}
						// this.commondata.userimage =  image.src
						this.events.publish('user:login', this.data.data.profile);
						if (this.data.data.operation_hours.time_zone == null || this.data.data.operation_hours.time_zone == '' || this.data.data.operation_hours.time_zone == undefined) {
							this.selectBoxValue = '(UTC-12:00) International Date Line West';
						} else {
							this.selectBoxValue = this.data.data.operation_hours.time_zone;
						}
						if (this.data.data.operation_hours.notification_status == '1') {
							this.notifctnchck = true;
						} else {
							this.notifctnchck = false;
						}
						if (localStorage.getItem('checkcameraweb') == 'true') {
							if (this.data.data.profile.imagename == null || this.data.data.profile.imagename == '' || this.data.data.profile.imagename == undefined) {
								this.showsize = false;
							} else {
								this.showsize = true;
								this.filename = this.data.data.profile.imagename;
							}
							if (this.data.data.profile.imagesize == null || this.data.data.profile.imagesize == '' || this.data.data.profile.imagesize == undefined) {
								this.showsize = false;
							} else {
								this.showsize = true;
								this.filesize = this.data.data.profile.imagesize;
							}
						} else {
							this.showsize = false;
						}

						if (this.data.data.operation_hours.time_format == '12') {
							this.indexFormat = 0;
							this.checkBoxValue = false;
						} else {
							this.indexFormat = 1;
							this.checkBoxValue = true;
						}
						loader.dismiss();
						loader = null;
						resolve(res.json());
					},
					err => {
						this.errdata = err.json();
						console.log('err' + JSON.stringify(err));
						loader.dismiss();
						loader = null;
						if (this.errdata.error == 'token_invalid') {
							this.events.publish('user:checksession');
						}
					}
				);
		});
	}

	/** change self name **/
	changeName(val) {
		if (val == undefined || val == '') {
			this.fullNameErr = true;
			this.fullNameErrMsg = 'Please enter name.';
			this.content.scrollToTop();
		} else if (val.length < 2 || val.length > 30) {
			this.fullNameErrMsg = 'Name should be between 2 to 30 characters.';
			this.fullNameErr = true;
			this.content.scrollToTop();
		} else {
			this.fullNameErr = false;
		}
	}
	/** change title **/
	changeTitle(val) {
		if (val == undefined || val == '') {
			this.titleErr = false;
		} else if (val.length < 5 || val.length > 30) {
			this.titleErr = true;
			this.titleErrMsg = 'Title should be between 5 to 30 characters.';
		} else {
			this.titleErr = false;
		}
	}
	/** check time value **/
	checkvalue(val) {
		/** FIXME */
		if (this.disableOperatingHours) {
			return;
		}
		let tempIndex = this.indexFormat;
		if (val == true) this.indexFormat = 1;
		else this.indexFormat = 0;
		let formatTime = this.allFormatArr;
		for (let i = 0; i < this.allDaysArr.length; i++) {
			/** left side time is lower and right side is upper **/
			let tempLower = formatTime[this.indexFormat][formatTime[tempIndex].indexOf(this.allDaysArr[i].lowerTime)];
			let tempUpper = formatTime[this.indexFormat][formatTime[tempIndex].indexOf(this.allDaysArr[i].upperTime)];
			this.allDaysArr[i].lowerTime = tempLower;
			this.allDaysArr[i].upperTime = tempUpper;
		}
	}

	/** setting dynamically class name of slider **/
	rangeInvisible(e: any, id: number) {
		/** FIXME */
		if (this.disableOperatingHours) {
			return;
		}
		if (e.checked) {
			this.allDaysArr[id].className = 'cus-range account-range';
		} else this.allDaysArr[id].className = 'sum-range account-range';
	}

	noticheck(val) {
		val._value ? (this.notistatus = true) : (this.notistatus = false);
	}

	/**** Toggle Email ****/
	changeemail() {
		this.editagentForm.reset();
		this.showhide = !this.showhide;
		this.newemail = '';
	}
	/**** Code To edit users email Id ****/
	editemail() {
		if (!this.editagentForm.valid) {
		} else {
			let loader = this.loadingCtrl.create({
				content: 'Please wait...',
				dismissOnPageChange: true
			});
			loader.present();
			this.validEmailCheck = this.newemail;
			let headers = new Headers();
			let body = JSON.stringify({
				email: this.newemail,
				userID: localStorage.getItem('chatfirstid')
			});
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
			/** hit backend api for reset password **/
			this.http.post(this.apiUrl + 'emailUpdate', body, { headers: headers }).subscribe(
				res => {
					this.emailexist = false;
					let body1 = JSON.stringify({
						userId: localStorage.getItem('chatfirstid')
					});
					this.saveDetail();
					this.http
						.post(this.apiUrl + 'logout', body1, {
							headers: headers
						})
						.subscribe(
							res => {
								loader.dismiss();
								loader = null;
								let alert = this.alertCtrl.create({
									title: 'CometEngage',
									cssClass: 'forgotpass',
									subTitle: 'Link has been sent to your registered email id for verification.',
									buttons: [
										{
											text: 'OK',
											handler: data => {
												this.navCtrl.push('LoginPage');
											}
										}
									]
								});
								alert.present();
							},
							err => {
								this.errdata = err.json();
								console.log('err' + JSON.stringify(err));
								loader.dismiss();
								loader = null;
								if (this.errdata.error == 'token_invalid') {
									this.events.publish('user:checksession');
								}
							}
						);
					this.showhide = false;
				},
				err => {
					loader.dismiss();
					loader = null;
					this.errdata = err.json();
					if (this.errdata.response_code == '401') {
						this.emailexist = true;
					}
					if (this.errdata.error == 'token_invalid') {
						this.events.publish('user:checksession');
					}
				}
			);
		}
	}

	cancel() {
		this.showhide = false;
	}
	/** as page loads */
	ngOnInit() {
		this.photos = [];
	}

	/*** Upload image from Android ****/
	ClickPhoto() {
		let buttonLabels = ['Camera', 'Gallery'];
		const option: ActionSheetOptions = {
			title: 'What do you want with this image?',
			subtitle: 'Choose an action',
			buttonLabels: buttonLabels,
			addCancelButtonWithLabel: 'Cancel',
			destructiveButtonLast: true
		};

		this.actionSheet.show(option).then((buttonIndex: number) => {
			if (buttonIndex == 1) {
				const options: CameraOptions = {
					quality: 100,
					destinationType: this.camera.DestinationType.DATA_URL,
					allowEdit: true,
					encodingType: this.camera.EncodingType.JPEG,
					mediaType: this.camera.MediaType.PICTURE
				};
				/**** Ionic cordova plugin to capture Image ****/
				this.camera.getPicture(options).then(
					imageData => {
						this.base64Image = 'data:image/jpeg;base64,' + imageData;
						this.abc.imageData = 'data:image/jpeg;base64,' + imageData;
						localStorage.setItem('imagetosend', imageData);
						localStorage.setItem('checkcameraweb', 'false');
						this.photos.push(this.base64Image);
						this.photos.reverse();
					},
					err => {
						//err
					}
				);
			} else {
				const options: CameraOptions = {
					quality: 100,
					sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
					destinationType: this.camera.DestinationType.DATA_URL,
					allowEdit: true,
					encodingType: this.camera.EncodingType.JPEG,
					mediaType: this.camera.MediaType.PICTURE
				};
				this.camera.getPicture(options).then(
					imageData => {
						this.base64Image = 'data:image/jpeg;base64,' + imageData;
						this.abc.imageData = 'data:image/jpeg;base64,' + imageData;
						localStorage.setItem('imagetosend', imageData);
						localStorage.setItem('checkcameraweb', 'false');
						this.photos.push(this.base64Image);
						this.photos.reverse();
					},
					err => {
						//err
					}
				);
			}
		});
	}
	/** upload image from Web **/
	changeListner(event) {
		var reader = new FileReader();
		var image = this.element.nativeElement.querySelector('.accountimage');
		reader.onload = function(e: any) {
			var src = e.target.result;
			image.src = src;
			localStorage.removeItem('profileimage');
			localStorage.setItem('profileimage', image.src);
			localStorage.removeItem('imagetosend');
			localStorage.setItem('imagetosend', localStorage.getItem('profileimage').split(',')[1]);
		};
		localStorage.setItem('checkcameraweb', 'true');
		this.imagephone = localStorage.getItem('imagetosend');
		reader.readAsDataURL(event.target.files[0]);
		var files = event.srcElement.files[0];
		this.showsize = true;
		this.filename = files.name;
		this.filesize = files.size / 1024;
		this.filesize = parseInt(this.filesize);
	}

	chatbutton() {
		this.events.publish('user:chat');
	}
	/*** Push Back to MyQueue Page */
	cancelform() {
		this.navCtrl.push('MyqueuePage');
	}
}



// WEBPACK FOOTER //
// ./src/pages/account/account.ts
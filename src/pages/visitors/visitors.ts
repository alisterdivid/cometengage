import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, MenuController, Events, LoadingController, IonicPage } from 'ionic-angular';

import firebase from 'firebase';

import { ChatsProvider } from '../../providers/chats/chats';
import { CommondataProvider } from '../../providers/commondata/commondata';

@IonicPage()
@Component({
	selector: 'page-visitors',
	templateUrl: 'visitors.html'
})
export class VisitorsPage {
	visitorinfo: any;
	showlist: any;
	endDate: any;
	now: any;
	timeLeft: any;
	selected_values: any;
	toppings: any;
	VISITOR: any = true;
	ONLINE: any = true;
	STATUS: any = true;
	LOCATION: any = true;
	PAGE: any = true;
	REFERRER: any = true;
	OS: any = true;
	t: any = true;
	rotate: any = [];
	chatroomref: any;
	accessToVisitorsTab: boolean = false;

	fieldsname: any = [{ name: 'Visitor' }, { name: 'Online' }, { name: 'Status' }, { name: 'Location' }, { name: 'Page' }, { name: 'Referrer' }, { name: 'OS' }];
	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public events: Events, public commondata: CommondataProvider, public db: AngularFireDatabase, public loadingCtrl: LoadingController, public chatsProvider: ChatsProvider) {
		if (localStorage.getItem('plan') != 'free') {
			this.accessToVisitorsTab = true;
		}
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(true);
		let loader = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: true
		});
		loader.present();
		if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
			this.events.publish(('user:checksession'));
		}
		var timeLeft = (currenttime, starttime) => {
			this.now = new Date(currenttime);
			this.endDate = new Date(starttime);
			var diff = this.now - this.endDate;

			var hours = Math.floor(diff / 3.6e6);
			var minutes = Math.floor((diff % 3.6e6) / 6e4);
			var seconds = Math.floor((diff % 6e4) / 1000);
			if (hours == 0 && minutes == 0) {
				return seconds + ' sec';
			} else if (hours == 0 && minutes != 0) {
				return minutes + ' min ' + seconds + ' sec';
			} else if (hours != 0 && minutes != 0 && seconds != 0) {
				return hours + ' hr ' + minutes + ' min ' + seconds + ' sec';
			}
		};
		this.db.list(`/visitors/${localStorage.companyid}`).subscribe(item => {
			this.visitorinfo = item;
			var j = 0;
			for (var i = 0; i < this.visitorinfo.length; i++) {
				/** check chat happen before **/
				let visitorchatRoomRef = this.visitorinfo[i].chatRef;
				if (visitorchatRoomRef) {
					let checkChat = firebase.database().ref(`/chats/`);
					checkChat.once('value', snapshot => {
						if (snapshot.hasChild(visitorchatRoomRef)) {
							this.rotate[j] = 'os-img cursor-pointer rotate';
							j++;
						} else {
							this.rotate[j] = 'os-img cursor-pointer';
							j++;
						}
					});
				}
				/** end check chat happen before **/
				this.visitorinfo[i].staytime = timeLeft(Date.now(), this.visitorinfo[i].time);
			}
			setInterval(() => {
				for (var i = 0; i < this.visitorinfo.length; i++) {
					this.visitorinfo[i].staytime = timeLeft(Date.now(), this.visitorinfo[i].time);

					/********************* Remove Visitors Chat History  ******************/
					/**** Hourly Chats Remove Code ****/
					let setHours = 6;
					//let setMins=30;
					// let setSeconds=20;
					if (this.visitorinfo[i].staytime != undefined && this.visitorinfo[i].staytime.includes('hr')) {
						if (this.visitorinfo[i].staytime.split(' ')[0] >= setHours) {
							this.removeVisitors(this.visitorinfo[i].anoynomousUid);
						}
					}
					/** For Particular hours , mins , seconds remove records
					else if(this.visitorinfo[i].staytime!=undefined && this.visitorinfo[i].staytime.includes('hr') && (this.visitorinfo[i].staytime.includes('min'))  && (this.visitorinfo[i].staytime.includes('sec')) ){
					if(this.visitorinfo[i].staytime.split(' ')[0] >setHours && this.visitorinfo[i].staytime.split(' ')[2] > setSeconds && this.visitorinfo[i].staytime.split(' ')[4] ){
						this.removeVisitors(this.visitorinfo[i].anoynomousUid);
					}
					}
					**/
					/** End For Particular hours , mins , seconds remove records **/
					/*** End Remove Visitors Chat History ***/
				}
			}, 1000);

			if (item == [] || item.length <= 0) {
				this.showlist = false;
				loader.dismiss();
			} else {
				this.showlist = true;
				loader.dismiss();
			}
		});
	}
	/** remove visitors method **/
	removeVisitors(removeVisitorId) {
		let removeVisitorref = firebase.database().ref(`/visitors/${localStorage.companyid}`);
		removeVisitorref.once('value', snapshot => {
			let vals = snapshot.val();
			for (let key in vals) {
				if (vals[key].anoynomousUid == removeVisitorId) {
					let removeRef = firebase.database().ref(`/visitors/${localStorage.companyid}/${key}`);
					removeRef.remove();
				}
			}
		});
	}

	chat() {
		this.navCtrl.push('MychatPage');
	}

	chatbutton() {
		this.events.publish('user:chat');
	}

	onChange() {
		if (this.selected_values.includes('Visitor')) {
			this.VISITOR = true;
		} else {
			this.VISITOR = false;
		}
		if (this.selected_values.includes('Online')) {
			this.ONLINE = true;
		} else {
			this.ONLINE = false;
		}
		if (this.selected_values.includes('Status')) {
			this.STATUS = true;
		} else {
			this.STATUS = false;
		}
		if (this.selected_values.includes('Location')) {
			this.LOCATION = true;
		} else {
			this.LOCATION = false;
		}
		if (this.selected_values.includes('Page')) {
			this.PAGE = true;
		} else {
			this.PAGE = false;
		}
		if (this.selected_values.includes('Referrer')) {
			this.REFERRER = true;
		} else {
			this.REFERRER = false;
		}
		if (this.selected_values.includes('OS')) {
			this.OS = true;
		} else {
			this.OS = false;
		}

		if (this.selected_values.length == 3) {
			//do somthing
		}
	}

	registerRandomName = (anoynomousUid, name) => {
		let userRandomRefCheck = firebase.database().ref(`/users`);
		userRandomRefCheck.once('value', snapshot => {
			if (snapshot.hasChild(anoynomousUid)) {
				//alert('already')
			} else {
				let userRandomRef = firebase.database().ref(`/users/${anoynomousUid}`);
				userRandomRef.set({ username: name });
			}
		});
	};

	/** when click user so redirect to associated chat room **/
	chatWithAnoynomousUser(anoynomousUid, name) {
		/** Code to update visitor name  ***/
		this.registerRandomName(anoynomousUid, name);
		/*** End Update  */
		let openVisitorWin;
		let idAdmin;
		/** Code to open snippet visitors chat window **/
		if (localStorage.getItem('chatfirsttype') == '2') {
			openVisitorWin = firebase.database().ref(`/visitors/${localStorage.companyid}`);
			openVisitorWin.once('value', snapshot => {
				//console.log(JSON.stringify(snapshot))
				let values = snapshot.val();
				if (values != null) {
					for (let key in values) {
						if (values[key].anoynomousUid == anoynomousUid) {
							/** set an status */
							let refForUpdate = firebase.database().ref(`/visitors/${localStorage.companyid}/${key}`);
							refForUpdate.update({ openwindow: true }).then(() => {
								//console.log('open window success');
							});
						}
					}
				}
			});
		} else {
			/*** Find associated admin id from agent table there ***/
			let refTemp = firebase.database().ref(`/agents/${localStorage.companyid}`);
			refTemp
				.once('value', item => {
					let items = item.val();
					if (items != null) {
						for (let key in items) {
							idAdmin = items[key].chatref.split(',')[1];
							return;
						}
					}
				})
				.then(() => {
					/** Code to open snippet visitors chat window **/
					openVisitorWin = firebase.database().ref(`/visitors/${idAdmin}`);
					openVisitorWin.once('value', snapshot => {
						let values = snapshot.val();
						if (values != null) {
							for (let key in values) {
								if (values[key].anoynomousUid == anoynomousUid) {
									/** set an status */
									let refForUpdate = firebase.database().ref(`/visitors/${idAdmin}/${key}`);
									refForUpdate.update({ openwindow: true }).then(() => {
										//open window success
									});
								}
							}
						}
					});
				});
		}
		/** End code to open snippet visitors chat window **/
		if (localStorage.getItem('chatfirsttype') == '2') {
			localStorage.setItem('paramid', anoynomousUid);
			this.navCtrl.push('MychatPage', localStorage.getItem('paramid'));
		} else {
			let agentdata = firebase.database().ref(`/agents/${localStorage.companyid}`);
			agentdata.once('value', item => {
				let values = item.val();
				if (values != null) {
					for (let key in values) {
						if (values[key].chatref.split(',')[0] == anoynomousUid) {
							let chatRoomRef = values[key].chatref;
							let path = `/chats/${chatRoomRef}`;
							localStorage.chatrefchat = path;
							localStorage.paramid = chatRoomRef;
							this.navCtrl.push('MychatPage', chatRoomRef);
						}
					}
				}
			});
		}
	}
}



// WEBPACK FOOTER //
// ./src/pages/visitors/visitors.ts
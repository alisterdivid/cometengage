import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { NavController, MenuController, Events, LoadingController, IonicPage } from 'ionic-angular';

import { CommondataProvider } from '../../providers/commondata/commondata';
import { UsersproviderProvider } from '../../providers/usersprovider/usersprovider';

@IonicPage()
@Component({
	selector: 'page-myqueue',
	templateUrl: 'myqueue.html'
})
export class MyqueuePage {
	/** define all variables **/
	chatdata: any;
	chatsarr = [];
	myqueuearr = [];
	useridkey: string;
	usertabledata = [];
	techsupport: any;
	myqueueshowarr = [];
	param: any;
	username: any;
	boldtext: any;
	temparr = [];
	filteredusers = [];
	myqueuenewarr = [];
	backgroundColor: any;
	lastMessage: any;
	list: any;
	agentchatref = [];
	agentsarr = [];
	agentdata: any;
	chatagentdata: any;
	chatsagentsarr = [];
	myqueueshowagentarr = [];
	myqueuenewagentarr = [];
	agent: any;
	agentuserroom: any;
	userclass = [];
	currentAgentRef: any;
	recursFunc: any;
	permission: any;
	notifyStatus: any;
	counterCheckLeave: any = 0;
	loader: any;
	showList: any;
	appUrl: any;

	/** As load page called constructor **/
	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public events: Events, public db: AngularFireDatabase, public commondata: CommondataProvider, public up: UsersproviderProvider, public loadingCtrl: LoadingController) {
		this.notifyStatus = true;
		this.showList = false;
		this.appUrl = commondata.appUrl;
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: false
		});
	}
	/** When 1st load page **/
	ionViewWillEnter() {
		this.loader.present();
		this.recursFunc = (i, item) => {
			if (i < item.length) {
				let reffChat = item[i].userid + ',' + localStorage.getItem('firebaseuid');
				let tempHighlyt = false;
				let leaveStat = false;
				return new Promise((resolve, reject) => {
					this.currentAgentRef = [];
					this.currentAgentRef = this.db.list(`/userChatRef/${reffChat}`);
					this.currentAgentRef.forEach(function(data) {
						if (i < item.length) {
							if (data.length > 0) {
								if (data[data.length - 1].leaveTime < item[i].lastTime) {
									tempHighlyt = true;
								}
								leaveStat = data[data.length - 1].leave;
							}
							resolve(data);
						}
					});
				}).then(succ => {
					if (tempHighlyt) {
						if (localStorage.getItem('chatfirsttype') == '2') {
							if (this.myqueuenewarr[i] != undefined) this.myqueuenewarr[i].highlytVal = true;
						} else {
							if (this.myqueuenewagentarr[i] != undefined) this.myqueuenewagentarr[i].highlytVal = true;
						}
					}
					if (localStorage.getItem('chatfirsttype') == '2') {
						if (this.myqueuenewarr[i] != undefined) this.myqueuenewarr[i].leaveStatus = leaveStat;
						if (this.myqueuenewarr[i].leaveStatus == false) {
							this.counterCheckLeave++;
						}
					} else {
						if (this.myqueuenewagentarr[i] != undefined) this.myqueuenewagentarr[i].leaveStatus = leaveStat;
						if (this.myqueuenewagentarr[i]) {
							if (this.myqueuenewagentarr[i].leaveStatus == false) {
								this.counterCheckLeave++;
							}
						}
					}
					if (this.myqueuenewarr.length > 0) {
						/**** Check if users details modified  ****/
						for (let i = 0; i < this.myqueuenewarr.length; i++) {
							let chatRefUser = firebase.database().ref(`/users/${this.myqueuenewarr[i].userid}`);
							chatRefUser.once('value', item => {
								let data = item.val();
								if (data == null) {
								} else {
									if (this.myqueuenewarr[i].name != data.username) {
										this.myqueuenewarr[i].name = data.username;
									}
								}
							});
						}
					} else {
						/**** Check if users details modified  ****/
						for (let i = 0; i < this.myqueuenewagentarr.length; i++) {
							let chatRefUser = firebase.database().ref(`/users/${this.myqueuenewagentarr[i].userid}`);
							chatRefUser.once('value', item => {
								let data = item.val();
								//  console.log('data values >>',JSON.stringify(data))
								if (data == null) {
								} else {
									if (this.myqueuenewagentarr[i].name != data.username) {
										this.myqueuenewagentarr[i].name = data.username;
										//chatRefUser.update({name:data.username})
									}
								}
							});
						}
					}
					i++;
					return this.recursFunc(i, item);
				});
			} else {
				//console.log('recursion complete');
				if (!this.showList) this.loader.dismiss();
				this.showList = true;
			}
		};

		this.menuCtrl.enable(true);
		this.username = localStorage.getItem('chatfirstName');
		if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined || localStorage.getItem('chatfirsttoken') == '') {
			this.events.publish('user:checksession', 'myqueue');
		}
		if (localStorage.getItem('chatfirsttype') == '2') {
			this.agent = false;
			this.up.getUid().then(uid => {
				this.useridkey = uid;
				this.chatdata = this.db.list('/chats');
				this.chatsarr = [];
				this.chatdata.forEach(element => {
					this.chatsarr = element;
					if (this.chatsarr.length == 0) {
						this.list = false;
					} else {
						this.list = true;
					}
					this.myqueueshowarr = [];
					this.myqueuearr = [];
					this.myqueuenewarr = [];
					for (let i = 0; i < this.chatsarr.length; i++) {
						if (this.chatsarr[i].$key.indexOf(this.useridkey) >= 0) {
							this.myqueueshowarr.push(Object.keys(this.chatsarr[i]).map(key => this.chatsarr[i][key]));
						}
					}
					var temp = [];
					this.myqueuearr = this.myqueueshowarr.map(item => {
						return item;
					});
					let tempMessage = { message: '', time: '' };
					for (let i = 0; i < this.myqueuearr.length; i++) {
						for (let l = this.myqueuearr[i].length - 1; l >= 0; l--) {
							if (this.myqueuearr[i][l].specialMessage == false || this.myqueuearr[i][l].specialMessage == undefined) {
								tempMessage.message = this.myqueuearr[i][l].message;
								tempMessage.time = this.myqueuearr[i][l].time;
								break;
							}
						}
						for (let j = 0; j < this.myqueuearr[i].length; j++) {
							this.myqueuearr[i][j].highlytVal = false;
							this.myqueuearr[i][j].leaveStatus = false;
							this.myqueuearr[i][j].showLastMess = tempMessage.message;
							//console.log('name',this.myqueuearr[i][j].name ,'Last Message >> ',this.myqueuearr[i][j].showLastMess ,'Leave Status >>',this.myqueuearr[i][j].leaveStatus )
							this.myqueuearr[i][j].lastTime = tempMessage.time;
							if (this.myqueuearr[i][j].type == 'anoynomous') {
								this.myqueuenewarr.push(this.myqueuearr[i][j]); // all anoynomous user message
							}
						}
					}
					this.myqueuenewarr = this.myqueuenewarr.filter(item => {
						if (temp.indexOf(item.userid) < 0) {
							temp.push(item.userid);
							return true;
						}
						return false;
					});
					this.recursFunc(0, this.myqueuenewarr);
					setInterval(() => {
						this.recursFunc(0, this.myqueuenewarr);
					}, 6000);
				});
			});
		} else {
			this.agent = true;
			this.up.getUid().then(uid => {
				this.useridkey = uid;
				this.agentdata = this.db.list('/agents');
				this.chatagentdata = this.db.list('/chats');
				this.agentsarr = [];
				this.agentdata.subscribe(element => {
					this.agentsarr = element;
					if (this.agentsarr.length == 0) {
						this.list = false;
					} else {
						this.list = true;
					}
					this.myqueuenewagentarr = [];
					this.myqueueshowagentarr = [];
					this.agentchatref = [];

					var agentIndex = this.agentsarr.findIndex(x => x.$key == localStorage.getItem('companyid'));
					this.agentchatref.push(this.agentsarr[agentIndex]);
					this.chatagentdata.subscribe(element => {
						this.chatsagentsarr = element;
						var temp = [];
						let tempMessage = { message: '', time: '' };
						for (let key in this.agentchatref[0]) {
							var chatIndex = this.chatsagentsarr.findIndex(x => x.$key == this.agentchatref[0][key].chatref);
							if (chatIndex != -1) {
								this.myqueueshowagentarr.push(this.chatsagentsarr[chatIndex]);
							}
						}
						var temprArr = [];
						for (let i = 0; i < this.myqueueshowagentarr.length; i++) {
							temprArr.push(Object.keys(this.myqueueshowagentarr[i]).map(key => this.myqueueshowagentarr[i][key]));
						}

						for (let k = 0; k < temprArr.length; k++) {
							for (let l = temprArr[k].length - 1; l >= 0; l--) {
								if (temprArr[k][l].specialMessage == false || temprArr[k][l].specialMessage == undefined) {
									tempMessage.message = temprArr[k][l].message;
									tempMessage.time = temprArr[k][l].time;
									break;
								}
							}

							for (let m = 0; m < temprArr[k].length; m++) {
								if (temprArr[k][m].type == 'anoynomous') {
									temprArr[k][m].highlytVal = false;
									temprArr[k][m].leaveStatus = false;
									temprArr[k][m].showLastMess = tempMessage.message;
									temprArr[k][m].lastTime = tempMessage.time;
									this.myqueuenewagentarr = this.myqueuenewagentarr.reverse();
									this.myqueuenewagentarr.push(temprArr[k][m]);
								}
							}
						}
						this.myqueuenewagentarr = this.myqueuenewagentarr.filter(item => {
							if (temp.indexOf(item.userid) < 0) {
								temp.push(item.userid);
								return true;
							}
							return false;
						});

						this.recursFunc(0, this.myqueuenewagentarr);
					});
				});
			});
		}
	}
	/** Maintain last page for send receive notification sound manage **/
	ionViewWillLeave() {
		localStorage.setItem('prevPage', 'MyqueuePage');
		localStorage.currentNotiPage = '';
	}
	/** Set current Notification Page **/
	ionViewDidEnter() {
		localStorage.currentNotiPage = 'MyqueuePage';
	}
	/** when click to particular user so pass its user id **/
	chatkey(userid) {
		if (localStorage.getItem('chatfirsttype') == '3') {
			for (let i = 0; i < this.agentsarr.length; i++) {
				for (let key in this.agentsarr[i]) {
					if (this.agentsarr[i][key].chatref.indexOf(userid) >= 0) {
						this.agentuserroom = this.agentsarr[i][key];
					}
				}
			}
			this.agentuserroom = this.agentuserroom.chatref;
			this.param = { interlocutor: this.agentuserroom.chatref };
			localStorage.setItem('paramid', this.agentuserroom);
			this.navCtrl.push('MychatPage', localStorage.getItem('paramid'));
		} else {
			this.param = { interlocutor: userid };
			localStorage.setItem('paramid', userid);
			this.navCtrl.push('MychatPage', localStorage.getItem('paramid'));
		}
	}
	/** notification side bar  **/
	notifyMe(message, status) {
		let appUrl = this.appUrl;
		// Let's check if the browser supports notifications
		if (!('Notification' in window)) {
		} else if (this.permission === 'granted') {
			// Let's check whether notification permissions have already been granted
			new Notification('Test Notification', {
				icon: appUrl + 'assets/icon/logo.png',
				body: message
			});
		} else if (this.permission !== 'denied') {
			// Otherwise, we need to ask the user for permission
			Notification.requestPermission(function(permission) {
				// If the user accepts, let's create a notification
				if (permission === 'granted') {
					new Notification('Test Notification ', {
						icon: appUrl + 'assets/icon/logo.png',
						body: message
					});
				}
			});
		}
	}
}



// WEBPACK FOOTER //
// ./src/pages/myqueue/myqueue.ts
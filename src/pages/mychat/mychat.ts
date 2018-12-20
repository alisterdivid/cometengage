import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Content } from 'ionic-angular/index';

import firebase from 'firebase';

import { ChatsProvider } from '../../providers/chats/chats';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { UsersproviderProvider } from '../../providers/usersprovider/usersprovider';

@IonicPage()
@Component({
	selector: 'page-mychat',
	templateUrl: 'mychat.html'
})
export class MychatPage {
	@ViewChild(Content) content: Content;
	/*** Define Variables ***/
	sendmessage = false;
	disableUser = false;
	message: string = '';
	messages: object[] = [];
	chatSubscription;
	showimage: any;
	showagent: any;
	showdate: any;
	visitorsarr = [];
	usertype: any;
	displayarr = [];
	interlocutor: any;
	chats: FirebaseListObservable<any[]>;
	useridkey: string;
	getuserdata = [];
	usergetemail: any;
	username: any;
	timehr: any;
	data: any;
	list: any;
	agentlist = [];
	errdata: any;
	noagent: any;
	agentuserid: any;
	groupagentuserid: any;
	chatroomref: any;
	userData: FirebaseListObservable<any>;
	filteredusers = [];
	temparr = [];
	formatDate: any;
	uemail: any;
	umobile: any;
	uname: any;
	signupForm: FormGroup;
	currentAgentRef: FirebaseListObservable<any[]>;
	currentGroupsRef: FirebaseListObservable<any[]>;
	agentclass: any = [];
	chattype: any;
	groupAgentdata: any;
	grouplist = [];
	nogroup: any;
	checklist: any;
	allAgentsList: any;
	groupAgentsList: any = [];
	groupclass = [];
	currentAgentRef1: FirebaseListObservable<any[]>;
	addedAgentRef: FirebaseListObservable<any[]>;
	addedGroupRef: FirebaseListObservable<any[]>;
	checkagent: any;
	currentGroup: any;
	checkGroup: any;
	agentkeys = [];
	mainChatList = [];
	recursFunc: any;
	specialref: FirebaseListObservable<any>;
	usersNotification: any = [];
	recAgent: any;
	ind: any = 0;
	usersData: any;
	manageIDArr: any = [];
	myForm: FormGroup;
	apiUrl: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public commondata: CommondataProvider, public loadingCtrl: LoadingController, public events: Events, public chatsProvider: ChatsProvider, public local: Storage, public up: UsersproviderProvider, public http: Http, public formBuilder: FormBuilder) {
		this.apiUrl = commondata.apiUrl;
		/** form validation logic **/
		this.signupForm = formBuilder.group({
			uemail: ['', Validators.compose([Validators.maxLength(40), Validators.pattern(/^([\w-\.]+@(?!lsu.edu)([\w-]+\.)+[\w-]{2,4})?$/), Validators.required])],
			umobile: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
			uname: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
			email: ['', Validators.compose([Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), Validators.required])]
		});
		this.up.getUid().then(uid => {
			let loader = this.loadingCtrl.create({
				content: 'Please wait...',
				dismissOnPageChange: false
			});
			loader.present();
			this.useridkey = uid;
			this.interlocutor = localStorage.getItem('paramid'); // param id set in chat.ts , reference of chat room
			if (localStorage.getItem('chatfirsttype') == '2') {
				// 2 = admin
				chatsProvider.getChatRef(this.useridkey, this.interlocutor).then((chatRef: any) => {
					this.chatroomref = chatRef;
					localStorage.setItem('chatrefchat', this.chatroomref);
					this.chats = this.db.list(chatRef);
					loader.dismiss();
					loader = null;
				});
				/** find particular user info from users table **/
				this.db.list(`/users/${this.interlocutor}`).subscribe(data => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].$key == 'email') {
							this.uemail = data[i].$value;
						}
						if (data[i].$key == 'mobile') {
							this.umobile = data[i].$value;
						}
						if (data[i].$key == 'username') {
							this.uname = data[i].$value;
						}
					}
				});
			} else {
				// agent
				chatsProvider
					.getAgentChatRef(this.interlocutor) //pass chat ref of room
					.then((chatRef: any) => {
						this.chatroomref = chatRef;
						localStorage.setItem('chatrefchat', this.chatroomref);
						this.chats = this.db.list(chatRef);
						loader.dismiss();
						loader = null;
					});
				/** get agent id from chat reference **/
				this.db.list(`/users/${this.interlocutor.split(',')[0]}`).subscribe(data => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].$key == 'email') {
							this.uemail = data[i].$value;
						}
						if (data[i].$key == 'mobile') {
							this.umobile = data[i].$value;
						}
						if (data[i].$key == 'username') {
							this.uname = data[i].$value;
						}
					}
				});
			}
		});
	}
	/** When user 1st time enter in page , click to particular user from myqueue or all queue **/
	ionViewDidEnter() {
		localStorage.currentNotiPage = 'MychatPage';
		let id =
			localStorage
				.getItem('chatrefchat')
				.split('/')[2]
				.split(',')[0] +
			',' +
			localStorage.getItem('firebaseuid');
		let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
		new Promise((resolve, reject) => {
			usersLeaveList.once('value', item => {
				let itemVal = item.val();
				resolve(itemVal);
			});
		}).then(itemVal => {
			for (let key in itemVal) {
				if (itemVal[key].leave == true) {
					this.disableUser = true;
				} else {
					this.disableUser = false;
					this.anotherFunc();
				}
			}
		});
		/** get user id from service **/
		this.up.getUid().then(uid => {
			this.loadingCtrl.create({
				content: 'Please wait...',
				dismissOnPageChange: false
			});
			this.useridkey = uid;
			this.interlocutor = localStorage.getItem('paramid');
			if (localStorage.getItem('chatfirsttype') == '2') {
				this.chatsProvider.getChatRef(this.useridkey, this.interlocutor).then((chatRef: any) => {
					this.chatroomref = chatRef;
					localStorage.setItem('chatrefchat', this.chatroomref);
					this.chats = this.db.list(chatRef);
					this.chats.subscribe(item => {
						this.mainChatList = [];
						this.recursFunc(0, item);
					});
				});

				this.db.list(`/users/${this.interlocutor}`).subscribe(data => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].$key == 'email') {
							this.uemail = data[i].$value;
						}
						if (data[i].$key == 'mobile') {
							this.umobile = data[i].$value;
						}
						if (data[i].$key == 'username') {
							this.uname = data[i].$value;
						}
					}
				});
			} else {
				this.chatsProvider.getAgentChatRef(this.interlocutor).then((chatRef: any) => {
					this.chatroomref = chatRef;
					localStorage.setItem('chatrefchat', this.chatroomref);
					this.chats = this.db.list(chatRef);
					this.chats.subscribe(item => {
						this.mainChatList = [];
						this.recursFunc(0, item);
					});
				});

				this.interlocutor = this.interlocutor.split(',')[0];
				this.db.list(`/users/${this.interlocutor}`).subscribe(data => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].$key == 'email') {
							this.uemail = data[i].$value;
						}
						if (data[i].$key == 'mobile') {
							this.umobile = data[i].$value;
						}
						if (data[i].$key == 'username') {
							this.uname = data[i].$value;
						}
					}
				});
			}
		});
	}

	/** add admin join message to chat room  **/
	addJoinedMsgAfterAdminAdd(tempref, loginuserid, key) {
		let specialref = firebase.database().ref(`/specialmessage/${tempref}/${key}`);
		specialref.update({
			join: 'own'
		});
		/** push joined mesage info to chat room **/
		this.chats.push({
			name: this.username,
			userid: localStorage.getItem('chatfirstid'),
			email: localStorage.getItem('chatfirstEmail'),
			specialMessage: true,
			joinmessage: `Agent - Joined`,
			time: firebase.database.ServerValue.TIMESTAMP,
			date: new Date(),
			image: localStorage.getItem('imagetosend'),
			type: 'agent'
		});
	}

	/** Remove other agents from my queue when admin or atleast one agent joins chat room **/
	anotherFunc() {
		let loginUserId = localStorage.getItem('firebaseuid');
		let tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
		let specialref = firebase.database().ref(`/specialmessage/${tempref}`);
		new Promise((resolve, reject) => {
			specialref.once('value', item => {
				let data = item.val();
				if (data == null) {
					this.disableOtherUsers(tempref, loginUserId, true);
					resolve(false);
				} else {
					let flag = false;
					let count = 0;
					let ind = '';
					for (let key in data) {
						count++;
						ind = key;
						if (data[key].loginuserid == loginUserId) {
							if (data[key].join == 'admin') {
								this.addJoinedMsgAfterAdminAdd(tempref, loginUserId, key);
							}
							flag = true;
						}
					}
					if (count == 1) {
						if (data[ind].status == 'company') this.disableOtherUsers(tempref, loginUserId, true);
					}
					if (flag == false) {
						resolve(false);
					} else {
						resolve(true);
					}
				}
			});
		}).then(status => {
			if (status) {
				//if
			} else {
				//only for 1st time for that id
				var userType;
				var type;
				localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
				specialref.push({
					loginuserid: loginUserId,
					chatref: tempref,
					status: type,
					time: new Date().getTime(),
					join: 'own'
				});

				//push a special message in chats table
				this.chats
					.push({
						name: this.username,
						userid: localStorage.getItem('chatfirstid'),
						email: localStorage.getItem('chatfirstEmail'),
						specialMessage: true,
						joinmessage: `${userType} - Joined`,
						time: firebase.database.ServerValue.TIMESTAMP,
						date: new Date(),
						image: localStorage.getItem('imagetosend'),
						type: type
					})
					.then(() => {})
					.catch(() => {});
			}
		});
	}

	ionViewWillEnter() {
		this.username = localStorage.getItem('chatfirstName');
		if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
			this.events.publish(('user:checksession'));
		}
		if (localStorage.getItem('imagetosend') == null || localStorage.getItem('imagetosend') == '' || localStorage.getItem('imagetosend') == undefined) {
			this.showimage = 'assets/icon/user_img.png';
		} else {
			this.showimage = localStorage.getItem('imagetosend');
		}

		this.showagent = localStorage.getItem('add');
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
		let body = JSON.stringify({
			userId: localStorage.getItem('chatfirstid')
		});
		this.http
			.post(this.apiUrl + 'get-login-agent', body, {
				headers: headers
			})
			.subscribe(
				res => {
					this.data = res.json();
					if (this.data.data == '' || this.data.data == null) {
						this.noagent = false;
					} else {
						this.noagent = true;
					}
				},
				err => {
					this.errdata = err.json();
					if (this.errdata.error == 'token_invalid') {
						this.events.publish(('user:checksession'));
					}
				}
			);

		this.recursFunc = (i, item) => {
			if (i < item.length) {
				if (i == 0) {
					item[i].showDate = true;
					item[i].dateCont = this.formatDate(item[i].time);
					this.mainChatList.push(item[i]);
					i++;
					return this.recursFunc(i, item);
				} else {
					if (this.formatDate(item[i].time) != this.formatDate(item[i - 1].time)) {
						item[i].showDate = true;
						item[i].dateCont = this.formatDate(item[i].time);
					}
					this.mainChatList.push(item[i]);
					i++;
					return this.recursFunc(i, item);
				}
			} else {
				setTimeout(() => {
					if (this.content._scroll) this.content.scrollToBottom(0);
				}, 500);
			}
		};

		/** recursively call agent Array **/
		this.recAgent = (currentInd, agentArr) => {
			this.currentGroupsRef = this.db.list(`/agents/${this.agentkeys[currentInd]}`);
			let chatref = localStorage.getItem('chatrefchat');
			chatref = chatref.split('/chats/')[1].split(',')[0]; //get clicked users id
			if (currentInd < agentArr.length) {
				return new Promise((resolve, reject) => {
					this.currentGroupsRef.subscribe(item => {
						//console.log('Items => '+JSON.stringify(item));
						let agentIndex = item.findIndex(x => x.chatref == this.chatroomref);
						if (agentIndex == -1) {
							this.currentGroupsRef.push({
								chatref: this.chatroomref
							});
							//also push this key to addedagents table
							this.currentAgentRef1 = this.db.list(`/addedagents`);
							let chatref1 = localStorage.getItem('chatrefchat');
							chatref1 = chatref1.split('/chats/')[1].split(',')[0];
							this.currentAgentRef1.push({
								agentid: this.agentkeys[currentInd],
								email: this.groupAgentsList[currentInd],
								anoynomousUid: chatref,
								source: 'admin',
								chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
							});
							resolve(true);
						} else resolve(true);
					});
				}).then(succ => {
					if (succ == true) {
						currentInd++;
						return this.recAgent(currentInd, agentArr);
					}
				});
			} else {
				//console.log('complete recursion ..')
			}
		};
		this.formatDate = time => {
			let objd = new Date(time);
			let day_temp = objd.getDate();
			let ordinal_suffix_of = i => {
				let j = i % 10,
					k = i % 100;
				if (j == 1 && k != 11) {
					return i + 'st';
				}
				if (j == 2 && k != 12) {
					return i + 'nd';
				}
				if (j == 3 && k != 13) {
					return i + 'rd';
				}
				return i + 'th';
			};
			let day = ordinal_suffix_of(day_temp);
			let year = objd.getFullYear();
			let month = new Array();
			month[0] = 'January';
			month[1] = 'February';
			month[2] = 'March';
			month[3] = 'April';
			month[4] = 'May';
			month[5] = 'June';
			month[6] = 'July';
			month[7] = 'August';
			month[8] = 'September';
			month[9] = 'October';
			month[10] = 'November';
			month[11] = 'December';
			let month_name = month[objd.getMonth()];
			let formatted_date = day + ' ' + month_name + ' ' + year;
			var currentDate = new Date();
			var datePrevious = new Date();
			datePrevious.setDate(datePrevious.getDate() - 1);
			if (objd.getDate() == currentDate.getDate() && objd.getMonth() == currentDate.getMonth() && objd.getFullYear() == currentDate.getFullYear()) {
				return 'Today';
			} else if (objd.getDate() == datePrevious.getDate() && objd.getDay() == datePrevious.getDay() && objd.getFullYear() == datePrevious.getFullYear()) {
				return 'Yesterday';
			} else {
				return formatted_date;
			}
		};

		// add group check exist or not
		/*this.http.post(this.apiUrl + 'group', body, {
			headers: headers
		})
		.subscribe(res => {
			this.groupAgentdata = res.json()
			if (this.groupAgentdata.data == "" || this.groupAgentdata.data == null) {
				this.nogroup = false;
			} else {
				this.nogroup = true;
			}
		}, (err) => {
			this.errdata = err.json()
			if (this.errdata.error == 'token_invalid') {
				this.events.publish(('user:checksession'))
			}
		});*/

		this.checkagent = (agentemail, ind) => {
			let agentTempId = localStorage.chatrefchat.split('/chats/')[1].split(',')[0];
			this.addedAgentRef = this.db.list('/addedagents');
			this.addedAgentRef.subscribe(item => {
				for (let i = 0; i < item.length; i++) {
					if (item[i].email == agentemail && item[i].anoynomousUid == agentTempId) {
						this.agentclass[ind] = 'agent_add_link active';
					}
				}
			});
		};

		this.checkGroup = (group_id, ind) => {
			let anoynomousTempId = localStorage.chatrefchat.split('/chats/')[1].split(',')[0];
			this.addedGroupRef = this.db.list('/addedgroups');
			this.addedGroupRef.subscribe(item => {
				//console.log('fetching group list'+JSON.stringify(item));
				for (let i = 0; i < item.length; i++) {
					if (item[i].group_id == group_id && item[i].anoynomousUid == anoynomousTempId) {
						// alert('already present')
						//console.log('Inside Deactive link ')
						this.groupclass[ind] = 'agent_add_link active';
					}
				}
			});
		};

		for (let i = 0; i < this.agentlist.length; i++) {
			this.agentclass[i] = 'agent_add_link';
		}

		/*****  Code to fetch the user which should receive notification ******/
		let agentsLocalList = this.db.list(`/agents`);
		let idChat = localStorage.getItem('chatrefchat').split('/')[2];
		agentsLocalList.subscribe(resp => {
			let tempNoti = [];
			localStorage.getItem('chatfirsttype') == '2'
				? (tempNoti = [])
				: (tempNoti = [
						{
							key: localStorage
								.getItem('chatrefchat')
								.split('/')[2]
								.split(',')[1],
							fcm: false
						}
					]);
			for (let j = 0; j < resp.length; j++) {
				for (let key in resp[j]) {
					if (resp[j][key].chatref == idChat) {
						let tempInd = tempNoti.findIndex(x => x.key == resp[j].$key);
						if (tempInd == -1) tempNoti.push({ key: resp[j].$key, fcm: false });
						continue;
					}
				}

				if (j == resp.length - 1) {
					this.usersNotification = tempNoti;
					for (let m = 0; m < this.usersNotification.length; m++) {
						let usersTokenList = this.db.object(`/users/${this.usersNotification[m].key}`);
						usersTokenList.subscribe(item => {
							if (item.FCMToken != undefined && this.usersNotification) {
								if (item.FCMToken != 'null') {
									this.usersNotification[m].fcm = item.FCMToken;
									this.usersNotification[m].id = item.id;
									this.usersNotification[m].userType = item.userType;
									if (m == this.usersNotification.length - 1) this.removeIDWhenNotAllow(0);
								} else {
									this.usersNotification[m].fcm = false;
									this.usersNotification[m].id = item.id;
									this.usersNotification[m].userType = item.userType;
									if (m == this.usersNotification.length - 1) this.removeIDWhenNotAllow(0);
								}
							} else {
								// this.usersNotification[m].fcm=false;
								if (this.usersNotification[m].fcm) {
									this.usersNotification[m].fcm = false;
								}
								this.usersNotification[m].id = item.id;
								this.usersNotification[m].userType = item.userType;
								if (m == this.usersNotification.length - 1) this.removeIDWhenNotAllow(0);
							}
						});
					}
				}
			}
		});
	}
	/** send notifications to only users which allow and enables to receive notifications **/
	removeIDWhenNotAllow(index) {
		// console.log('>> this.usersNotification in remove', JSON.stringify(this.usersNotification));
		var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		if (index == 0) this.manageIDArr = Object.assign([], this.usersNotification);
		if (index < this.usersNotification.length) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
			//console.log('this.usersNotification ',JSON.stringify(this.usersNotification));
			let body = JSON.stringify({
				userId: this.usersNotification[index].id,
				userType: this.usersNotification[index].userType
			});
			this.http.post(this.apiUrl + 'get-user-profile', body, { headers: headers }).subscribe(res => {
				let output = res.json();
				this.commondata.profile = output.data.profile;
				if (output.data.operation_hours.notification_status == 0) {
					this.manageIDArr.splice(index, 1);
					index++;
					this.removeIDWhenNotAllow(index);
				} else {
					if (output.data.operation_hours[dayNames[new Date().getDay()]] == '') {
						this.manageIDArr.splice(index, 1);
						index++;
						this.removeIDWhenNotAllow(index);
					} else {
						let lower = output.data.operation_hours[dayNames[new Date().getDay()]].split('-')[0];
						let upper = output.data.operation_hours[dayNames[new Date().getDay()]].split('-')[1];
						if (output.data.operation_hours.time_format == '12') {
							let lowerComplex = { hour: 0, minute: 0 };
							let upperComplex = { hour: 0, minute: 0 };
							if (lower.split(' ')[1] == 'AM') {
								lowerComplex.hour = lower.split(' ')[0].split(':')[0];
								lowerComplex.minute = lower.split(' ')[0].split(':')[1];
							} else {
								lowerComplex.hour = parseInt(lower.split(' ')[0].split(':')[0]) + 12;
								lowerComplex.minute = lower.split(' ')[0].split(':')[1];
							}
							if (upper.split(' ')[1] == 'AM') {
								upperComplex.hour = upper.split(' ')[0].split(':')[0];
								upperComplex.minute = upper.split(' ')[0].split(':')[1];
							} else {
								upperComplex.hour = parseInt(upper.split(' ')[0].split(':')[0]) + 12;
								upperComplex.minute = upper.split(' ')[0].split(':')[1];
							}
							let lowerTime = new Date(new Date(new Date().setHours(lowerComplex.hour)).setMinutes(lowerComplex.minute)).getTime();
							let upperTime = new Date(new Date(new Date().setHours(upperComplex.hour)).setMinutes(upperComplex.minute)).getTime();
							if (lowerTime == upperTime) {
								index++;
								this.removeIDWhenNotAllow(index);
							} else if (lowerTime <= new Date().getTime() && new Date().getTime() <= upperTime) {
								index++;
								this.removeIDWhenNotAllow(index);
							} else {
								this.manageIDArr.splice(index, 1);
								index++;
								this.removeIDWhenNotAllow(index);
							}
						} else {
							let lowerTime = new Date(new Date(new Date().setHours(lower.split(':')[0])).setMinutes(lower.split(':')[1])).getTime();
							let upperTime = new Date(new Date(new Date().setHours(upper.split(':')[0])).setMinutes(upper.split(':')[1])).getTime();
							if (lowerTime == upperTime) {
								index++;
								this.removeIDWhenNotAllow(index);
							} else if (lowerTime <= new Date().getTime() && new Date().getTime() <= upperTime) {
								index++;
								this.removeIDWhenNotAllow(index);
							} else {
								this.manageIDArr.splice(index, 1);
								index++;
								this.removeIDWhenNotAllow(index);
							}
						}
					}
				}
			});
		} else {
			this.usersNotification = Object.assign([], this.manageIDArr);
			this.manageIDArr = [];
		}
	}

	ionViewDidLoad() {
		if (this.commondata.userstatus == undefined || this.commondata.userstatus == null || this.commondata.userstatus == '') {
			this.commondata.userstatus = 'online';
		}
	}

	disableOtherUsers(ref, userID, times) {
		if (times) {
			if (localStorage.getItem('chatfirsttype') != '2') this.addedAgentFTime(ref, userID);
		}
		let agentsLocalListTemp = this.db.list(`/agents`);
		let lengthTemp = 0;
		let testTemp = 0;
		agentsLocalListTemp.subscribe(data => {
			lengthTemp = data.length;
		});

		let agentsLocalList = firebase.database().ref(`/agents/`);
		agentsLocalList.once('value', item => {
			let resp = item.val();
			let tempNoti = [];
			for (let j in resp) {
				testTemp++;
				for (let key in resp[j]) {
					if (resp[j][key].chatref == ref) {
						let tempInd = tempNoti.findIndex(x => x.key == j);
						if (tempInd == -1 && j != userID) tempNoti.push(j);
						continue;
					}
				}
				if (lengthTemp == testTemp) {
					if (localStorage.getItem('chatfirsttype') != '2') tempNoti.push(ref.split(',')[1]);
					this.recusionForDis(0, tempNoti, ref, times);
				}
			}
		});
	}
	/** disable all 1 by 1 **/
	recusionForDis(ind, tempNoti, ref, times) {
		if (ind < tempNoti.length) {
			let id = ref.split(',')[0] + ',' + tempNoti[ind];
			let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
			return new Promise((resolve, reject) => {
				usersLeaveList.once('value', item => {
					resolve(item.val());
				});
			}).then(item => {
				for (let key in item) {
					let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
					itemObservable.update({
						leave: times,
						source: 'update status for my queue'
					});
				}
				ind++;
				return this.recusionForDis(ind, tempNoti, ref, times);
			});
		} else {
			//console.log('recusionForDis complete');
		}
	}

	addedAgentFTime(ref, userID) {
		let agentTableId1 = this.up.firedata2;
		agentTableId1.once('value', item => {
			let itemVal = item.val();
			if (item == null) {
				agentTableId1.push({
					agentid: userID,
					anoynomousUid: ref.split(',')[0],
					email: localStorage.getItem('chatfirstEmail')
				});
			} else {
				let flag = false;
				for (let key in itemVal) {
					if (itemVal[key].agentid == userID && itemVal[key].anoynomousUid == ref.split(',')[0]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					agentTableId1.push({
						agentid: userID,
						anoynomousUid: ref.split(',')[0],
						email: localStorage.getItem('chatfirstEmail')
					});
				}
			}
		});
	}

	/******** Function called when click on leave button ********/

	leaveChat() {
		let id =
			localStorage
				.getItem('chatrefchat')
				.split('/')[2]
				.split(',')[0] +
			',' +
			localStorage.getItem('firebaseuid');
		let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
		return new Promise((resolve, reject) => {
			usersLeaveList.once('value', itemVal => {
				let item = itemVal.val();
				resolve(item);
			});
		}).then(item => {
			for (let key in item) {
				let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
				itemObservable.update({
					leave: true,
					source: 'leavechat'
				});
			}
			this.removeSpecialMsg();

			/** check last page and redirect there **/
			if (localStorage.prevPage == 'MyqueuePage') {
				this.navCtrl.push('MyqueuePage');
			} else if (localStorage.prevPage == 'AllchatPage') {
				this.navCtrl.push('AllchatPage');
			} else {
				this.navCtrl.push('MyqueuePage');
			}
			//this.navCtrl.push(MyqueuePage);
		});
	}

	/******* Remove from added agent table if admin leave *********/
	remFromAddedAgentTable() {
		let addedAgt = firebase.database().ref(`/addedagents/`);
		addedAgt.once('value', item => {
			let itemVal = item.val();
			let flag = false;
			let keyMatch = '';
			for (let key in itemVal) {
				if (
					itemVal[key].email == localStorage.getItem('chatfirstEmail') &&
					itemVal[key].anoynomousUid ==
						localStorage
							.getItem('chatrefchat')
							.split('/chats/')[1]
							.split(',')[0]
				) {
					flag = true;
					keyMatch = key;
					break;
				}
			}
			if (flag) {
				let addedAgtRemove = this.db.list(`/addedagents/${keyMatch}`);
				addedAgtRemove.remove();
			}
			this.managequeueWheLeave();
		});
	}

	managequeueWheLeave() {
		//this.navCtrl.push(MyqueuePage);
	}
	/** we are maintaing when user join chat room so make an entry to special message table with status join , remove that join status also */
	removeSpecialMsg() {
		let loginUserID = localStorage.getItem('firebaseuid');
		let tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
		let specialref = firebase.database().ref(`/specialmessage/${tempref}`);
		specialref.once('value', item => {
			let itemVal = item.val();
			if (item != null) {
				for (let key in itemVal) {
					if (itemVal[key].loginuserid == loginUserID) {
						let userRemove = firebase.database().ref(`/specialmessage/${tempref}/${key}`);
						userRemove.remove();
					}
				}
			}
		});
		let userType;
		let type;
		localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
		this.chats.push({
			name: this.username,
			userid: localStorage.getItem('chatfirstid'),
			email: localStorage.getItem('chatfirstEmail'),
			specialMessage: true,
			joinmessage: `${userType} - Left`,
			time: firebase.database.ServerValue.TIMESTAMP,
			date: new Date(),
			image: localStorage.getItem('imagetosend'),
			type: type
		});

		if (localStorage.getItem('chatfirsttype') != '2') this.remFromAddedAgentTable();
		else this.managequeueWheLeave();
	}

	assignAdminOnLeave() {
		let id = localStorage.getItem('chatrefchat').split('/')[2];
		let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
		return new Promise((resolve, reject) => {
			usersLeaveList.once('value', item => {
				resolve(item.val());
			});
		}).then(item => {
			for (let key in item) {
				let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
				itemObservable.update({
					leave: false,
					source: 'assignAdminOnLeave'
				});
			}
		});
	}

	/** when all left chat room then assign again **/
	assignAgentsWhenAdminLeave() {
		let loginUserId = localStorage.getItem('firebaseuid');
		let tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
		this.disableOtherUsers(tempref, loginUserId, false);
	}

	/**** Join Chat Room Functionality ****/
	joinChat() {
		let id =
			localStorage
				.getItem('chatrefchat')
				.split('/')[2]
				.split(',')[0] +
			',' +
			localStorage.getItem('firebaseuid');
		let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
		return new Promise((resolve, reject) => {
			usersLeaveList.once('value', itemVal => {
				let item = itemVal.val();
				resolve(item);
			});
		}).then(item => {
			for (let key in item) {
				let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
				itemObservable.update({
					leave: false,
					source: 'JoinChat'
				});
			}
			this.addSpecialMessage();
			//this.navCtrl.push(MyqueuePage);
		});
	}

	/** Add joined message to chat room  */
	addSpecialMessage() {
		let loginUserId = localStorage.getItem('firebaseuid');
		let tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
		let specialref = firebase.database().ref(`/specialmessage/${tempref}`);
		let userType;
		let type;
		/** check user is admin or agent **/
		localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
		specialref.push({
			loginuserid: loginUserId,
			chatref: tempref,
			status: type,
			time: new Date().getTime(),
			join: 'join button own'
		});
		/** if user is admin **/
		if (localStorage.getItem('chatfirsttype') != '2') {
			this.addedAgentFTime(tempref, loginUserId);
		}
		/** push joined special message to chat room  **/
		this.chats.push({
			name: this.username,
			userid: localStorage.getItem('chatfirstid'),
			email: localStorage.getItem('chatfirstEmail'),
			specialMessage: true,
			joinmessage: `${userType} - Joined`,
			time: firebase.database.ServerValue.TIMESTAMP,
			date: new Date(),
			image: localStorage.getItem('imagetosend'),
			type: type
		});
	}

	/**** End Join Chat Room functionality ***/
	checkAvailaibility() {
		let ref = firebase.database().ref('/users/');
		ref
			.once('value', item => {
				this.usersData = item.val();
				if (this.data != null) {
					// console.log('data ==>',JSON.stringify(this.data))
				}
			})
			.then(() => {
				//console.log('associated users for update token ==> ',JSON.stringify(this.usersNotification))
				this.ind = 0;
				this.recForIterateAllData(0, this.usersNotification, this.usersData);
			});
	}

	recForIterateAllData(ind, data, usersData) {
		if (ind < data.length) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
			let body = JSON.stringify({
				userId: data[ind].id,
				userType: data[ind].userType
			});
			/** get user profile data , notifications receive time  **/
			this.http.post(this.apiUrl + 'get-user-profile', body, { headers: headers }).subscribe(res => {
				let output = res.json();
				this.commondata.profile = output.data.profile;
				this.getCurrentTime(output.data.operation_hours, usersData);
			});
		}
	}
	/** function receive parameter of notification day and timing **/
	getCurrentTime(output, usersData) {
		//operation hours ==>JSON.stringify(output)
		let day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		let currentDay = day[new Date().getDay()];
		//current day ==>',currentDay
		var hour;
		var minute;
		for (let key in output) {
			if (key == currentDay) {
				if (output[key] != '') {
					//send notification else delete token
					//update code FCM key
					if (output[key].split('-')[0].split(' ')[1] == 'AM') {
						hour = output[key]
							.split('-')[0]
							.split(' ')[0]
							.split(':')[0];
						minute = output[key]
							.split('-')[0]
							.split(' ')[0]
							.split(':')[1];
					} else {
						hour =
							parseInt(
								output[key]
									.split('-')[0]
									.split(' ')[0]
									.split(':')[0]
							) + 12;
						minute = output[key]
							.split('-')[0]
							.split(' ')[0]
							.split(':')[1];
					}

					let upperMili = new Date();
					upperMili.setHours(hour);
					upperMili.setMinutes(minute);
					let uperMilliseconds = new Date(upperMili).getTime();
					if (output[key].split('-')[1].split(' ')[1] == 'AM') {
						hour = output[key]
							.split('-')[1]
							.split(' ')[0]
							.split(':')[0];
						minute = output[key]
							.split('-')[1]
							.split(' ')[0]
							.split(':')[1];
					} else {
						hour =
							parseInt(
								output[key]
									.split('-')[1]
									.split(' ')[0]
									.split(':')[0]
							) + 12;
						minute = output[key]
							.split('-')[1]
							.split(' ')[0]
							.split(':')[1];
					}
					let lowerMili = new Date();
					lowerMili.setHours(hour);
					lowerMili.setMinutes(minute);
					let lowerMiliseconds = new Date(lowerMili).getTime();
					/** get current miliseconds **/
					var currentMiliSec = new Date().getTime();
					if (currentMiliSec >= uperMilliseconds && currentMiliSec <= lowerMiliseconds) {
						//console.log('send notification')
					} else {
						// current Time not lying in the set time
						// this.usersData ==> usersData
						for (let key in usersData) {
							if (usersData[key].id == output.user_id) {
								// delete this id fcm  ==> usersData[key].id
								let dbref = firebase.database().ref(`/users/${key}`);
								dbref
									.update({
										FCMToken: ''
									})
									.then(() => {
										//call recursive functiuion
										this.ind++;
										this.recForIterateAllData(this.ind, this.usersNotification, usersData);
									});
							}
						}
					}
				} else {
					//else blank
					// update that key record
					for (let key in usersData) {
						// console.log('key->',key)
						if (usersData[key].id) {
							// console.log(usersData[key].id+'=='+output.user_id)
							if (usersData[key].id == output.user_id) {
								// console.log('true ==>')
								let ref = firebase.database().ref(`/users/${key}`);
								ref.update({ FCMToken: '' });
								this.recForIterateAllData(0, this.usersNotification, usersData);
							}
						}
					}
				}
			}
		}
	}

	sendmymessage() {
		/** trim whitespace **/
		if (this.message.trim() == '') return;
		let finalArrToken = [];
		// usersNotification =>  JSON.stringify(this.usersNotification
		for (let k = 0; k < this.usersNotification.length; k++) {
			if (this.usersNotification[k].fcm != false) finalArrToken.push(this.usersNotification[k].fcm);
		}
		if (this.disableUser) this.disableUser = false;
		//  finalArrToken => finalArrToken
		if (this.message == '' || this.message == undefined) {
			//
		} else {
			if (localStorage.getItem('chatfirsttype') == '2') {
				this.chattype = 'company';
			} else {
				this.chattype = 'agent';
			}

			if (finalArrToken.length > 0) {
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('Authorization', 'key=' + this.commondata.fbconfig.apiKey);
				/** For Set Notification title name */
				let notifyName;
				if (localStorage.chatfirsttype == 2 && localStorage.chatfirstName) {
					notifyName = localStorage.chatfirstName + '- Admin';
				} else if (localStorage.chatfirsttype == 3 && localStorage.chatfirstName) {
					notifyName = localStorage.chatfirstName + '- Company';
				} else {
					notifyName = 'Custom Ionic';
				}
				/** End For Set Notification title name */
				let body = {
					notification: {
						title: notifyName,
						body: this.message,
						sound: 'default',
						click_action: 'FCM_PLUGIN_ACTIVITY',
						icon: 'fcm_push_icon'
					},
					registration_ids: finalArrToken
				};
				this.http
					.post('https://fcm.googleapis.com/fcm/send', body, {
						headers: headers
					})
					.subscribe(
						res => {
							//console.log('res => '+JSON.stringify(res));
						},
						err => {
							// console.log('res err => '+JSON.stringify(err));
						}
					);
			}

			let id =
				localStorage
					.getItem('chatrefchat')
					.split('/')[2]
					.split(',')[0] +
				',' +
				localStorage.getItem('firebaseuid');
			let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
			return new Promise((resolve, reject) => {
				usersLeaveList.once('value', item => {
					let itemVal = item.val();
					resolve(itemVal);
				});
			}).then(itemVal => {
				for (let key in itemVal) {
					if (itemVal[key].leave == true) {
						let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
						itemObservable.update({
							leave: false,
							source: 'sendmessage'
						});
						let userType;
						let type;
						localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
						this.chats.push({
							name: this.username,
							userid: localStorage.getItem('chatfirstid'),
							email: localStorage.getItem('chatfirstEmail'),
							specialMessage: true,
							joinmessage: `${userType} - Joined`,
							time: firebase.database.ServerValue.TIMESTAMP,
							date: new Date(),
							image: localStorage.getItem('imagetosend'),
							type: this.chattype
						});
						this.inUserWhenMsgAfterLeave();
					}
					this.chats
						.push({
							name: this.username,
							userid: this.useridkey,
							email: localStorage.getItem('chatfirstEmail'),
							specialMessage: false,
							message: this.message,
							time: firebase.database.ServerValue.TIMESTAMP,
							date: new Date(),
							image: this.showimage,
							type: this.chattype
						})
						.then(() => {
							setTimeout(() => {
								if (this.content._scroll) this.content.scrollToBottom();
							}, 500);
						})
						.catch(() => {});
					this.message = '';
				}
			});
		}
	}

	/****** Include user in chat reference when user message after leave *********/
	inUserWhenMsgAfterLeave() {
		let loginUserId = localStorage.getItem('firebaseuid');
		let tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
		let specialref = firebase.database().ref(`/specialmessage/${tempref}`);
		let userType;
		let type;
		localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
		specialref.push({
			loginuserid: loginUserId,
			chatref: tempref,
			status: type,
			time: new Date().getTime(),
			join: 'own'
		});
		if (localStorage.getItem('chatfirsttype') != '2') this.addedAgentFTime(tempref, loginUserId);
	}

	ClickPhoto() {
		this.navCtrl.push('InfoPage');
	}

	mymessage(val) {
		if (val == '' || val == undefined || val == null || val.trim() == '') {
			this.sendmessage = false;
		} else {
			this.sendmessage = true;
		}
	}
	/** when leave chat room page **/
	ionViewWillLeave() {
		localStorage.setItem('prevPage', null);
		localStorage.currentNotiPage = '';
		let id =
			localStorage
				.getItem('chatrefchat')
				.split('/')[2]
				.split(',')[0] +
			',' +
			localStorage.getItem('firebaseuid');
		let usersLeaveList = this.db.list(`/userChatRef/${id}`);
		return new Promise((resolve, reject) => {
			usersLeaveList.subscribe(function(item) {
				resolve(item);
			});
		}).then(item => {
			if (item[0] == undefined) {
				usersLeaveList.push({
					chatRef: id,
					leaveTime: new Date().getTime(),
					leave: false,
					source: 'leavepage'
				});
			} else {
				let itemObservable = this.db.object(`/userChatRef/${id}/${item[0].$key}`);
				itemObservable.update({
					leaveTime: new Date().getTime(),
					source: 'leavepageupdate'
				});
			}
		});
	}

	messagekey(keyvalue) {}

	addagent() {
		//end
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
		let body = JSON.stringify({
			userId: localStorage.getItem('chatfirstid') // chatfirst id is company id
		});
		this.http
			.post(this.apiUrl + 'get-login-agent', body, {
				headers: headers
			})
			.subscribe(
				res => {
					this.data = res.json();
					if (this.data.data == '' || this.data.data == null) {
						this.list = false;
					} else {
						this.list = true;
						this.agentlist = this.data.data;
						//check if email already present
						for (let i = 0; i < this.agentlist.length; i++) {
							this.checkagent(this.agentlist[i].email_id, i);
						}
						//check end
						this.noagent = false;
					}
					//resolve(res.json());
				},
				err => {
					this.errdata = err.json();
					if (this.errdata.error == 'token_invalid') {
						this.events.publish(('user:checksession'));
					}
				}
			);
		//check if agent is already in database
	}

	chatagent(email, index) {
		for (let i = 0; i < this.agentlist.length; i++) {
			if (this.agentlist[i].email_id == email) {
				this.agentclass[i] = 'agent_add_link active';
			}
		}
		// code to set entry in agents table with chat ref
		this.chatroomref = localStorage.getItem('chatrefchat');
		this.chatroomref = this.chatroomref.split('chats/')[1]; // companyid,userid
		//this.up.getUid() //fetching all data from users table
		//.then(uid => {
		let usersList = firebase.database().ref(`/users/`);
		usersList.once('value', item => {
			let itemVal = item.val();
			let cnt = 0;
			for (let key in itemVal) {
				cnt++;
				if (itemVal[key].email == email) {
					this.agentuserid = key;
					cnt = Object.keys(itemVal).length;
				}
				if (cnt == Object.keys(itemVal).length) {
					this.currentAgentRef1 = this.db.list(`/addedagents`);
					let chatref = localStorage.getItem('chatrefchat');
					chatref = chatref.split('/chats/')[1].split(',')[0];
					this.currentAgentRef1.push({
						agentid: this.agentuserid,
						email: email,
						anoynomousUid: chatref,
						source: 'admin1',
						chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
					});

					/****** Entry in User Chat Ref Table  ********/
					let id =
						localStorage
							.getItem('chatrefchat')
							.split('/')[2]
							.split(',')[0] +
						',' +
						this.agentuserid;
					let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
					usersLeaveList.once('value', item => {
						let itemVal = item.val();
						for (let key in itemVal) {
							let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
							itemObservable.update({
								leave: false,
								source: 'enable agent from plus icon add agent'
							});
						}
					});
					/***** End Entry in User Chat Ref  *********/

					let loginUserId = this.agentuserid;
					let tempref = localStorage.getItem('chatrefchat').split('/')[2];
					let specialref = firebase.database().ref(`/specialmessage/${tempref}`);
					specialref.push({
						loginuserid: loginUserId,
						chatref: tempref,
						status: 'agent',
						time: new Date().getTime(),
						join: 'admin'
					});
					break;
				}
			}
		});
	}

	/** click n + icon off add group **/
	addGroup() {
		this.nogroup = false;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
		/* Uncomment for groups*/
		/* let body = JSON.stringify({
			 userId: localStorage.getItem('chatfirstid'),
		 });*/

		/**** Api to fetch group list  */
		/*this.http.post(this.apiUrl + 'group', body, {
			headers: headers
		}).subscribe((res) => {
				this.groupAgentdata = res.json();
				if (this.groupAgentdata.data == "" || this.groupAgentdata.data == null) {
					this.checklist = false;
				} else {
					this.grouplist = this.groupAgentdata.data;
					this.checklist = true;
					//check if group already present
					for (let i = 0; i < this.grouplist.length; i++) {
						this.checkGroup(this.grouplist[i].group_id, i); //call this func
					}
					//end
				}
			}, (err) => {
				this.errdata = err.json()
				if (this.errdata.error == 'token_invalid') {
					this.events.publish(('user:checksession'))
				}
			}
		)*/
	}

	//to fetch all agents when click to particular group
	chatGroup(group_id, group_name, i) {
		for (let i = 0; i < this.grouplist.length; i++) {
			if (this.grouplist[i].group_id == group_id) {
				this.groupclass[i] = 'agent_add_link active';
			}
		}
		//also push this key to addedagents table
		this.currentGroup = this.db.list(`/addedgroups`);
		let chatref = localStorage.getItem('chatrefchat');
		chatref = chatref.split('/chats/')[1].split(',')[0]; //get clicked users id
		this.currentGroup.push({
			group_id: group_id,
			group_name: group_name,
			anoynomousUid: chatref
		});
		/******Api to get all agents chat list here based on particular group id  */
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));

		let body = JSON.stringify({
			userId: localStorage.getItem('chatfirstid'),
			groupId: group_id
		});
		this.http
			.post(this.apiUrl + 'getGroupAgent', body, {
				headers: headers
			})
			.subscribe(
				res => {
					this.allAgentsList = res.json();
					if (this.groupAgentdata.data == '' || this.groupAgentdata.data == null) {
						//if
					} else {
						this.groupAgentsList = [];
						for (var i = 0; i < this.allAgentsList.agentList.length; i++) {
							if (this.allAgentsList.agentList[i].groupStatus == 1) {
								this.groupAgentsList.push(this.allAgentsList.agentList[i].email);
							}
						}
						this.chatroomref = localStorage.getItem('chatrefchat').split('chats/')[1]; // companyid,userid

						/***********Code to fetch the firebase id of agents*********/
						let usersList = firebase.database().ref(`/users/`);
						usersList.once('value', item => {
							let itemVal = item.val();
							let firebaseIdArr = [];
							let cnt = 0;
							for (let key in itemVal) {
								let ind = this.groupAgentsList.indexOf(itemVal[key].email);
								cnt++;
								if (ind != -1) {
									firebaseIdArr.push({ key: key, email: itemVal[key].email });
								}
								if (cnt == Object.keys(itemVal).length) {
									this.addAgentsInChatRefWhenGroupsAdd(0, firebaseIdArr);
								}
							}
						});
					}
				},
				err => {
					this.errdata = err.json();
					if (this.errdata.error == 'token_invalid') {
						this.events.publish(('user:checksession'));
					}
				}
			);
		/******End Api to get all agents chat list here based on particular group id  */
	}

	addAgentsInChatRefWhenGroupsAdd(index, firebaseIdArr) {
		//console.log('firebaseIdArr => '+JSON.stringify(firebaseIdArr));
		if (index < firebaseIdArr.length) {
			let id =
				localStorage
					.getItem('chatrefchat')
					.split('/')[2]
					.split(',')[0] +
				',' +
				firebaseIdArr[index].key;
			let usersLeaveList = firebase.database().ref(`/userChatRef/${id}`);
			usersLeaveList.once('value', item => {
				let itemVal = item.val();
				if (item != null) {
					for (let key in itemVal) {
						let itemObservable = this.db.object(`/userChatRef/${id}/${key}`);
						itemObservable.update({
							leave: false,
							source: 'enable agent from plus icon add group'
						});
						index++;
						return this.addAgentsInChatRefWhenGroupsAdd(index, firebaseIdArr);
					}
				}
			});
		} else {
			//console.log('add group recursion for chat reference complete');
			this.addAgentsInAddedAgentWhenGroupsAdd(0, firebaseIdArr);
		}
	}

	/** when user add group so add agents of that group  **/
	/** firebaseIdArr contains all data  **/
	addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr) {
		if (index < firebaseIdArr.length) {
			let addedAgentList = firebase.database().ref(`/addedagents/`);
			let chatref = localStorage
				.getItem('chatrefchat')
				.split('/')[2]
				.split(',')[0];
			addedAgentList.once('value', item => {
				let itemVal = item.val();
				let flag = false;
				if (itemVal == null) {
					addedAgentList.push({
						agentid: firebaseIdArr[index].key,
						email: firebaseIdArr[index].email,
						anoynomousUid: chatref,
						source: 'from added group',
						chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
					});
					index++;
					return this.addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr);
				} else {
					for (let key in itemVal) {
						if (itemVal[key].agentid == firebaseIdArr[index].key && itemVal[key].anoynomousUid == chatref) {
							flag = true;
							break;
						} else {
						}
					}
					if (flag == false) {
						addedAgentList.push({
							agentid: firebaseIdArr[index].key,
							email: firebaseIdArr[index].email,
							anoynomousUid: chatref,
							source: 'from added group',
							chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
						});
						index++;
						return this.addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr);
					} else {
						index++;
						return this.addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr);
					}
				}
			});
		} else {
			//console.log('add group recursion for added agent table complete');
			this.addAgentsInSpclMsgWhenGroupsAdd(0, firebaseIdArr);
		}
	}

	/** also add agent to special message table s p that get know this agent already joined **/
	addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr) {
		if (index < firebaseIdArr.length) {
			let loginUserId = firebaseIdArr[index].key;
			let tempref = localStorage.getItem('chatrefchat').split('/')[2];
			let specialref = firebase.database().ref(`/specialmessage/${tempref}`);
			specialref.once('value', item => {
				let itemVal = item.val();
				if (itemVal == null) {
					specialref.push({
						loginuserid: loginUserId,
						chatref: tempref,
						status: 'agent',
						time: new Date().getTime(),
						join: 'admin'
					});
					index++;
					return this.addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr);
				} else {
					let flag = false;
					for (let key in itemVal) {
						if (itemVal[key].loginuserid == loginUserId) {
							flag = true;
						}
					}
					if (flag == false) {
						specialref.push({
							loginuserid: loginUserId,
							chatref: tempref,
							status: 'agent',
							time: new Date().getTime(),
							join: 'admin'
						});
						index++;
						return this.addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr);
					} else {
						index++;
						return this.addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr);
					}
				}
			});
		} else {
			//console.log('add group recursion for added agent table complete');
		}
	}

	/** update particular chat snippet user's name **/
	updateName(uname) {
		var interlocutor;
		if (localStorage.chatfirsttype == 2) {
			/** param id contains id of the user u want to chat **/
			interlocutor = localStorage.getItem('paramid');
			if (uname != '') {
				this.db.list('/users').update(interlocutor, {
					username: uname
				});
			}
		} else {
			interlocutor = localStorage.getItem('paramid').split(',')[0];
			if (uname != '') {
				this.db.list('/users').update(interlocutor, {
					username: uname
				});
			}
		}

		if (uname != '') {
			/*** code to update name  in visitors table  ***/
			let visitorUpdateRef = firebase.database().ref('/visitors');
			visitorUpdateRef.once('value', item => {
				let items = item.val();
				for (let key in items) {
					for (let key1 in items[key]) {
						console.log('data :: ', JSON.stringify(items[key][key1]));
						/*** update code */
						if (items[key][key1].anoynomousUid == interlocutor) {
							let updatePath = firebase.database().ref(`/visitors/${key}/${key1}`);
							updatePath.update({ name: uname });
						}
					}
				}
			});
		}
	}

	/** update snippet user email id **/
	updateEmail(uemail) {
		if (uemail != '') {
			let interlocutor = localStorage.getItem('paramid');
			this.db.list('/users').update(interlocutor, {
				email: uemail
			});
		}
	}
	/** update user email id  **/
	updateMobile(umobile) {
		if (umobile != '') {
			let interlocutor = localStorage.getItem('paramid');
			this.db.list('/users').update(interlocutor, {
				mobile: umobile
			});
		}
	}
}



// WEBPACK FOOTER //
// ./src/pages/mychat/mychat.ts
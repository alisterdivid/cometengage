webpackJsonp([19],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommondataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommondataProvider = (function () {
    function CommondataProvider(http, events, modalCtrl, alertCtrl) {
        this.http = http;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        /** Declare variables **/
        this.userid = localStorage.getItem('chatfirstid') || 0;
        this.usertoken = localStorage.getItem('chatfirsttoken') || '';
        this.useremail = localStorage.getItem('chatfirstEmail') || '';
        this.userimage = localStorage.getItem('chatfirstImage') || '';
        this.usertype = localStorage.getItem('chatfirsttype') || '';
        this.username = localStorage.getItem('chatfirstName') || '';
        this.plan = 'free';
        this.profile = {};
        this.fbconfig = {
            apiKey: 'AIzaSyCI4q4Tjh9BPWRTkqxLKs1mrFrKggssOgo',
            authDomain: 'cometengage.firebaseapp.com',
            databaseURL: 'https://cometengage.firebaseio.com',
            projectId: 'cometengage',
            storageBucket: 'cometengage.appspot.com',
            messagingSenderId: '316966730584'
        };
        this.apiUrl = 'https://api.cometengage.com/api/';
        this.appUrl = 'https://app.cometengage.com/';
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
    return CommondataProvider;
}());
CommondataProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], CommondataProvider);

//# sourceMappingURL=commondata.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersproviderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsersproviderProvider = (function () {
    function UsersproviderProvider(http, local, db) {
        this.http = http;
        this.local = local;
        this.db = db;
        this.firedata = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/users');
        this.firedata1 = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/users/interlocutor');
        this.firedata2 = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/addedagents');
        this.spclMsgProvider = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/specialmessage');
    }
    UsersproviderProvider.prototype.getUid = function () {
        return this.local.get('uid');
    };
    /** get all users service **/
    UsersproviderProvider.prototype.getallusers = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firedata
                .orderByChild('uid')
                .once('value', function (snapshot) {
                var userdata = snapshot.val();
                var temparr = [];
                for (var key in userdata) {
                    temparr.push(userdata[key]);
                }
                resolve(temparr);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    return UsersproviderProvider;
}());
UsersproviderProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], UsersproviderProvider);

//# sourceMappingURL=usersprovider.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MessagingServiceProvider = (function () {
    function MessagingServiceProvider(http, db, commondata, afAuth) {
        this.http = http;
        this.db = db;
        this.commondata = commondata;
        this.afAuth = afAuth;
        this.messaging = __WEBPACK_IMPORTED_MODULE_4_firebase__["messaging"]();
        this.currentMessage = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.appUrl = commondata.appUrl;
    }
    MessagingServiceProvider.prototype.getPermission = function () {
        var _this = this;
        this.messaging
            .requestPermission()
            .then(function () {
            // console.log('Notification permission granted.');
            return _this.messaging.getToken();
        })
            .then(function (token) {
            // console.log('token => '+token);
            localStorage.setItem('FCMToken', token);
        })
            .catch(function (err) {
            // console.log('Unable to get permission to notify.', err);
        });
    };
    /** Invoke when user receives message through notification **/
    MessagingServiceProvider.prototype.receiveMessage = function () {
        var _this = this;
        var appUrl = this.appUrl;
        this.messaging.onMessage(function (payload) {
            //console.log("Message received. ", payload);
            if (localStorage.currentNotiPage == 'MychatPage') {
                var soundRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("/notifysounds/" + localStorage.getItem('firebaseuid'));
                soundRef.once('value', function (data) {
                    var item = data.val();
                    if (item != null) {
                        for (var key in item) {
                            var audio = new Audio(appUrl + "assets/sounds/" + item[key].sound);
                            // audio.volume=0.1;
                            item[key].loudSound ? '(audio.volume=1)' : '(audio.volume=0.2)';
                            audio.play();
                        }
                    }
                    else {
                        var audio = new Audio(appUrl + "assets/sounds/default.mp3");
                        audio.play();
                    }
                });
            }
            else if (localStorage.currentNotiPage == 'MyqueuePage') {
                _this.notifyMe(payload.notification.body);
                var soundRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("/notifysounds/" + localStorage.getItem('firebaseuid'));
                soundRef.once('value', function (data) {
                    var item = data.val();
                    if (item != null) {
                        for (var key in item) {
                            var audio = new Audio(appUrl + "assets/sounds/" + item[key].sound);
                            // audio.volume=0.1;
                            item[key].loudSound ? '(audio.volume=1)' : '(audio.volume=0.2)';
                            audio.play();
                        }
                    }
                    else {
                        var audio = new Audio(appUrl + "assets/sounds/default.mp3");
                        audio.play();
                    }
                });
            }
            else {
                _this.notifyMe(payload.notification.body); //show side notification
                var soundRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("/notifysounds/" + localStorage.getItem('firebaseuid'));
                soundRef.once('value', function (data) {
                    var item = data.val();
                    if (item != null) {
                        for (var key in item) {
                            var audio = new Audio(appUrl + "assets/sounds/" + item[key].sound);
                            item[key].loudSound ? '(audio.volume=1)' : '(audio.volume=0.2)';
                            audio.play();
                        }
                    }
                    else {
                        var audio = new Audio(appUrl + "assets/sounds/default.mp3");
                        audio.play();
                    }
                });
            }
            _this.currentMessage.next(payload);
        });
    };
    MessagingServiceProvider.prototype.notifyMe = function (msg) {
        var appUrl = this.appUrl;
        var notification;
        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
        }
        else if (this.permission === 'granted') {
            // Let's check whether notification permissions have already been granted
            notification = new Notification('Notification title', {
                icon: appUrl + 'assets/icon/logo.png',
                body: msg
            });
        }
        else if (this.permission !== 'denied') {
            // Otherwise, we need to ask the user for permission
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === 'granted') {
                    notification = new Notification('Notification title', {
                        icon: appUrl + 'assets/icon/logo.png',
                        body: msg
                    });
                }
            });
        }
    };
    return MessagingServiceProvider;
}());
MessagingServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_8__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
], MessagingServiceProvider);

//# sourceMappingURL=messaging-service.js.map

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 210;

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account/account.module": [
		908,
		18
	],
	"../pages/addgroup/addgroup.module": [
		909,
		17
	],
	"../pages/agent/agent.module": [
		910,
		16
	],
	"../pages/allchat/allchat.module": [
		911,
		15
	],
	"../pages/chat/chat.module": [
		912,
		14
	],
	"../pages/custombutton/custombutton.module": [
		913,
		13
	],
	"../pages/editagent/editagent.module": [
		914,
		12
	],
	"../pages/editgroup/editgroup.module": [
		915,
		11
	],
	"../pages/forgot/forgot.module": [
		916,
		10
	],
	"../pages/group/group.module": [
		917,
		9
	],
	"../pages/home/home.module": [
		918,
		8
	],
	"../pages/info/info.module": [
		919,
		7
	],
	"../pages/login/login.module": [
		920,
		6
	],
	"../pages/mychat/mychat.module": [
		921,
		5
	],
	"../pages/myqueue/myqueue.module": [
		922,
		4
	],
	"../pages/notification/notification.module": [
		923,
		3
	],
	"../pages/prechat/prechat.module": [
		924,
		2
	],
	"../pages/signup/signup.module": [
		925,
		1
	],
	"../pages/visitors/visitors.module": [
		926,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 474;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__usersprovider_usersprovider__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatsProvider = (function () {
    function ChatsProvider(db, up) {
        this.db = db;
        this.up = up;
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/chatusers');
    }
    ChatsProvider.prototype.getChats = function () {
        var _this = this;
        return this.up.getUid().then(function (uid) {
            var chats = _this.db.list("/users/" + uid + "/chats");
            return chats;
        });
    };
    ChatsProvider.prototype.addChats = function (uid, interlocutor) {
        var endpoint = this.db.object("/users/" + uid + "/chats/" + interlocutor);
        endpoint.set(true);
        var endpoint2 = this.db.object("/users/" + interlocutor + "/chats/" + uid);
        endpoint2.set(true);
    };
    ChatsProvider.prototype.getChatRef = function (uid, interlocutor) {
        var _this = this;
        var firstRef = this.db.object("/chats/" + uid + "," + interlocutor, { preserveSnapshot: true });
        var promise = new Promise(function (resolve, reject) {
            firstRef.subscribe(function (snapshot) {
                var a = snapshot.exists();
                if (a) {
                    resolve("/chats/" + uid + "," + interlocutor);
                }
                else {
                    var secondRef = _this.db.object("/chats/" + interlocutor + "," + uid, { preserveSnapshot: true });
                    secondRef.subscribe(function (snapshot) {
                        var b = snapshot.exists();
                        if (!b) {
                            //this.addChats(uid,interlocutor);
                        }
                    });
                    resolve("/chats/" + interlocutor + "," + uid);
                }
            });
        });
        return promise;
    };
    /** to fetch chat from particular room for single agent **/
    ChatsProvider.prototype.getAgentChatRef = function (interlocutor) {
        var _this = this;
        var firstRef = this.db.object("/chats/" + interlocutor, { preserveSnapshot: true });
        var promise = new Promise(function (resolve, reject) {
            firstRef.subscribe(function (snapshot) {
                var a = snapshot.exists();
                if (a) {
                    resolve("/chats/" + interlocutor);
                }
                else {
                    var secondRef = _this.db.object("/chats/" + interlocutor, { preserveSnapshot: true });
                    secondRef.subscribe(function (snapshot) {
                        var b = snapshot.exists();
                        if (!b) {
                            //this.addChats(interlocutor);
                        }
                    });
                    resolve("/chats/" + interlocutor);
                }
            });
        });
        return promise;
    };
    return ChatsProvider;
}());
ChatsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__usersprovider_usersprovider__["a" /* UsersproviderProvider */]])
], ChatsProvider);

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(533);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_cloud_angular__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_action_sheet__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__(843);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_chats_chats__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_commondata_commondata__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_messaging_service_messaging_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_usersprovider_usersprovider__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(907);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var cloudSettings = {
    core: {
        app_id: 'ff033666'
    },
    insights: {
        enabled: false
    },
    push: {
        sender_id: '316966730584',
        pluginConfig: {
            ios: {
                badge: true,
                sound: true
            },
            android: {
                iconColor: '#343434'
            }
        }
    }
};
/** firebase credentials **/
var firebase = {
    apiKey: 'AIzaSyCI4q4Tjh9BPWRTkqxLKs1mrFrKggssOgo',
    authDomain: 'cometengage.firebaseapp.com',
    databaseURL: 'https://cometengage.firebaseio.com',
    projectId: 'cometengage',
    storageBucket: 'cometengage.appspot.com',
    messagingSenderId: '316966730584'
};
var apiUrl = 'https://api.cometengage.com/api/';
var appUrl = 'https://app.cometengage.com/';
if (window.location.host == 'app.chatforyoursite.com') {
    apiUrl = 'https://api.chatforyoursite.com/api/';
    appUrl = 'https://app.chatforyoursite.com/';
    firebase = {
        apiKey: 'AIzaSyBTFld93SKOZoQZXkjdc_OMyImlTH9NPhY',
        authDomain: 'ccapp-00004.firebaseapp.com',
        databaseURL: 'https://ccapp-00004.firebaseio.com',
        projectId: 'ccapp-00004',
        storageBucket: 'ccapp-00004.appspot.com',
        messagingSenderId: '702094498151'
    };
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* CometEngage */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_cloud_angular__["a" /* CloudModule */].forRoot(cloudSettings),
            __WEBPACK_IMPORTED_MODULE_11_angularfire2__["a" /* AngularFireModule */].initializeApp(firebase),
            __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_14_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* CometEngage */], {}, {
                links: [
                    { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/addgroup/addgroup.module#AddgroupPageModule', name: 'AddgroupPage', segment: 'addgroup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/agent/agent.module#AgentPageModule', name: 'AgentPage', segment: 'agent', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/allchat/allchat.module#AllchatPageModule', name: 'AllchatPage', segment: 'allchat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/custombutton/custombutton.module#CustombuttonPageModule', name: 'CustombuttonPage', segment: 'custombutton', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/editagent/editagent.module#EditagentPageModule', name: 'EditagentPage', segment: 'editagent', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/editgroup/editgroup.module#EditgroupPageModule', name: 'EditgroupPage', segment: 'editgroup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/forgot/forgot.module#ForgotPageModule', name: 'ForgotPage', segment: 'forgot', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/group/group.module#GroupPageModule', name: 'GroupPage', segment: 'group', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/info/info.module#InfoPageModule', name: 'InfoPage', segment: 'info', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mychat/mychat.module#MychatPageModule', name: 'MychatPage', segment: 'mychat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/myqueue/myqueue.module#MyqueuePageModule', name: 'MyqueuePage', segment: 'myqueue', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/prechat/prechat.module#PrechatPageModule', name: 'PrechatPage', segment: 'prechat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/visitors/visitors.module#VisitorsPageModule', name: 'VisitorsPage', segment: 'visitors', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_14_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* CometEngage */]],
        providers: [__WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_action_sheet__["a" /* ActionSheet */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_14_ionic_angular__["f" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_16__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_15__providers_chats_chats__["a" /* ChatsProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_usersprovider_usersprovider__["a" /* UsersproviderProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_17__providers_messaging_service_messaging_service__["a" /* MessagingServiceProvider */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CometEngage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_cloud_angular__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_fcm__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_native__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_commondata_commondata__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_messaging_service_messaging_service__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var CometEngage = (function () {
    /** inject all services to constructor **/
    function CometEngage(msgService, platform, statusBar, splashScreen, menuCtrl, alertCtrl, app, http, loadingCtrl, commondata, push, element, events, af, local, fcm, db) {
        var _this = this;
        this.msgService = msgService;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.commondata = commondata;
        this.push = push;
        this.element = element;
        this.events = events;
        this.af = af;
        this.local = local;
        this.fcm = fcm;
        this.db = db;
        this.accessToVisitorsTab = false;
        this.rootPage = 'LoginPage';
        this.status = 'Online';
        this.setstatus = 'status-select online-status';
        this.profilestatus = 'online';
        this.menus = {
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
        this.apiUrl = commondata.apiUrl;
        this.Adminid = localStorage.getItem('companyid');
        /** Events */
        events.subscribe('user:login', function (user) {
            console.log('Event user:login', user);
            if (user) {
                if (user.hasOwnProperty('plan')) {
                    if (user.userId == '18') {
                        user.plan = 'PRO';
                    }
                    _this.plan = user.plan;
                    localStorage.setItem('plan', user.plan);
                    _this.commondata.plan = user.plan;
                }
                _this.setimage();
                var userStatus = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref("/users/" + localStorage.getItem('firebaseuid') + "/");
                userStatus.once('value', function (item) {
                    if (item.val() != null) {
                        if (item.val().isOnline) {
                            _this.status = 'Online';
                        }
                        else {
                            _this.status = 'Offline';
                        }
                    }
                });
            }
            else {
                _this.setActiveMenu('Login');
            }
        });
        events.subscribe('user:sessionexpired', function (data) {
            console.log('Event user:sessionexpired', data);
            _this.sessionexpired();
        });
        events.subscribe('user:checksession', function (data) {
            console.log('Event user:checksession', data);
            _this.checksession();
        });
        events.subscribe('user:logout', function (data) {
            console.log('Event user:logout', data);
            _this.logoutSuccess();
        });
        /**** Web Push Notify */
        platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_11_ionic_native__["d" /* Keyboard */].hideKeyboardAccessoryBar(false);
            _this.events.publish('user:login');
            var loggedinId = localStorage.getItem('chatfirstid');
            if (loggedinId && loggedinId != '0' && loggedinId != 'null' && loggedinId != 'undefined') {
                _this.rootPage = localStorage.getItem('prevPage') || 'MyqueuePage';
                if (_this.platform.is('cordova'))
                    _this.isDevice = true;
                if (_this.isDevice) {
                    fcm.onNotification().subscribe(function (data) {
                        if (data.wasTapped) {
                            //console.log("Received in background");
                        }
                        else {
                        }
                    });
                }
                else {
                    _this.msgService.receiveMessage();
                    _this.message = _this.msgService.currentMessage;
                }
                if (localStorage.getItem('chatfirsttype') == '2') {
                    _this.showtypes = true;
                }
                else {
                    _this.showtypes = false;
                }
                if (_this.commondata.userstatus == undefined || _this.commondata.userstatus == null) {
                    _this.commondata.userstatus = 'online';
                }
                else {
                    _this.commondata.userstatus = 'offline';
                }
                _this.plan = 'trial';
                if (localStorage.getItem('plan') == 'PRO') {
                    _this.plan = 'PRO';
                }
                else if (localStorage.getItem('plan') == 'trial') {
                    _this.plan = 'trial';
                }
                if (localStorage.getItem('hatfirstEmail') == 'demo@demo.com') {
                    _this.plan = 'PRO';
                }
                _this.commondata.plan = _this.plan;
                localStorage.setItem('plan', _this.plan);
            }
            if (_this.platform.is('ios') || _this.platform.is('android')) {
                _this.phone = true;
                _this.commondata.userdevice = false;
                _this.commondata.usertoken = localStorage.getItem('chatfirsttoken');
            }
            else {
                _this.phone = false;
                _this.commondata.userdevice = true;
                var browser = void 0;
                if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
                    browser = 'Chrome';
                }
                else if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                    browser = 'Safari';
                }
                else if (navigator.userAgent.search('Firefox')) {
                    browser = 'Firefox';
                }
                if (localStorage.getItem('browserworking') == undefined) {
                    localStorage.setItem('browserworking', browser);
                }
                else if (localStorage.getItem('browserworking') != browser) {
                    _this.commondata.usertoken = '';
                }
                else {
                    _this.commondata.usertoken = localStorage.getItem('chatfirsttoken');
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
    CometEngage.prototype.logoutuser = function () {
        this.logoutSuccess();
    };
    CometEngage.prototype.setimage = function () {
        var image = this.element.nativeElement.querySelector('.profileimg');
        if (image) {
            this.imagesrc = localStorage.getItem('imagetosend') || 'assets/icon/user_img.png';
            this.content.scrollToTop();
            if (localStorage.getItem('chatfirsttype') == '2') {
                this.showtypes = true;
            }
            else {
                this.showtypes = false;
            }
            image.src = this.imagesrc;
        }
    };
    CometEngage.prototype.registerPush = function () {
        var _this = this;
        this.push
            .register()
            .then(function (t) {
            //console.log('Generated Token' + JSON.stringify(t));
            return _this.push.saveToken(t);
        })
            .then(function (t) {
            //console.log('Token Saved', t);
        });
        this.push.rx.notification().subscribe(function (msg) {
            //console.log('Received notification: ' + msg);
        });
    };
    /** As user select side menu dropdown for online offline **/
    CometEngage.prototype.onChange = function () {
        var currentUserRef = this.db.object("/users/" + localStorage.getItem('firebaseuid'));
        if (this.status == 'Online') {
            this.setstatus = 'status-select online-status';
            this.profilestatus = 'online';
            this.commondata.userstatus = 'online';
            this.statusCounter = 1;
            currentUserRef.update({ isOnline: true });
        }
        else if (this.status == 'Offline') {
            this.setstatus = 'status-select offline-status';
            this.profilestatus = 'offline';
            this.commondata.userstatus = 'offline';
            this.statusCounter = 0;
            currentUserRef.update({ isOnline: false });
        }
        else {
            this.setstatus = 'status-select invisible-status';
            this.profilestatus = 'invisible';
            this.commondata.userstatus = 'invisible';
        }
        /** publish user status **/
        this.events.publish('user:status');
        var loginId = localStorage.getItem('companyid');
        var dbRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref("/supportOnline/" + loginId + "/");
        dbRef.set({ status: this.statusCounter });
    };
    /*** all menu navigation methods ***/
    CometEngage.prototype.setActiveMenu = function (activemenu, setRootPage) {
        if (setRootPage === void 0) { setRootPage = false; }
        for (var menu in this.menus) {
            this.menus[menu] = '';
            if (menu == activemenu) {
                this.menus[menu] = 'active';
            }
        }
        this.menuCtrl.close();
        if (setRootPage) {
            this.rootPage = activemenu + 'Page';
        }
        else {
            this.nav.setRoot(activemenu + 'Page');
        }
    };
    /** menu logout **/
    CometEngage.prototype.logout = function () {
        var _this = this;
        this.menuCtrl.close();
        var confirm = this.alertCtrl.create({
            title: 'Sign Out',
            cssClass: 'logout',
            message: 'Are you sure, you want to sign out?',
            buttons: [
                {
                    text: 'CANCEL',
                    handler: function () {
                        // console.log('Disagree clicked');
                    }
                },
                {
                    text: 'OK',
                    cssClass: 'ok-popup',
                    handler: function () {
                        var loader = _this.loadingCtrl.create({
                            content: 'Please wait...',
                            dismissOnPageChange: true
                        });
                        loader.present();
                        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                        var body = JSON.stringify({
                            userId: localStorage.getItem('chatfirstid')
                        });
                        headers.append('Content-Type', 'application/json');
                        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                        _this.http
                            .post(_this.apiUrl + 'logout', body, {
                            headers: headers
                        })
                            .subscribe(function (res) {
                            loader.dismiss();
                            _this.logoutSuccess();
                        }, function (err) {
                            loader.dismiss();
                            _this.logoutSuccess();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    CometEngage.prototype.checksession = function () {
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish('user:sessionexpired');
        }
    };
    CometEngage.prototype.sessionexpired = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Session expired',
            cssClass: 'logout',
            message: 'Your session expired, please login to continue.',
            buttons: [
                {
                    text: 'OK',
                    cssClass: 'ok-popup',
                    handler: function () {
                        _this.events.publish('user:logout');
                    }
                }
            ]
        });
        confirm.present();
    };
    CometEngage.prototype.logoutSuccess = function () {
        this.fcm.unsubscribeFromTopic(localStorage.getItem('companyid'));
        var currentUserRef = this.db.object("/users/" + localStorage.getItem('firebaseuid'));
        currentUserRef.update({ FCMToken: null, isOnline: false });
        this.local.remove('uid');
        this.af.auth.signOut();
        localStorage.clear();
        this.setActiveMenu('Login');
    };
    return CometEngage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_10_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["c" /* Content */])
], CometEngage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_10_ionic_angular__["l" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["l" /* Nav */])
], CometEngage.prototype, "nav", void 0);
CometEngage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\app\app.html"*/'<ion-split-pane>\n	<ion-menu type="overlay" [content]="someContent" class="cus-menu">\n		<ion-header class="app-header">\n			<div class="user-img">\n				<img src="assets/icon/user_img.png" class="profileimg" />\n				<span [className]="profilestatus"></span>\n			</div>\n		</ion-header>\n		<ion-content class="menu-content">\n			<ion-list class="myque_list">\n				<ion-item [className]="setstatus">\n					<ion-select class="select-popover" [(ngModel)]="status" interface="popover" (ionChange)="onChange()" [selectOptions]="selectOptions">\n						<ion-option value="Online">Online</ion-option>\n						<ion-option value="Offline">Offline</ion-option>\n					</ion-select>\n				</ion-item>\n				<p class="cometengage_menu_category" *ngIf="showtypes">Visitors</p>\n				<ion-item tappable (click)="setActiveMenu(\'Myqueue\')" [ngClass]="menus[\'Myqueue\']">\n					<h2>My Queue</h2>\n				</ion-item>\n\n				<ion-item tappable (click)="setActiveMenu(\'Allchat\')" [ngClass]="menus[\'Allchat\']">\n					<h2>All</h2>\n				</ion-item>\n\n				<ion-item tappable (click)="setActiveMenu(\'Visitors\')" [ngClass]="menus[\'Visitors\']">\n					<h2>Visitors online </h2>\n					<span *ngIf="plan != \'PRO\'" class="cometenage_paid_tag">PRO</span>\n				</ion-item>\n\n				<p class="cometengage_menu_category" *ngIf="showtypes">General</p>\n\n				<ion-item tappable (click)="setActiveMenu(\'Custombutton\')" *ngIf="showtypes" [ngClass]="menus[\'Custombutton\']">\n					<h2>Setup & customize</h2>\n				</ion-item>\n\n				<ion-item tappable (click)="setActiveMenu(\'Prechat\')" *ngIf="showtypes" [ngClass]="menus[\'Prechat\']">\n					<h2>Pre-Chat Form</h2>\n				</ion-item>\n\n				<p class="cometengage_menu_category">Personal</p>\n\n				<ion-item tappable (click)="setActiveMenu(\'Account\')" [ngClass]="menus[\'Account\']">\n					<h2>Accounts</h2>\n				</ion-item>\n\n				<ion-item tappable (click)="setActiveMenu(\'Notification\')" *ngIf="!isDevice" [ngClass]="menus[\'Notification\']">\n					<h2>Notifications</h2>\n				</ion-item>\n\n				<p class="cometengage_menu_category" *ngIf="showtypes">Team</p>\n\n				<ion-item tappable (click)="setActiveMenu(\'Agent\')" *ngIf="showtypes" [ngClass]="menus[\'Agent\']">\n					<h2> Agents </h2>\n					<span *ngIf="plan != \'PRO\'" class="cometenage_paid_tag">PRO</span>\n				</ion-item>\n				<!-- <ion-item tappable (click)="setActiveMenu(\'Group\')" *ngIf="showtypes" [ngClass]="menus[\'Group\']">\n					<h2>Groups</h2>\n				</ion-item> -->\n\n			</ion-list>\n		</ion-content>\n		<ion-footer class="app-footer">\n			<p class="cometengage_username">Logged in as {{commondata.username}},</p>\n			<p class="cometengage_email">{{commondata.useremail}}</p>\n			<ion-item class="cometengage_logout" tappable (click)="logout() ">\n				<ion-icon>\n					<img src="assets/icon/logout_icon.png" />\n				</ion-icon>\n				<h2>Sign Out</h2>\n			</ion-item>\n		</ion-footer>\n	</ion-menu>\n	<ion-nav [root]="rootPage" #someContent main></ion-nav>\n</ion-split-pane>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__providers_messaging_service_messaging_service__["a" /* MessagingServiceProvider */], __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_12__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_cloud_angular__["b" /* Push */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */]])
], CometEngage);

//# sourceMappingURL=app.component.js.map

/***/ })

},[528]);
//# sourceMappingURL=main.js.map
webpackJsonp([3],{

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(942);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationPageModule = (function () {
    function NotificationPageModule() {
    }
    return NotificationPageModule;
}());
NotificationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */])]
    })
], NotificationPageModule);

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ 942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commondata_commondata__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_messaging_service_messaging_service__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotificationPage = (function () {
    function NotificationPage(msgService, navCtrl, navParams, events, commondata, db) {
        this.msgService = msgService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.commondata = commondata;
        this.db = db;
        this.defaultSoundData = {
            sound: 'default.mp3',
            loudSound: false,
            repeatSound: false
        };
        this.audioVolume = {
            low: 0.2,
            high: 1
        };
        this.sounds = {
            'default.mp3': 'Default',
            'nice-cut.mp3': 'Nice Cut',
            'jingle-bells-sms.mp3': 'Jingle Bell',
            'announcement.mp3': 'Announcement',
            'gets-in-the-way.mp3': 'Gets in the way',
            'short-trip.mp3': 'Short trip to the bottom',
            'thrown.mp3': 'Thrown'
        };
        this.soundFiles = Object.keys(this.sounds);
        this.dbnodes = {
            notifysounds: '/notifysounds/',
            users: '/users/'
        };
        this.dbRef = {};
        this.uid = localStorage.getItem('firebaseuid');
        this.appUrl = commondata.appUrl;
        this.soundURL = this.appUrl + 'assets/sounds/';
        this.appLogo = this.appUrl + 'assets/icon/logo.png';
        this.appName = 'CometEngage';
        this.createDBReferences();
        if (!('Notification' in window)) {
            this.permission = false;
            alert('This browser does not support desktop notification');
        }
        else {
            this.permission = Notification['permission'] == 'granted';
        }
        this.updateSoundData();
        //this.setEnableNotification('enter');
    }
    /** IonView Events Start */
    NotificationPage.prototype.ionViewWillEnter = function () {
        this.events.publish('user:checksession');
    };
    NotificationPage.prototype.ionViewDidEnter = function () {
        localStorage.currentNotiPage = 'NotificationPage';
    };
    NotificationPage.prototype.ionViewWillLeave = function () {
        localStorage.currentNotiPage = '';
    };
    /** IonView Events End */
    NotificationPage.prototype.createDBReferences = function () {
        for (var dbnode in this.dbnodes) {
            this.dbRef[dbnode] = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref(this.dbnodes[dbnode] + this.uid);
        }
        console.log(this.dbRef);
    };
    NotificationPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    NotificationPage.prototype.sendNotification = function () {
        var notification = this.notification;
        var setPermission = this.setPermission;
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
        }
        else if (Notification['permission'] === 'granted') {
            notification();
        }
        else if (Notification['permission'] !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    setPermission(true);
                    notification();
                }
            });
        }
    };
    NotificationPage.prototype.notification = function () {
        var sound = this.soundURL + this.sound;
        var loudSound = this.loudSound;
        var appLogo = this.appLogo;
        var appName = this.appName;
        var audio = this.audio;
        audio = new Audio(sound);
        loudSound ? (audio.volume = 1) : (audio.volume = 0.2);
        audio.play();
        new Notification(appName, { icon: appLogo, body: 'Hey there! This is a test notification by ' + appName + '!' });
    };
    NotificationPage.prototype.setPermission = function (granted) {
        this.permission = granted;
        console.log('setPermission granted', granted);
    };
    NotificationPage.prototype.testNotification = function () {
        var soundUrl = this.soundURL;
        var appLogo = this.appLogo;
        var appName = this.appName;
        var audio = this.audio;
        var sounddata = this.defaultSoundData;
        var sounddataRef = this.dbRef.notifysounds;
        if (this.permission) {
            /**Notify sound */
            sounddataRef.once('value', function (data) {
                var itemVal = data.val();
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
        }
        else {
        }
    };
    NotificationPage.prototype.setVolume = function (loudSound) {
        var audio = this.audio;
        audio = new Audio(this.soundURL + this.sound);
        audio.volume = this.audioVolume.low;
        if (loudSound) {
            audio.volume = this.audioVolume.high;
        }
        audio.play();
        this.updateSoundData(null, loudSound, null);
    };
    NotificationPage.prototype.setSound = function (sound) {
        var audio = this.audio;
        audio = new Audio(this.soundURL + sound);
        audio.volume = this.audioVolume.low;
        if (this.loudSound) {
            audio.volume = this.audioVolume.high;
        }
        audio.play();
        this.updateSoundData(sound, null, null);
    };
    NotificationPage.prototype.updateSoundData = function (sound, loudSound, repeatSound) {
        var _this = this;
        if (sound === void 0) { sound = null; }
        if (loudSound === void 0) { loudSound = null; }
        if (repeatSound === void 0) { repeatSound = null; }
        var sounddataRef = this.dbRef.notifysounds;
        var params = {
            sound: sound,
            loudSound: loudSound,
            repeatSound: repeatSound
        };
        sounddataRef.once('value', function (item) {
            var sounddata = {};
            var dataMethod = 'set';
            var itemVal = item.val();
            if (itemVal != null) {
                dataMethod = 'update';
                for (var property in params) {
                    if ((sounddata[property] = params[property]) == null) {
                        sounddata[property] = itemVal[property] || _this.defaultSoundData[property];
                    }
                }
            }
            else {
                for (var property in params) {
                    if ((sounddata[property] = params[property]) == null) {
                        sounddata[property] = _this.defaultSoundData[property];
                    }
                }
            }
            sounddataRef[dataMethod](sounddata).then(function () {
                for (var property in sounddata) {
                    _this[property] = sounddata[property];
                }
            });
        });
    };
    /** Enable notification function call from html click button and when entered in page constructor  */
    NotificationPage.prototype.setEnableNotification = function (type) {
        var _this = this;
        var usersRef = this.dbRef.users;
        console.log('setEnableNotification ', type);
        usersRef
            .once('value', function (item) {
            var itemVal = item.val();
            console.log('got value', itemVal);
            if (itemVal != null) {
                if (itemVal.FCMToken != undefined) {
                    if (itemVal.FCMToken != 'null') {
                        _this.showhide = false;
                    }
                    else {
                        if (type == 'press') {
                        }
                        else {
                            _this.showhide = true;
                        }
                    }
                }
                else {
                    if (type == 'press') {
                    }
                    else {
                        _this.showhide = true;
                    }
                }
            }
        })
            .then(function () {
            console.log('then 1');
            if (type == 'press') {
                var messaging_1 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.messaging();
                messaging_1.useServiceWorker(window['CE_ServiceWorkerRegistration']);
                messaging_1.requestPermission().then(function () {
                    console.log('then 2');
                    messaging_1
                        .getToken()
                        .then(function (token) {
                        console.log('then 3');
                        localStorage.setItem('FCMToken', token);
                        _this.showhide = false;
                        usersRef.update({ FCMToken: token });
                        console.log('FB requestpermission', token);
                        window.location.reload();
                    })
                        .catch(function (err) { });
                });
            }
        });
    };
    return NotificationPage;
}());
NotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notification',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\notification\notification.html"*/'<ion-header class="cus-header remove-back-btn">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Notifications\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n\n	<ion-item *ngIf="!permission">\n		Desktop notification are currently disabled. We strongly recommend enabling it.\n	</ion-item>\n\n	<div class="select-btn footer-select-btn" *ngIf="!permission">\n		<button ion-button block class="green-btn" (click)="setEnableNotification(\'press\')">Enable desktop notification</button>\n	</div>\n\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Notification Sound</ion-label>\n				<ion-select disabled="{{!permission}}" (ionChange)="setSound(this.sound)" [(ngModel)]="sound">\n					<ion-option *ngFor="let soundFile of soundFiles" [value]="soundFile">{{sounds[soundFile]}}</ion-option>\n				</ion-select>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Make it louder</ion-label>\n				<ion-toggle [(ngModel)]="loudSound" checked="loudSound" disabled="{{!permission}}" (ionChange)="setVolume(this.loudSound)"></ion-toggle>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Repeat it for new incoming chats</ion-label>\n				<ion-toggle [(ngModel)]="repeatSound" checked="repeatSound" disabled="{{!permission}}" (ionChange)="updateSoundData(null, null, this.repeatSound)"></ion-toggle>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n\n	<div class="select-btn footer-select-btn new-footer-select-btn">\n		<button ion-button block [disabled]="!permission" class="green-btn" (click)="testNotification()">Send test notification</button>\n	</div>\n\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\notification\notification.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_messaging_service_messaging_service__["a" /* MessagingServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ })

});
//# sourceMappingURL=3.js.map
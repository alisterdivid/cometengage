webpackJsonp([4],{

/***/ 922:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyqueuePageModule", function() { return MyqueuePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myqueue__ = __webpack_require__(941);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyqueuePageModule = (function () {
    function MyqueuePageModule() {
    }
    return MyqueuePageModule;
}());
MyqueuePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__myqueue__["a" /* MyqueuePage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__myqueue__["a" /* MyqueuePage */])]
    })
], MyqueuePageModule);

//# sourceMappingURL=myqueue.module.js.map

/***/ }),

/***/ 941:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyqueuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commondata_commondata__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_usersprovider_usersprovider__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyqueuePage = (function () {
    /** As load page called constructor **/
    function MyqueuePage(navCtrl, menuCtrl, events, db, commondata, up, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.db = db;
        this.commondata = commondata;
        this.up = up;
        this.loadingCtrl = loadingCtrl;
        this.chatsarr = [];
        this.myqueuearr = [];
        this.usertabledata = [];
        this.myqueueshowarr = [];
        this.temparr = [];
        this.filteredusers = [];
        this.myqueuenewarr = [];
        this.agentchatref = [];
        this.agentsarr = [];
        this.chatsagentsarr = [];
        this.myqueueshowagentarr = [];
        this.myqueuenewagentarr = [];
        this.userclass = [];
        this.counterCheckLeave = 0;
        this.notifyStatus = true;
        this.showList = false;
        this.appUrl = commondata.appUrl;
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: false
        });
    }
    /** When 1st load page **/
    MyqueuePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loader.present();
        this.recursFunc = function (i, item) {
            if (i < item.length) {
                var reffChat_1 = item[i].userid + ',' + localStorage.getItem('firebaseuid');
                var tempHighlyt_1 = false;
                var leaveStat_1 = false;
                return new Promise(function (resolve, reject) {
                    _this.currentAgentRef = [];
                    _this.currentAgentRef = _this.db.list("/userChatRef/" + reffChat_1);
                    _this.currentAgentRef.forEach(function (data) {
                        if (i < item.length) {
                            if (data.length > 0) {
                                if (data[data.length - 1].leaveTime < item[i].lastTime) {
                                    tempHighlyt_1 = true;
                                }
                                leaveStat_1 = data[data.length - 1].leave;
                            }
                            resolve(data);
                        }
                    });
                }).then(function (succ) {
                    if (tempHighlyt_1) {
                        if (localStorage.getItem('chatfirsttype') == '2') {
                            if (_this.myqueuenewarr[i] != undefined)
                                _this.myqueuenewarr[i].highlytVal = true;
                        }
                        else {
                            if (_this.myqueuenewagentarr[i] != undefined)
                                _this.myqueuenewagentarr[i].highlytVal = true;
                        }
                    }
                    if (localStorage.getItem('chatfirsttype') == '2') {
                        if (_this.myqueuenewarr[i] != undefined)
                            _this.myqueuenewarr[i].leaveStatus = leaveStat_1;
                        if (_this.myqueuenewarr[i].leaveStatus == false) {
                            _this.counterCheckLeave++;
                        }
                    }
                    else {
                        if (_this.myqueuenewagentarr[i] != undefined)
                            _this.myqueuenewagentarr[i].leaveStatus = leaveStat_1;
                        if (_this.myqueuenewagentarr[i]) {
                            if (_this.myqueuenewagentarr[i].leaveStatus == false) {
                                _this.counterCheckLeave++;
                            }
                        }
                    }
                    if (_this.myqueuenewarr.length > 0) {
                        var _loop_1 = function (i_1) {
                            var chatRefUser = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("/users/" + _this.myqueuenewarr[i_1].userid);
                            chatRefUser.once('value', function (item) {
                                var data = item.val();
                                if (data == null) {
                                }
                                else {
                                    if (_this.myqueuenewarr[i_1].name != data.username) {
                                        _this.myqueuenewarr[i_1].name = data.username;
                                    }
                                }
                            });
                        };
                        /**** Check if users details modified  ****/
                        for (var i_1 = 0; i_1 < _this.myqueuenewarr.length; i_1++) {
                            _loop_1(i_1);
                        }
                    }
                    else {
                        var _loop_2 = function (i_2) {
                            var chatRefUser = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("/users/" + _this.myqueuenewagentarr[i_2].userid);
                            chatRefUser.once('value', function (item) {
                                var data = item.val();
                                //  console.log('data values >>',JSON.stringify(data))
                                if (data == null) {
                                }
                                else {
                                    if (_this.myqueuenewagentarr[i_2].name != data.username) {
                                        _this.myqueuenewagentarr[i_2].name = data.username;
                                        //chatRefUser.update({name:data.username})
                                    }
                                }
                            });
                        };
                        /**** Check if users details modified  ****/
                        for (var i_2 = 0; i_2 < _this.myqueuenewagentarr.length; i_2++) {
                            _loop_2(i_2);
                        }
                    }
                    i++;
                    return _this.recursFunc(i, item);
                });
            }
            else {
                //console.log('recursion complete');
                if (!_this.showList)
                    _this.loader.dismiss();
                _this.showList = true;
            }
        };
        this.menuCtrl.enable(true);
        this.username = localStorage.getItem('chatfirstName');
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined || localStorage.getItem('chatfirsttoken') == '') {
            this.events.publish('user:checksession', 'myqueue');
        }
        if (localStorage.getItem('chatfirsttype') == '2') {
            this.agent = false;
            this.up.getUid().then(function (uid) {
                _this.useridkey = uid;
                _this.chatdata = _this.db.list('/chats');
                _this.chatsarr = [];
                _this.chatdata.forEach(function (element) {
                    _this.chatsarr = element;
                    if (_this.chatsarr.length == 0) {
                        _this.list = false;
                    }
                    else {
                        _this.list = true;
                    }
                    _this.myqueueshowarr = [];
                    _this.myqueuearr = [];
                    _this.myqueuenewarr = [];
                    var _loop_3 = function (i) {
                        if (_this.chatsarr[i].$key.indexOf(_this.useridkey) >= 0) {
                            _this.myqueueshowarr.push(Object.keys(_this.chatsarr[i]).map(function (key) { return _this.chatsarr[i][key]; }));
                        }
                    };
                    for (var i = 0; i < _this.chatsarr.length; i++) {
                        _loop_3(i);
                    }
                    var temp = [];
                    _this.myqueuearr = _this.myqueueshowarr.map(function (item) {
                        return item;
                    });
                    var tempMessage = { message: '', time: '' };
                    for (var i = 0; i < _this.myqueuearr.length; i++) {
                        for (var l = _this.myqueuearr[i].length - 1; l >= 0; l--) {
                            if (_this.myqueuearr[i][l].specialMessage == false || _this.myqueuearr[i][l].specialMessage == undefined) {
                                tempMessage.message = _this.myqueuearr[i][l].message;
                                tempMessage.time = _this.myqueuearr[i][l].time;
                                break;
                            }
                        }
                        for (var j = 0; j < _this.myqueuearr[i].length; j++) {
                            _this.myqueuearr[i][j].highlytVal = false;
                            _this.myqueuearr[i][j].leaveStatus = false;
                            _this.myqueuearr[i][j].showLastMess = tempMessage.message;
                            //console.log('name',this.myqueuearr[i][j].name ,'Last Message >> ',this.myqueuearr[i][j].showLastMess ,'Leave Status >>',this.myqueuearr[i][j].leaveStatus )
                            _this.myqueuearr[i][j].lastTime = tempMessage.time;
                            if (_this.myqueuearr[i][j].type == 'anoynomous') {
                                _this.myqueuenewarr.push(_this.myqueuearr[i][j]); // all anoynomous user message
                            }
                        }
                    }
                    _this.myqueuenewarr = _this.myqueuenewarr.filter(function (item) {
                        if (temp.indexOf(item.userid) < 0) {
                            temp.push(item.userid);
                            return true;
                        }
                        return false;
                    });
                    _this.recursFunc(0, _this.myqueuenewarr);
                    setInterval(function () {
                        _this.recursFunc(0, _this.myqueuenewarr);
                    }, 6000);
                });
            });
        }
        else {
            this.agent = true;
            this.up.getUid().then(function (uid) {
                _this.useridkey = uid;
                _this.agentdata = _this.db.list('/agents');
                _this.chatagentdata = _this.db.list('/chats');
                _this.agentsarr = [];
                _this.agentdata.subscribe(function (element) {
                    _this.agentsarr = element;
                    if (_this.agentsarr.length == 0) {
                        _this.list = false;
                    }
                    else {
                        _this.list = true;
                    }
                    _this.myqueuenewagentarr = [];
                    _this.myqueueshowagentarr = [];
                    _this.agentchatref = [];
                    var agentIndex = _this.agentsarr.findIndex(function (x) { return x.$key == localStorage.getItem('companyid'); });
                    _this.agentchatref.push(_this.agentsarr[agentIndex]);
                    _this.chatagentdata.subscribe(function (element) {
                        _this.chatsagentsarr = element;
                        var temp = [];
                        var tempMessage = { message: '', time: '' };
                        var _loop_4 = function (key) {
                            chatIndex = _this.chatsagentsarr.findIndex(function (x) { return x.$key == _this.agentchatref[0][key].chatref; });
                            if (chatIndex != -1) {
                                _this.myqueueshowagentarr.push(_this.chatsagentsarr[chatIndex]);
                            }
                        };
                        var chatIndex;
                        for (var key in _this.agentchatref[0]) {
                            _loop_4(key);
                        }
                        var temprArr = [];
                        var _loop_5 = function (i) {
                            temprArr.push(Object.keys(_this.myqueueshowagentarr[i]).map(function (key) { return _this.myqueueshowagentarr[i][key]; }));
                        };
                        for (var i = 0; i < _this.myqueueshowagentarr.length; i++) {
                            _loop_5(i);
                        }
                        for (var k = 0; k < temprArr.length; k++) {
                            for (var l = temprArr[k].length - 1; l >= 0; l--) {
                                if (temprArr[k][l].specialMessage == false || temprArr[k][l].specialMessage == undefined) {
                                    tempMessage.message = temprArr[k][l].message;
                                    tempMessage.time = temprArr[k][l].time;
                                    break;
                                }
                            }
                            for (var m = 0; m < temprArr[k].length; m++) {
                                if (temprArr[k][m].type == 'anoynomous') {
                                    temprArr[k][m].highlytVal = false;
                                    temprArr[k][m].leaveStatus = false;
                                    temprArr[k][m].showLastMess = tempMessage.message;
                                    temprArr[k][m].lastTime = tempMessage.time;
                                    _this.myqueuenewagentarr = _this.myqueuenewagentarr.reverse();
                                    _this.myqueuenewagentarr.push(temprArr[k][m]);
                                }
                            }
                        }
                        _this.myqueuenewagentarr = _this.myqueuenewagentarr.filter(function (item) {
                            if (temp.indexOf(item.userid) < 0) {
                                temp.push(item.userid);
                                return true;
                            }
                            return false;
                        });
                        _this.recursFunc(0, _this.myqueuenewagentarr);
                    });
                });
            });
        }
    };
    /** Maintain last page for send receive notification sound manage **/
    MyqueuePage.prototype.ionViewWillLeave = function () {
        localStorage.setItem('prevPage', 'MyqueuePage');
        localStorage.currentNotiPage = '';
    };
    /** Set current Notification Page **/
    MyqueuePage.prototype.ionViewDidEnter = function () {
        localStorage.currentNotiPage = 'MyqueuePage';
    };
    /** when click to particular user so pass its user id **/
    MyqueuePage.prototype.chatkey = function (userid) {
        if (localStorage.getItem('chatfirsttype') == '3') {
            for (var i = 0; i < this.agentsarr.length; i++) {
                for (var key in this.agentsarr[i]) {
                    if (this.agentsarr[i][key].chatref.indexOf(userid) >= 0) {
                        this.agentuserroom = this.agentsarr[i][key];
                    }
                }
            }
            this.agentuserroom = this.agentuserroom.chatref;
            this.param = { interlocutor: this.agentuserroom.chatref };
            localStorage.setItem('paramid', this.agentuserroom);
            this.navCtrl.push('MychatPage', localStorage.getItem('paramid'));
        }
        else {
            this.param = { interlocutor: userid };
            localStorage.setItem('paramid', userid);
            this.navCtrl.push('MychatPage', localStorage.getItem('paramid'));
        }
    };
    /** notification side bar  **/
    MyqueuePage.prototype.notifyMe = function (message, status) {
        var appUrl = this.appUrl;
        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
        }
        else if (this.permission === 'granted') {
            // Let's check whether notification permissions have already been granted
            new Notification('Test Notification', {
                icon: appUrl + 'assets/icon/logo.png',
                body: message
            });
        }
        else if (this.permission !== 'denied') {
            // Otherwise, we need to ask the user for permission
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === 'granted') {
                    new Notification('Test Notification ', {
                        icon: appUrl + 'assets/icon/logo.png',
                        body: message
                    });
                }
            });
        }
    };
    return MyqueuePage;
}());
MyqueuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-myqueue',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\myqueue\myqueue.html"*/'<ion-header class="cus-header remove-back-btn" style="z-index: 99999999;">\n	<ion-navbar hideBackButton="true">\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			My Queue\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="cus_myqueue">\n		<ion-list *ngIf="!agent && showList">\n			<div *ngFor="let key of myqueuenewarr">\n				<ion-item (click)="chatkey(key.userid)" *ngIf="list && !key.leaveStatus">\n					<ion-thumbnail item-start>\n						<img src="assets/icon/user_img.png">\n					</ion-thumbnail>\n					<h2>{{key.name}}</h2>\n					<p [style.color]="key.highlytVal ? \'red\' : \'\'">{{key.showLastMess}}</p>\n					<!-- <p *ngIf="key.highlytVal ? notifyMe(key.showLastMess,false) :\'\'"></p> -->\n					<button ion-button clear item-end>{{key.lastTime | date:\'h:mma\'}}</button>\n				</ion-item>\n			</div>\n\n			<ion-item class="novisitorsfound" *ngIf="counterCheckLeave==0">No Visitors Found </ion-item>\n		</ion-list>\n		<ion-list *ngIf="agent && showList">\n			<div *ngFor="let key of myqueuenewagentarr; let i = index" [className]=u serclass[i]>\n				<ion-item (click)="chatkey(key.userid)" *ngIf="list && !key.leaveStatus">\n					<ion-thumbnail item-start>\n						<img src="assets/icon/user_img.png">\n					</ion-thumbnail>\n					<h2>{{key.name}}</h2>\n					<p [style.color]="key.highlytVal ? \'red\' : \'\'">{{key.showLastMess}}</p>\n					<button ion-button clear item-end>{{key.lastTime | date:\'h:mma\'}}</button>\n				</ion-item>\n			</div>\n\n			<ion-item *ngIf="counterCheckLeave==0">No Visitors Found </ion-item>\n		</ion-list>\n	</div>\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\myqueue\myqueue.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_usersprovider_usersprovider__["a" /* UsersproviderProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* LoadingController */]])
], MyqueuePage);

//# sourceMappingURL=myqueue.js.map

/***/ })

});
//# sourceMappingURL=4.js.map
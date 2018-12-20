webpackJsonp([0],{

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitorsPageModule", function() { return VisitorsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visitors__ = __webpack_require__(945);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VisitorsPageModule = (function () {
    function VisitorsPageModule() {
    }
    return VisitorsPageModule;
}());
VisitorsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__visitors__["a" /* VisitorsPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__visitors__["a" /* VisitorsPage */])]
    })
], VisitorsPageModule);

//# sourceMappingURL=visitors.module.js.map

/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitorsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_chats_chats__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VisitorsPage = (function () {
    function VisitorsPage(navCtrl, menuCtrl, events, commondata, db, loadingCtrl, chatsProvider) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.commondata = commondata;
        this.db = db;
        this.loadingCtrl = loadingCtrl;
        this.chatsProvider = chatsProvider;
        this.VISITOR = true;
        this.ONLINE = true;
        this.STATUS = true;
        this.LOCATION = true;
        this.PAGE = true;
        this.REFERRER = true;
        this.OS = true;
        this.t = true;
        this.rotate = [];
        this.accessToVisitorsTab = false;
        this.fieldsname = [{ name: 'Visitor' }, { name: 'Online' }, { name: 'Status' }, { name: 'Location' }, { name: 'Page' }, { name: 'Referrer' }, { name: 'OS' }];
        this.registerRandomName = function (anoynomousUid, name) {
            var userRandomRefCheck = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/users");
            userRandomRefCheck.once('value', function (snapshot) {
                if (snapshot.hasChild(anoynomousUid)) {
                    //alert('already')
                }
                else {
                    var userRandomRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/users/" + anoynomousUid);
                    userRandomRef.set({ username: name });
                }
            });
        };
        if (localStorage.getItem('plan') != 'free') {
            this.accessToVisitorsTab = true;
        }
    }
    VisitorsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.menuCtrl.enable(true);
        var loader = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        loader.present();
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
        var timeLeft = function (currenttime, starttime) {
            _this.now = new Date(currenttime);
            _this.endDate = new Date(starttime);
            var diff = _this.now - _this.endDate;
            var hours = Math.floor(diff / 3.6e6);
            var minutes = Math.floor((diff % 3.6e6) / 6e4);
            var seconds = Math.floor((diff % 6e4) / 1000);
            if (hours == 0 && minutes == 0) {
                return seconds + ' sec';
            }
            else if (hours == 0 && minutes != 0) {
                return minutes + ' min ' + seconds + ' sec';
            }
            else if (hours != 0 && minutes != 0 && seconds != 0) {
                return hours + ' hr ' + minutes + ' min ' + seconds + ' sec';
            }
        };
        this.db.list("/visitors/" + localStorage.companyid).subscribe(function (item) {
            _this.visitorinfo = item;
            var j = 0;
            var _loop_1 = function () {
                /** check chat happen before **/
                var visitorchatRoomRef = _this.visitorinfo[i].chatRef;
                if (visitorchatRoomRef) {
                    var checkChat = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/chats/");
                    checkChat.once('value', function (snapshot) {
                        if (snapshot.hasChild(visitorchatRoomRef)) {
                            _this.rotate[j] = 'os-img cursor-pointer rotate';
                            j++;
                        }
                        else {
                            _this.rotate[j] = 'os-img cursor-pointer';
                            j++;
                        }
                    });
                }
                /** end check chat happen before **/
                _this.visitorinfo[i].staytime = timeLeft(Date.now(), _this.visitorinfo[i].time);
            };
            for (var i = 0; i < _this.visitorinfo.length; i++) {
                _loop_1();
            }
            setInterval(function () {
                for (var i = 0; i < _this.visitorinfo.length; i++) {
                    _this.visitorinfo[i].staytime = timeLeft(Date.now(), _this.visitorinfo[i].time);
                    /********************* Remove Visitors Chat History  ******************/
                    /**** Hourly Chats Remove Code ****/
                    var setHours = 6;
                    //let setMins=30;
                    // let setSeconds=20;
                    if (_this.visitorinfo[i].staytime != undefined && _this.visitorinfo[i].staytime.includes('hr')) {
                        if (_this.visitorinfo[i].staytime.split(' ')[0] >= setHours) {
                            _this.removeVisitors(_this.visitorinfo[i].anoynomousUid);
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
                _this.showlist = false;
                loader.dismiss();
            }
            else {
                _this.showlist = true;
                loader.dismiss();
            }
        });
    };
    /** remove visitors method **/
    VisitorsPage.prototype.removeVisitors = function (removeVisitorId) {
        var removeVisitorref = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/visitors/" + localStorage.companyid);
        removeVisitorref.once('value', function (snapshot) {
            var vals = snapshot.val();
            for (var key in vals) {
                if (vals[key].anoynomousUid == removeVisitorId) {
                    var removeRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/visitors/" + localStorage.companyid + "/" + key);
                    removeRef.remove();
                }
            }
        });
    };
    VisitorsPage.prototype.chat = function () {
        this.navCtrl.push('MychatPage');
    };
    VisitorsPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    VisitorsPage.prototype.onChange = function () {
        if (this.selected_values.includes('Visitor')) {
            this.VISITOR = true;
        }
        else {
            this.VISITOR = false;
        }
        if (this.selected_values.includes('Online')) {
            this.ONLINE = true;
        }
        else {
            this.ONLINE = false;
        }
        if (this.selected_values.includes('Status')) {
            this.STATUS = true;
        }
        else {
            this.STATUS = false;
        }
        if (this.selected_values.includes('Location')) {
            this.LOCATION = true;
        }
        else {
            this.LOCATION = false;
        }
        if (this.selected_values.includes('Page')) {
            this.PAGE = true;
        }
        else {
            this.PAGE = false;
        }
        if (this.selected_values.includes('Referrer')) {
            this.REFERRER = true;
        }
        else {
            this.REFERRER = false;
        }
        if (this.selected_values.includes('OS')) {
            this.OS = true;
        }
        else {
            this.OS = false;
        }
        if (this.selected_values.length == 3) {
            //do somthing
        }
    };
    /** when click user so redirect to associated chat room **/
    VisitorsPage.prototype.chatWithAnoynomousUser = function (anoynomousUid, name) {
        var _this = this;
        /** Code to update visitor name  ***/
        this.registerRandomName(anoynomousUid, name);
        /*** End Update  */
        var openVisitorWin;
        var idAdmin;
        /** Code to open snippet visitors chat window **/
        if (localStorage.getItem('chatfirsttype') == '2') {
            openVisitorWin = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/visitors/" + localStorage.companyid);
            openVisitorWin.once('value', function (snapshot) {
                //console.log(JSON.stringify(snapshot))
                var values = snapshot.val();
                if (values != null) {
                    for (var key in values) {
                        if (values[key].anoynomousUid == anoynomousUid) {
                            /** set an status */
                            var refForUpdate = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/visitors/" + localStorage.companyid + "/" + key);
                            refForUpdate.update({ openwindow: true }).then(function () {
                                //console.log('open window success');
                            });
                        }
                    }
                }
            });
        }
        else {
            /*** Find associated admin id from agent table there ***/
            var refTemp = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/agents/" + localStorage.companyid);
            refTemp
                .once('value', function (item) {
                var items = item.val();
                if (items != null) {
                    for (var key in items) {
                        idAdmin = items[key].chatref.split(',')[1];
                        return;
                    }
                }
            })
                .then(function () {
                /** Code to open snippet visitors chat window **/
                openVisitorWin = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/visitors/" + idAdmin);
                openVisitorWin.once('value', function (snapshot) {
                    var values = snapshot.val();
                    if (values != null) {
                        for (var key in values) {
                            if (values[key].anoynomousUid == anoynomousUid) {
                                /** set an status */
                                var refForUpdate = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/visitors/" + idAdmin + "/" + key);
                                refForUpdate.update({ openwindow: true }).then(function () {
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
        }
        else {
            var agentdata = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/agents/" + localStorage.companyid);
            agentdata.once('value', function (item) {
                var values = item.val();
                if (values != null) {
                    for (var key in values) {
                        if (values[key].chatref.split(',')[0] == anoynomousUid) {
                            var chatRoomRef = values[key].chatref;
                            var path = "/chats/" + chatRoomRef;
                            localStorage.chatrefchat = path;
                            localStorage.paramid = chatRoomRef;
                            _this.navCtrl.push('MychatPage', chatRoomRef);
                        }
                    }
                }
            });
        }
    };
    return VisitorsPage;
}());
VisitorsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-visitors',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\visitors\visitors.html"*/'<ion-header class="cus-header remove-back-btn" style="z-index: 99999999;">\n	<ion-navbar hideBackButton="true">\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Visitors List\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="cometengage_paid_overlay" *ngIf="accessToVisitorsTab==false">\n		<span class="cometengage_paid_message"> Upgrade to PRO </span>\n	</div>\n	<div class="visitor-wrapper" [ngClass]="{\'cometengage_blur\': accessToVisitorsTab==false}">\n		<div class="visitor-head">\n			<span>Visitors in real time</span>\n			<ion-list class="select-status">\n				<ion-item>\n					<ion-label>\n						<ion-icon name="settings"></ion-icon>\n					</ion-label>\n\n					<ion-select [(ngModel)]="selected_values" multiple="true" class="new-select" (ngModelChange)="onChange()">\n						<ion-option *ngFor="let value of fieldsname" value="{{value.name}}" [selected]="true">{{value.name}}</ion-option>\n					</ion-select>\n				</ion-item>\n			</ion-list>\n		</div>\n		<div class="visitor-inner-heading">\n			View the list of visitors who are currently online on your website and initiate a conversation.\n			<!-- <a> More about the list.</a> -->\n		</div>\n		<div class="visitors-table" *ngIf="showlist">\n			<table>\n				<thead>\n					<tr>\n						<th *ngIf="VISITOR">VISITOR</th>\n						<th *ngIf="ONLINE" class="down-arrow">ONLINE</th>\n						<th *ngIf="STATUS"> STATUS</th>\n						<th *ngIf="LOCATION">LOCATION</th>\n						<th *ngIf="PAGE">PAGE</th>\n						<th *ngIf="REFERRER"> REFERRER</th>\n						<th *ngIf="OS">OS</th>\n					</tr>\n				</thead>\n				<tbody>\n					<tr *ngFor="let visitor of visitorinfo ; let i=index;">\n						<td *ngIf="VISITOR && visitor.checkonline==\'online\' ">\n							<span class="user-icon">\n								<span class="c_dot online"></span>\n								<img src="assets/icon/user-icon.png" class="os-img">\n							</span>\n							<span class="usr-name">{{visitor.name}}</span>\n						</td>\n\n						<td *ngIf="VISITOR && visitor.checkonline != \'online\'">\n							<span class="user-icon">\n								<span class="c_dot offline"></span>\n								<img src="assets/icon/user-icon.png" class="os-img">\n							</span>\n							<span class="usr-name">{{visitor.name}}</span>\n						</td>\n\n						<td *ngIf="ONLINE">{{visitor.staytime}}</td>\n						<td *ngIf="STATUS" (click)=\'chatWithAnoynomousUser(visitor.anoynomousUid,visitor.name)\'>\n							<img src="assets/icon/pointer.png" [className]=\'rotate[i]\'>\n						</td>\n						<!-- <td *ngIf="STATUS" ><img src="assets/icon/pointer.png" [className]=\'rotate[i]\'></td> -->\n						<td *ngIf="LOCATION"> {{visitor.location}}</td>\n						<td *ngIf="PAGE">{{visitor.page}}</td>\n						<td *ngIf="REFERRER">{{visitor.referer}}</td>\n\n						<td *ngIf="OS">\n							<div *ngIf="visitor.browsername==\'Opera\'">\n								<span class="os-img">\n									<img src="assets/icon/icon_opera.png" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'FireFox\'">\n								<span class="os-img">\n									<img src="assets/icon/icon_firefox.jpeg" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'Microsoft Edge\'">\n								<span class="os-img">\n									<img src="assets/icon/icon_edge.png" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'Safari\'">\n								<span class="os-img">\n									<img src="assets/icon/icon_safari.png" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'Internet Explorer\'">\n								<span class="os-img">\n									<img src="assets/icon/icon_explorer.jpeg" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'Chrome\'">\n								<span class="os-img">\n									<img src="assets/icon/icon_chrome.png" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'Blink\'">\n\n								<span class="os-img">\n									<img src="assets/icon/icon_blink.png" class="os-img">\n								</span>\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n							<div *ngIf="visitor.browsername==\'Not Detected\' ">\n								{{visitor.browsername}},\n								<span class="os-img">\n									<img src="assets/icon/{{visitor.platformicon}}" class="os-img">\n								</span>\n							</div>\n						</td>\n					</tr>\n				</tbody>\n			</table>\n		</div>\n		<div class="novisitors" *ngIf="!showlist">\n			<table>\n				<tbody>\n					<td>No Visitors Yet</td>\n				</tbody>\n			</table>\n		</div>\n		<div class="visitor-footer">\n			<!-- Emulated data. Upgrade to a paid plan to view your real visitors. -->\n		</div>\n	</div>\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\visitors\visitors.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_chats_chats__["a" /* ChatsProvider */]])
], VisitorsPage);

//# sourceMappingURL=visitors.js.map

/***/ })

});
//# sourceMappingURL=0.js.map
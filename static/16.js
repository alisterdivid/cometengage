webpackJsonp([16],{

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentPageModule", function() { return AgentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent__ = __webpack_require__(929);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AgentPageModule = (function () {
    function AgentPageModule() {
    }
    return AgentPageModule;
}());
AgentPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__agent__["a" /* AgentPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__agent__["a" /* AgentPage */])]
    })
], AgentPageModule);

//# sourceMappingURL=agent.module.js.map

/***/ }),

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AgentPage = (function () {
    function AgentPage(navCtrl, navParams, menuCtrl, formBuilder, commondata, http, loadingCtrl, alertCtrl, element, events, af, db, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.commondata = commondata;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.element = element;
        this.events = events;
        this.af = af;
        this.db = db;
        this.storage = storage;
        /***** Define Variables  *******/
        this.accessToAgentsTab = false;
        this.submitAttempt = false;
        this.agentlist = [];
        this.emailexist = false;
        this.profilestatus = 'online';
        this.myagentForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]()
        });
        this.apiUrl = commondata.apiUrl;
        if (localStorage.getItem('plan') != 'free') {
            this.accessToAgentsTab = true;
        }
        /*** Check Input Field validation and Store to myagentForm Variable ***/
        this.myagentForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])]
        });
    }
    /*** When user click on add button , Add Agent to BackEnd API ***/
    AgentPage.prototype.addagent = function () {
        var _this = this;
        this.submitAttempt = true;
        this.emailexist = false;
        if (!this.myagentForm.valid) {
        }
        else {
            this.submitAttempt = false;
            if (this.role == 'Agent') {
                this.roletype = 3;
            }
            else {
                this.roletype = 2;
            }
            var loader_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loader_1.present();
            this.validEmailCheck = this.addemail;
            return new Promise(function (resolve, reject) {
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                var body = JSON.stringify({
                    userId: localStorage.getItem('chatfirstid'),
                    userType: _this.roletype,
                    emails: _this.addemail
                });
                _this.http.post(_this.apiUrl + 'add_agent', body, { headers: headers }).subscribe(function (res) {
                    /** On Success Of API Add Agent Alert Box Generated **/
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.data = res.json();
                    if (_this.data.response_code == '401') {
                        _this.emailexist = true;
                    }
                    else {
                        _this.emailexist = false;
                        var alert_1 = _this.alertCtrl.create({
                            title: 'CometEngage',
                            cssClass: 'forgotpass',
                            subTitle: 'Agent added successfully.',
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function (data) {
                                        localStorage.setItem('imageagentsend', '');
                                        _this.addemail = '';
                                        _this.myagentForm.reset();
                                        _this.showagent();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                        resolve(res.json());
                    }
                }, function (err) {
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.errdata = err.json();
                    console.log('err' + JSON.stringify(err));
                    if (_this.errdata.error == 'token_invalid') {
                        _this.events.publish(('user:checksession'));
                    }
                });
            });
        }
    };
    AgentPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad AgentPage');
    };
    AgentPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
        this.profilestatus = this.commondata.userstatus;
        this.events.subscribe('user:status', function () {
            if (_this.commondata.userstatus == 'online') {
                _this.profilestatus = 'online';
            }
            else if (_this.commondata.userstatus == 'offline') {
                _this.profilestatus = 'offline';
            }
            else {
                _this.profilestatus = 'invisible';
            }
        });
        this.menuCtrl.enable(true);
        this.adminemail = localStorage.getItem('chatfirstEmail');
        this.role = 'Agent';
        var image = this.element.nativeElement.querySelector('.agent-img');
        if (localStorage.getItem('imagetosend') == null || localStorage.getItem('imagetosend') == '' || localStorage.getItem('imagetosend') == undefined) {
            image.src = 'assets/icon/user_img.png';
        }
        else {
            image.src = localStorage.getItem('imagetosend');
        }
        var componentRef = this;
        componentRef.showagent();
    };
    /** On Click Of particular user navigate to its Detail Page **/
    AgentPage.prototype.agentdetail = function (agentid) {
        this.navCtrl.push('EditagentPage', { agentid: agentid });
        localStorage.setItem('myagentid', agentid);
    };
    /** Method called on success of fetching list of Agents **/
    AgentPage.prototype.showagent = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            var body = JSON.stringify({
                userId: localStorage.getItem('chatfirstid')
            });
            /** API To get list of agents in Page **/
            _this.http.post(_this.apiUrl + 'get-agent', body, { headers: headers }).subscribe(function (res) {
                _this.data = res.json();
                loader.dismiss();
                loader = null;
                if (_this.data.data == '' || _this.data.data == null) {
                    _this.list = false;
                }
                else {
                    _this.list = true;
                    _this.agentlist = _this.data.data;
                    for (var i = 0; i < _this.agentlist.length; i++) {
                        if (_this.agentlist[i].type == 2) {
                            _this.agentlist[i].role = 'Admin';
                        }
                        else {
                            _this.agentlist[i].role = 'Agent';
                        }
                    }
                }
                resolve(res.json());
            }, function (err) {
                loader.dismiss();
                loader = null;
                _this.errdata = err.json();
                console.log('err' + JSON.stringify(err));
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish(('user:checksession'));
                }
            });
        });
    };
    AgentPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    return AgentPage;
}());
AgentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-agent',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\agent\agent.html"*/'<ion-header class="cus-header remove-back-btn">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Agents\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="cometengage_paid_overlay" *ngIf="accessToAgentsTab==false">\n		<span class="cometengage_paid_message"> Upgrade to PRO </span>\n	</div>\n	<div class="manage-group-wrapper" [ngClass]="{\'cometengage_blur\': accessToAgentsTab==false}">\n		<div class="manage-agent">\n			<ion-card>\n				<ion-card-content>\n					<ion-list>\n						<ion-item>\n							<ion-avatar item-start>\n								<div class="pos-rel">\n									<img src="assets/icon/user_img.png" class="agent-img">\n									<span [className]="profilestatus"></span>\n								</div>\n							</ion-avatar>\n							<h2>{{adminemail}}</h2>\n							<!-- <h3 class="invited">Invited</h3>\n							<p>Owner</p> -->\n							<h3 class="invited">Owner</h3>\n\n						</ion-item>\n					</ion-list>\n				</ion-card-content>\n			</ion-card>\n		</div>\n		<div class="add-agent add-agent-25">\n			<ion-list>\n				<div class="add-item" [formGroup]="myagentForm">\n					<span class="add-icon">\n						<ion-icon name="add"></ion-icon>\n					</span>\n					<ion-item class="new-user-s">\n						<ion-label>Username</ion-label>\n						<ion-input type="text" placeholder="Email" formControlName="email" [(ngModel)]="addemail"></ion-input>\n					</ion-item>\n					<p class="valid-form" *ngIf="!myagentForm.controls.email.valid  && myagentForm.controls.email.dirty">\n						Please enter a valid email.\n					</p>\n					<p class="valid-form" *ngIf="emailexist==true && addemail == validEmailCheck">\n						Email Id already exists, choose the different one.\n					</p>\n				</div>\n				<div class="add-item add-item-25">\n					<ion-item class="account-select">\n						<ion-label>Role</ion-label>\n						<ion-select [(ngModel)]="role">\n							<ion-option selected="true">Agent</ion-option>\n							<ion-option>Admin</ion-option>\n						</ion-select>\n					</ion-item>\n				</div>\n			</ion-list>\n		</div>\n		<div class="add-btn add-btn-25">\n			<button ion-button block (click)="addagent()" [disabled]="!myagentForm.valid">ADD</button>\n		</div>\n		<div class="cus-add-list new-agent-list" *ngIf="list">\n			<ion-grid>\n				<div class="ion-list" *ngFor="let list of agentlist">\n					<ion-row (click)="agentdetail(list.id)">\n						<ion-col col-3 class="xs-col-3">\n							<div class="agent-c_image">\n								<img src="assets/icon/user_img.png" class="agent-img" *ngIf="list.picture == \'\' ">\n								<img src={{list.picture}} class="agent-img" *ngIf="list.picture != \'\' ">\n							</div>\n						</ion-col>\n						<ion-col col-9 class="xs-col-9">\n							<ion-item>\n								<span>{{list.email_id}}</span>\n								<span class="c_agent_name">{{list.role}}</span>\n							</ion-item>\n						</ion-col>\n					</ion-row>\n				</div>\n			</ion-grid>\n		</div>\n	</div>\n	<!-- <div class="chat-icon-block" (click)="chatbutton()" *ngIf="this.commondata.userdevice">\n		<img src="assets/icon/chat_img.png">\n	</div> -->\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\agent\agent.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_7__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], AgentPage);

//# sourceMappingURL=agent.js.map

/***/ })

});
//# sourceMappingURL=16.js.map
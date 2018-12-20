webpackJsonp([11],{

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditgroupPageModule", function() { return EditgroupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editgroup__ = __webpack_require__(934);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditgroupPageModule = (function () {
    function EditgroupPageModule() {
    }
    return EditgroupPageModule;
}());
EditgroupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__editgroup__["a" /* EditgroupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__editgroup__["a" /* EditgroupPage */])]
    })
], EditgroupPageModule);

//# sourceMappingURL=editgroup.module.js.map

/***/ }),

/***/ 934:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditgroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditgroupPage = (function () {
    function EditgroupPage(navCtrl, navParams, menuCtrl, events, commondata, loadingCtrl, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.commondata = commondata;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.groupTitleErr = false;
        this.groupTitleErrMsg = '';
        this.grouplist = [];
        this.toggleval = [];
        this.groupagentid = [];
        this.hidedeslect = true;
        this.showBtnDiv = false;
        this.apiUrl = commondata.apiUrl;
    }
    EditgroupPage.prototype.ionViewDidLoad = function () { };
    /*** When first page Loads  this method invokes automatically ***/
    EditgroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            var body = JSON.stringify({
                userId: localStorage.getItem('chatfirstid'),
                groupId: localStorage.getItem('mygroupid')
            });
            /** API to get group agents information **/
            _this.http.post(_this.apiUrl + 'getGroupAgent', body, { headers: headers }).subscribe(function (res) {
                _this.editgroup = res.json();
                _this.groupName = _this.editgroup.groupName;
                if (_this.editgroup.agentList == '' || _this.editgroup.agentList == null) {
                    _this.list = false;
                }
                else {
                    _this.list = true;
                    _this.grouplist = _this.editgroup.agentList;
                }
                for (var i = 0; i < _this.editgroup.agentList.length; i++) {
                    if (_this.editgroup.agentList[i].groupStatus == 1 || _this.editgroup.agentList[i].groupStatus == true) {
                        _this.toggleval[_this.editgroup.agentList[i].agentId] = true;
                        _this.groupagentid.push(_this.editgroup.agentList[i].agentId);
                    }
                    else {
                        _this.toggleval[_this.editgroup.agentList[i].agentId] = false;
                    }
                }
                _this.showBtnDiv = true;
                loader.dismiss();
                loader = null;
                resolve(res.json());
            }, function (err) {
                loader.dismiss();
                loader = null;
                _this.errdata = err.json();
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish(('user:checksession'));
                }
            });
        });
    };
    EditgroupPage.prototype.savegroup = function () {
        var _this = this;
        /** group field validatons **/
        if (this.groupName == undefined || this.groupName == '') {
            this.groupTitleErrMsg = 'Please enter group name.';
            this.groupTitleErr = true;
            this.groupblankErr = false;
            this.content.scrollToTop();
        }
        else if (this.groupName.length < 2 || this.groupName.length > 30) {
            this.groupTitleErrMsg = 'Group name should be between 2 to 30 characters.';
            this.groupTitleErr = true;
            this.groupblankErr = false;
            this.content.scrollToTop();
        }
        else if (this.groupagentid.length == 0 || this.groupagentid == null || this.groupagentid == undefined) {
            this.groupblankErr = true;
            this.groupTitleErr = false;
        }
        else {
            this.groupTitleErr = false;
            this.groupblankErr = false;
            var loader_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loader_1.present();
            return new Promise(function (resolve, reject) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                var body = JSON.stringify({
                    groupID: localStorage.getItem('mygroupid'),
                    groupName: _this.groupName,
                    agents: _this.groupagentid.toString()
                });
                /*** API to edit group in backend ***/
                _this.http.post(_this.apiUrl + 'edit-group', body, { headers: headers }).subscribe(function (res) {
                    _this.groupdata = res.json();
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.navCtrl.push('GroupPage');
                    resolve(res.json());
                }, function (err) {
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.errdata = err.json();
                    if (_this.errdata.error == 'token_invalid') {
                        _this.events.publish(('user:checksession'));
                    }
                });
            });
        }
    };
    /** Validation for Add group **/
    EditgroupPage.prototype.chaneAddGroup = function (val) {
        if (val == undefined || val == '') {
            this.groupTitleErrMsg = 'Please enter group name.';
            this.groupTitleErr = true;
            this.content.scrollToTop();
        }
        else if (val.length < 2 || val.length > 30) {
            this.groupTitleErrMsg = 'Group name should be between 2 to 30 characters.';
            this.groupTitleErr = true;
            this.content.scrollToTop();
        }
        else {
            this.groupTitleErr = false;
        }
    };
    /** When user click cancel, navigate to Group page **/
    EditgroupPage.prototype.cancel = function () {
        this.navCtrl.push('GroupPage');
    };
    /** When user click back button, navigate to Group page **/
    EditgroupPage.prototype.backbutton = function () {
        this.navCtrl.push('GroupPage');
    };
    /** Code to delete group functionality from API **/
    EditgroupPage.prototype.deletegroup = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete Group',
            cssClass: 'logout',
            message: 'Are you sure, you want to delete group?',
            buttons: [
                {
                    text: 'CANCEL',
                    handler: function () {
                        //console.log('Disagree clicked');
                    }
                },
                {
                    text: 'OK',
                    cssClass: 'ok-popup',
                    handler: function () {
                        var loader = _this.loadingCtrl.create({
                            content: 'Please wait...'
                        });
                        loader.present();
                        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                        var body = JSON.stringify({
                            groupId: localStorage.getItem('mygroupid')
                        });
                        headers.append('Content-Type', 'application/json');
                        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                        /** Hit backend api to delete group name **/
                        _this.http.post(_this.apiUrl + 'delete-group', body, { headers: headers }).subscribe(function (res) {
                            loader.dismiss();
                            loader = null;
                            _this.navCtrl.push('GroupPage');
                        }, function (err) {
                            loader.dismiss();
                            loader = null;
                            _this.errdata = err.json();
                            if (_this.errdata.error == 'token_invalid') {
                                _this.events.publish(('user:checksession'));
                            }
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    EditgroupPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    /** Toggle select and deselect all **/
    EditgroupPage.prototype.selectall = function () {
        this.groupagentid = [];
        for (var i = 0; i < this.grouplist.length; i++) {
            this.toggleval[this.grouplist[i].agentId] = true;
            this.groupagentid.push(this.grouplist[i].agentId);
        }
        this.hidedeslect = true;
    };
    EditgroupPage.prototype.deselectall = function () {
        for (var i = 0; i < this.grouplist.length; i++) {
            this.toggleval[this.grouplist[i].agentId] = false;
        }
        this.groupagentid = [];
        this.hidedeslect = false;
    };
    /** Update toggle value **/
    EditgroupPage.prototype.updateItem = function (val, id) {
        this.groupblankErr = false;
        if (val == true) {
            this.groupagentid.push(id);
        }
        else {
            var index = this.groupagentid.indexOf(id);
            this.groupagentid.splice(index, 1);
        }
        if (this.groupagentid.length == 0) {
            this.hidedeslect = false;
        }
        else {
            this.hidedeslect = true;
        }
    };
    return EditgroupPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Content */])
], EditgroupPage.prototype, "content", void 0);
EditgroupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-editgroup',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\editgroup\editgroup.html"*/'<ion-header class="cus-header new_cus_addgroup">\n	<ion-navbar hideBackButton="true">\n		<button ion-button class="new-signup-ion" (click)="backbutton()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n		<ion-title class="new-signup-tilte">\n			Groups\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="manage-group-wrapper">\n		<div class="manage-group">Edit Group</div>\n		<div class="c_group-field">\n			<ion-list>\n				<ion-item>\n					<ion-label>Username</ion-label>\n					<ion-input type="text" placeholder="#Group 1" maxLength="30" [(ngModel)]="groupName" (ngModelChange)="chaneAddGroup(groupName)"></ion-input>\n				</ion-item>\n				<p class="valid-form" *ngIf="groupTitleErr">{{groupTitleErrMsg}}</p>\n			</ion-list>\n		</div>\n		<div class="select-btn">\n			<ion-grid>\n				<ion-row>\n					<ion-col class="col1" col-6>\n						<button ion-button block class="green-btn" (click)="selectall()">SELECT ALL</button>\n					</ion-col>\n					<ion-col class="col2" col-6>\n						<button ion-button block class="grey-btn" (click)="deselectall()" *ngIf="hidedeslect">DESELECT ALL</button>\n					</ion-col>\n				</ion-row>\n			</ion-grid>\n		</div>\n		<div class="group-list-wrapper">\n			<ion-list *ngIf="list">\n				<ion-item *ngFor="let list of grouplist">\n					<ion-avatar item-start>\n						<img src="assets/icon/user_img.png" class="add-group-img" *ngIf="list.image == \'\'">\n						<img src="{{list.image}}" class="add-group-img" *ngIf="list.image != \'\'">\n					</ion-avatar>\n					<ion-label>{{list.agentName}}</ion-label>\n					<ion-toggle checked="false" [(ngModel)]="toggleval[list.agentId]" (ngModelChange)="updateItem(toggleval[list.agentId],list.agentId)"></ion-toggle>\n				</ion-item>\n				<p class="valid-form" *ngIf="groupblankErr">Please select a member to edit group.</p>\n			</ion-list>\n		</div>\n		<div class="select-btn" *ngIf="showBtnDiv">\n			<ion-grid>\n				<ion-row>\n					<ion-col class="col1" col-6>\n						<button ion-button block class="green-btn" (click)="savegroup()">SAVE</button>\n					</ion-col>\n					<ion-col class="col2" col-6>\n						<button ion-button block class="grey-btn" (click)="cancel()">CANCEL</button>\n					</ion-col>\n				</ion-row>\n				<ion-row>\n					<ion-col class="delete-btn" col-12>\n						<button ion-button block class="red-btn" (click)="deletegroup()">DELETE</button>\n					</ion-col>\n				</ion-row>\n			</ion-grid>\n		</div>\n	</div>\n	<!--  <div class="chat-icon-block" (click)="chatbutton()" *ngIf="this.commondata.userdevice">\n		<img src="assets/icon/chat_img.png">\n	</div> -->\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\editgroup\editgroup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], EditgroupPage);

//# sourceMappingURL=editgroup.js.map

/***/ })

});
//# sourceMappingURL=11.js.map
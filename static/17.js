webpackJsonp([17],{

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddgroupPageModule", function() { return AddgroupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addgroup__ = __webpack_require__(928);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddgroupPageModule = (function () {
    function AddgroupPageModule() {
    }
    return AddgroupPageModule;
}());
AddgroupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__addgroup__["a" /* AddgroupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__addgroup__["a" /* AddgroupPage */])]
    })
], AddgroupPageModule);

//# sourceMappingURL=addgroup.module.js.map

/***/ }),

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddgroupPage; });
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




var AddgroupPage = (function () {
    function AddgroupPage(navCtrl, navParams, menuCtrl, events, commondata, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.commondata = commondata;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.groupTitleErr = false;
        this.groupTitleErrMsg = '';
        this.agentlist = [];
        this.toggleval = [];
        this.agentid = [];
        this.groupblankErr = false;
        this.uniqueagentid = [];
        this.hidedeslect = false;
        this.apiUrl = commondata.apiUrl;
    }
    /*** When first page Loads  this method invokes automatically ***/
    AddgroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        /**** Check Out User Session ****/
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        /*** Get Agents List From BackEnd API ***/
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            var body = JSON.stringify({
                userId: localStorage.getItem('chatfirstid')
            });
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
                }
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
    /***** user click on add group *****/
    AddgroupPage.prototype.addgroup = function () {
        var _this = this;
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
        else if (this.agentid.length == 0 || this.agentid == null || this.agentid == undefined) {
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
            /*** API To Add New Group Using BackEnd API ***/
            return new Promise(function (resolve, reject) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                var body = JSON.stringify({
                    userId: localStorage.getItem('chatfirstid'),
                    agents: _this.agentid.toString(),
                    groupName: _this.groupName
                });
                _this.http.post(_this.apiUrl + 'add-group', body, { headers: headers }).subscribe(function (res) {
                    _this.groupdata = res.json();
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.navCtrl.push('GroupPage');
                    resolve(res.json());
                }, function (err) {
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.errdata = err.json();
                    // console.log('err'+JSON.stringify(err))
                    if (_this.errdata.error == 'token_invalid') {
                        _this.events.publish(('user:checksession'));
                    }
                });
            });
        }
    };
    /**** Group Name Field Validations ****/
    AddgroupPage.prototype.chaneAddGroup = function (val) {
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
    /** When user Click Cancel Button,Navigate to GroupPage */
    AddgroupPage.prototype.cancel = function () {
        this.navCtrl.push('GroupPage');
    };
    /** When user Click Back Button,Navigate to GroupPage */
    AddgroupPage.prototype.backbutton = function () {
        this.navCtrl.push('GroupPage');
    };
    /*** Publish Event with variable user ***/
    AddgroupPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    AddgroupPage.prototype.updateItem = function (val, id) {
        this.groupblankErr = false;
        if (val == true) {
            this.agentid.push(id);
        }
        else {
            var index = this.agentid.indexOf(id);
            this.agentid.splice(index, 1);
        }
        if (this.agentid.length == 0) {
            this.hidedeslect = false;
        }
        else {
            this.hidedeslect = true;
        }
    };
    /***** Manage select and Deselect Toggle  *****/
    AddgroupPage.prototype.selectall = function () {
        this.agentid = [];
        for (var i = 0; i < this.agentlist.length; i++) {
            this.toggleval[this.agentlist[i].id] = true;
            this.agentid.push(this.agentlist[i].id);
        }
        this.hidedeslect = true;
    };
    AddgroupPage.prototype.deselectall = function () {
        this.agentid = [];
        for (var i = 0; i < this.agentlist.length; i++) {
            this.toggleval[this.agentlist[i].id] = false;
        }
        this.hidedeslect = false;
    };
    return AddgroupPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Content */])
], AddgroupPage.prototype, "content", void 0);
AddgroupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-addgroup',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\addgroup\addgroup.html"*/'<ion-header class="cus-header new_cus_addgroup">\n	<ion-navbar hideBackButton="true">\n		<button ion-button class="new-signup-ion" (click)="backbutton()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n		<ion-title class="new-signup-tilte">\n			Groups\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="manage-group-wrapper">\n		<div class="manage-group">Add Group</div>\n		<div class="c_group-field">\n			<ion-list>\n				<ion-item *ngIf="list">\n					<ion-label>Username</ion-label>\n					<ion-input type="text" placeholder="Group Name" maxLength="30" [(ngModel)]="groupName" (ngModelChange)="chaneAddGroup(groupName)"></ion-input>\n				</ion-item>\n				<p class="valid-form" *ngIf="groupTitleErr">{{groupTitleErrMsg}}</p>\n			</ion-list>\n		</div>\n		<div class="select-btn addgroup-btn">\n			<button ion-button block class="green-btn" (click)="selectall()" *ngIf="list">SELECT ALL</button>\n			<button ion-button block class="grey-btn" (click)="deselectall()" *ngIf="hidedeslect">DESELECT ALL</button>\n		</div>\n		<div class="group-list-wrapper">\n			<ion-list *ngIf="list">\n				<ion-item *ngFor="let list of agentlist">\n					<ion-avatar item-start>\n						<img src="assets/icon/user_img.png" class="add-group-img" *ngIf="list.picture == \'\' ">\n						<img src={{list.picture}} class="add-group-img" *ngIf="list.picture != \'\' ">\n					</ion-avatar>\n					<ion-label> {{list.name}}</ion-label>\n					<ion-toggle checked="false" [(ngModel)]="toggleval[list.id]" (ngModelChange)="updateItem(toggleval[list.id],list.id)"></ion-toggle>\n				</ion-item>\n				<p class="valid-form" *ngIf="groupblankErr">Please select a member to add group.</p>\n			</ion-list>\n		</div>\n		<div class="select-btn m-b-20" *ngIf="list">\n			<ion-grid>\n				<ion-row>\n					<ion-col class="col1" col-6>\n						<button ion-button block class="green-btn" (click)="addgroup()">SAVE</button>\n					</ion-col>\n					<ion-col class="col2" col-6>\n						<button ion-button block class="grey-btn" (click)="cancel()">CANCEL</button>\n					</ion-col>\n				</ion-row>\n			</ion-grid>\n		</div>\n		<div class="blank-msg" *ngIf="!list">\n			No Agents Added\n		</div>\n	</div>\n	<!-- <div class="chat-icon-block" (click)="chatbutton()" *ngIf="this.commondata.userdevice">\n		<img src="assets/icon/chat_img.png">\n	</div> -->\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\addgroup\addgroup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */]])
], AddgroupPage);

//# sourceMappingURL=addgroup.js.map

/***/ })

});
//# sourceMappingURL=17.js.map
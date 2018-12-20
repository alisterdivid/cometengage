webpackJsonp([9],{

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupPageModule", function() { return GroupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group__ = __webpack_require__(936);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupPageModule = (function () {
    function GroupPageModule() {
    }
    return GroupPageModule;
}());
GroupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__group__["a" /* GroupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group__["a" /* GroupPage */])]
    })
], GroupPageModule);

//# sourceMappingURL=group.module.js.map

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPage; });
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




var GroupPage = (function () {
    function GroupPage(navCtrl, navParams, menuCtrl, events, commondata, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.commondata = commondata;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.grouplist = [];
        this.apiUrl = commondata.apiUrl;
    }
    GroupPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad GroupPage');
    };
    /*** When user click to add group button navigate to Addgrouppage ***/
    GroupPage.prototype.addgroup = function () {
        this.navCtrl.push('AddgroupPage');
    };
    GroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.menuCtrl.enable(true);
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
                userId: localStorage.getItem('chatfirstid')
            });
            /** Backend api to access group information **/
            _this.http.post(_this.apiUrl + 'group', body, { headers: headers }).subscribe(function (res) {
                _this.groupdata = res.json();
                if (_this.groupdata.data == '' || _this.groupdata.data == null) {
                    _this.list = false;
                }
                else {
                    _this.list = true;
                    _this.grouplist = _this.groupdata.data;
                }
                loader.dismiss();
                loader = null;
                resolve(res.json());
            }, function (err) {
                loader.dismiss();
                loader = null;
                _this.errdata = err.json();
                console.log('err' + JSON.stringify(err));
                /** Session maintain **/
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish(('user:checksession'));
                }
            });
        });
    };
    GroupPage.prototype.editgroup = function (groupid) {
        this.navCtrl.push('EditgroupPage', { groupid: groupid });
        localStorage.setItem('mygroupid', groupid);
    };
    GroupPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    return GroupPage;
}());
GroupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-group',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\group\group.html"*/'<ion-header class="cus-header remove-back-btn">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Groups\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="group-wrapper new-group-wrap">\n		<div class="manage-group">Manage Groups</div>\n		<div class="group-text">Groups Allow to assign conversation to specific agents</div>\n		<div class="add-new-group">\n			<ion-list class="cus-group-list" *ngIf="list">\n				<button ion-item *ngFor="let list of grouplist" (click)="editgroup(list.group_id)">\n					{{list.group_name}}\n				</button>\n			</ion-list>\n			<div class="add-new-btn" (click)="addgroup()">\n				<button ion-button block>ADD NEW GROUP</button>\n			</div>\n		</div>\n	</div>\n	<!-- <div class="chat-icon-block" (click)="chatbutton()" *ngIf="this.commondata.userdevice">\n		<img src="assets/icon/chat_img.png">\n	</div> -->\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\group\group.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], GroupPage);

//# sourceMappingURL=group.js.map

/***/ })

});
//# sourceMappingURL=9.js.map
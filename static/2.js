webpackJsonp([2],{

/***/ 924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrechatPageModule", function() { return PrechatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prechat__ = __webpack_require__(943);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PrechatPageModule = (function () {
    function PrechatPageModule() {
    }
    return PrechatPageModule;
}());
PrechatPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__prechat__["a" /* PrechatPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__prechat__["a" /* PrechatPage */])]
    })
], PrechatPageModule);

//# sourceMappingURL=prechat.module.js.map

/***/ }),

/***/ 943:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrechatPage; });
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




var PrechatPage = (function () {
    /** as page loaded constructor called **/
    function PrechatPage(navCtrl, navParams, loadingCtrl, commondata, http, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.commondata = commondata;
        this.http = http;
        this.events = events;
        /** Define variables **/
        this.disableemail = true;
        this.disablenumber = true;
        this.namerequire = false;
        this.emailcheck = false;
        this.emailrequire = false;
        this.phonecheck = false;
        this.phonerequire = false;
        this.onlinecheck = false;
        this.prechatcheck = false;
        this.apiUrl = commondata.apiUrl;
    }
    PrechatPage.prototype.ionViewDidLoad = function () {
        localStorage.setItem('emailrequirecheck', 'false');
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish('user:checksession');
        }
        this.getprechat();
        this.Adminid = localStorage.getItem('companyid');
    };
    /** hit backend API to get prechat info **/
    PrechatPage.prototype.getprechat = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            var body = JSON.stringify({
                userId: localStorage.getItem('chatfirstid')
            });
            _this.http.post(_this.apiUrl + 'prechat-info', body, { headers: headers }).subscribe(function (res) {
                _this.data = res.json();
                console.log(_this.data);
                if (_this.data.data.nameRequired == '1' || _this.data.data.nameRequired == true) {
                    _this.namerequire = true;
                }
                if (_this.data.data.email == '1' || _this.data.data.email == true) {
                    _this.emailcheck = true;
                    _this.disableemail = false;
                }
                if (_this.data.data.emailRequired == '1' || _this.data.data.emailRequired == true) {
                    _this.emailrequire = true;
                    localStorage.setItem('emailrequirecheck', _this.data.data.emailRequired);
                }
                else {
                    localStorage.setItem('emailrequirecheck', 'false');
                }
                if (_this.data.data.phone == '1' || _this.data.data.phone == true) {
                    _this.phonecheck = true;
                    _this.disablenumber = false;
                }
                if (_this.data.data.phoneRequired == '1' || _this.data.data.phoneRequired == true) {
                    _this.phonerequire = true;
                    localStorage.setItem('phonerequirecheck', _this.data.data.phoneRequired);
                }
                else {
                    localStorage.setItem('phonerequirecheck', 'false');
                }
                if (_this.data.data.formAutoFillRequest == '1' || _this.data.data.formAutoFillRequest == true) {
                    _this.onlinecheck = true;
                }
                if (_this.data.data.formEnable == '1' || _this.data.data.formEnable == true) {
                    _this.prechatcheck = true;
                }
                resolve(res.json());
            }, function (err) {
                _this.errdata = err.json();
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish('user:checksession');
                }
            });
        });
    };
    /** enable disable email field **/
    PrechatPage.prototype.emailvalue = function (val) {
        if (val == true) {
            this.disableemail = false;
        }
        else {
            this.disableemail = true;
            this.emailrequire = false;
        }
    };
    /** enable disable number field **/
    PrechatPage.prototype.numbervalue = function (val) {
        if (val == true) {
            this.disablenumber = false;
        }
        else {
            this.disablenumber = true;
            this.phonerequire = false;
        }
    };
    /** click on save button of prechat **/
    PrechatPage.prototype.saveform = function () {
        var _this = this;
        /** start the loader  **/
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
                name: 1,
                nameRequired: _this.namerequire,
                email: _this.emailcheck,
                emailRequired: _this.emailrequire,
                phone: _this.phonecheck,
                phoneRequired: _this.phonerequire,
                formAutoFillRequest: _this.onlinecheck,
                formEnable: _this.prechatcheck,
                firebaseId: _this.Adminid
            });
            /** send data to backend to save prechat info for taht admin or agent **/
            _this.http.post(_this.apiUrl + 'setup-prechat', body, { headers: headers }).subscribe(function (res) {
                _this.data = res.json();
                loader.dismiss();
                loader = null;
                _this.getprechat();
                resolve(res.json());
            }, function (err) {
                loader.dismiss();
                loader = null;
                _this.errdata = err.json();
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish('user:checksession');
                }
            });
        });
    };
    PrechatPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    /** click on cancel button of prechat page **/
    PrechatPage.prototype.cancelform = function () {
        this.navCtrl.push('MyqueuePage');
    };
    return PrechatPage;
}());
PrechatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-prechat',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\prechat\prechat.html"*/'<ion-header class="cus-header remove-back-btn" style="z-index: 99999999;">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Pre-Chat Form\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="pageinfo">Allows visitors to introduce themselves.</div>\n	<ion-item>\n		<ion-label>Enable prechat form</ion-label>\n		<ion-toggle [(ngModel)]="prechatcheck"></ion-toggle>\n	</ion-item>\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Name</ion-label>\n				<ion-checkbox checked="true" disabled></ion-checkbox>\n			</ion-item>\n		</ion-col>\n		<ion-col>\n			<ion-item>\n				<ion-label>Required</ion-label>\n				<ion-toggle [(ngModel)]="namerequire" [disabled]="!prechatcheck"></ion-toggle>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Email</ion-label>\n				<ion-checkbox [(ngModel)]="emailcheck" [disabled]="!prechatcheck" (ionChange)="emailvalue($event.checked)"></ion-checkbox>\n			</ion-item>\n		</ion-col>\n		<ion-col>\n			<ion-item>\n				<ion-label>Required</ion-label>\n				<ion-toggle [(ngModel)]="emailrequire" [disabled]="!emailcheck||!prechatcheck"></ion-toggle>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Phone Number</ion-label>\n				<ion-checkbox [(ngModel)]="phonecheck" [disabled]="!prechatcheck" (ionChange)="numbervalue($event.checked)"></ion-checkbox>\n			</ion-item>\n		</ion-col>\n		<ion-col>\n			<ion-item>\n				<ion-label>Required</ion-label>\n				<ion-toggle [(ngModel)]="phonerequire" [disabled]="!phonecheck||!prechatcheck"></ion-toggle>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n\n	<div class="select-btn footer-select-btn new-footer-select-btn">\n		<button ion-button block class="green-btn" (click)="saveform()">SAVE</button>\n		<button ion-button block class="grey-btn" (click)="cancelform()">CANCEL</button>\n	</div>\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\prechat\prechat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */]])
], PrechatPage);

//# sourceMappingURL=prechat.js.map

/***/ })

});
//# sourceMappingURL=2.js.map
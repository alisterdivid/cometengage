webpackJsonp([13],{

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustombuttonPageModule", function() { return CustombuttonPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__custombutton__ = __webpack_require__(932);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustombuttonPageModule = (function () {
    function CustombuttonPageModule() {
    }
    return CustombuttonPageModule;
}());
CustombuttonPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__custombutton__["a" /* CustombuttonPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__custombutton__["a" /* CustombuttonPage */])]
    })
], CustombuttonPageModule);

//# sourceMappingURL=custombutton.module.js.map

/***/ }),

/***/ 932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustombuttonPage; });
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




var CustombuttonPage = (function () {
    function CustombuttonPage(navCtrl, menuCtrl, events, http, loadingCtrl, commondata) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.commondata = commondata;
        this.name = 'Show widget code';
        this.color = '';
        this.colorsarr = ['#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979', '#819595'];
        this.buttonclass = [];
        this.position = 'BottomLeft';
        this.positions = {
            BottomLeft: 'Bottom-Left',
            BottomMiddle: 'Bottom-Middle',
            BottomRight: 'Bottom-Right',
            LeftTop: 'Left-Top',
            LeftMiddle: 'Left-Middle',
            LeftBottom: 'Left-Bottom',
            RightTop: 'Right-Top',
            RightMiddle: 'Right-Middle',
            RightBottom: 'Right-Bottom'
        };
        this.positionkeys = Object.keys(this.positions);
        this.apiUrl = commondata.apiUrl;
        this.appUrl = commondata.appUrl;
        this.stringifiedfbconfig = JSON.stringify(commondata.fbconfig);
    }
    CustombuttonPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(true);
        this.events.publish('user:checksession');
        this.Adminid = localStorage.getItem('companyid');
        this.getSettings();
    };
    CustombuttonPage.prototype.ionViewDidEnter = function () {
        localStorage.currentNotiPage = 'CustombuttonPage';
    };
    CustombuttonPage.prototype.ionViewWillLeave = function () {
        localStorage.currentNotiPage = '';
    };
    CustombuttonPage.prototype.setPosition = function (position) {
        this.postSetting({ type: 'position', value: position });
    };
    CustombuttonPage.prototype.setColor = function (color, post) {
        if (post === void 0) { post = false; }
        this.color = color;
        for (var i = 0; i < this.colorsarr.length; i++) {
            if (this.colorsarr[i] == this.color) {
                this.buttonclass[i] = 'js-color colors__color colors__color--selected';
            }
            else {
                this.buttonclass[i] = 'js-color colors__color';
            }
        }
        if (post) {
            this.postSetting({ type: 'color', value: color });
        }
    };
    CustombuttonPage.prototype.chat = function () {
        this.navCtrl.push('MychatPage');
    };
    CustombuttonPage.prototype.changecode = function () {
        if ((this.showhide = !this.showhide)) {
            this.name = 'Hide widget code';
        }
        else {
            this.name = 'Show widget code';
        }
    };
    CustombuttonPage.prototype.getSettings = function () {
        var _this = this;
        var body = JSON.stringify({ firebaseId: this.Adminid });
        this.http.post(this.apiUrl + 'getSetting', body, { headers: this.getPostHeaders() }).subscribe(function (res) {
            var data = res.json();
            _this.color = data.data[0]['color'];
            _this.position = data.data[0]['position'];
            _this.setColor(_this.color);
        }, function (error) {
            _this.handlePostError(error);
        });
    };
    CustombuttonPage.prototype.postSetting = function (setting) {
        var _this = this;
        var body = JSON.stringify({ firebaseId: this.Adminid, type: setting.type, value: setting.value });
        this.http.post(this.apiUrl + 'settingUpdate', body, { headers: this.getPostHeaders() }).subscribe(function (response) { }, function (error) {
            _this.handlePostError(error);
        });
    };
    CustombuttonPage.prototype.getPostHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
        return headers;
    };
    CustombuttonPage.prototype.handlePostError = function (error) {
        this.errdata = error.json();
        if (this.errdata.response_code == '401') {
        }
        if (this.errdata.error == 'token_invalid') {
            this.events.publish('user:checksession');
        }
    };
    return CustombuttonPage;
}());
CustombuttonPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-custombutton',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\custombutton\custombutton.html"*/'<ion-header class="cus-header remove-back-btn">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Setup & customize\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n\n\n	<div class="automatic-request">\n		<h2 class="automatic-request-hdng">Setup</h2>\n		<div class="automatic-request">\n			<p>This is your widget snippet. Copy-paste it into the code of the pages you want to chat on. Right before the\n				<code>&lt;/head&gt;</code> tag is the best option.</p>\n		</div>\n		<div class="automatic-request">\n			<div class="change-email-btn">\n				<button ion-button block class="green-btn" (click)="changecode()">{{name}}</button>\n			</div>\n		</div>\n		<div class="show-field" *ngIf="showhide==true">\n			<code class="code html">\n				<br />\n				<span class="code-comment">&lt;!-- CometEngage HTML Snippet Start --&gt;</span>\n				<br/>\n				<span class="code-title">&lt;script&gt;</span>\n				<br/>\n				<span class="javascript">\n					&nbsp;&nbsp;&nbsp;&nbsp;((\n					<span class="code-params">d</span>,\n					<span class="code-params">w</span>,\n					<span class="code-params">p</span>) => &#123;\n					<br />\n					<div *ngIf="apiUrl!=\'https://api.cometengage.com/api/\'">\n						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n						<span class="code-params">w</span>\n						<span class="code-string">[\'apiurl\']</span> =\n						<span class="code-string">\'{{apiUrl}}\';</span>\n						<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n						<span class="code-params">w</span>\n						<span class="code-string">[\'fbconfig\']</span> =\n						<span class="code-string">\'{{stringifiedfbconfig}}\';</span>\n						<br />\n					</div>\n					<div *ngIf="appUrl!=\'https://app.cometengage.com/\'">\n						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n						<span class="code-params">w</span>\n						<span class="code-string">[\'appurl\']</span> =\n						<span class="code-string">\'{{appUrl}}\';</span>\n						<br />\n					</div>\n					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n					<span class="code-keyword">let</span>\n					<span class="code-params">s</span> =\n					<span class="code-params">d</span>.\n					<span class="code-function">createElement</span>(\n					<span class="code-string">\'script\'</span>);\n					<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n					<span class="code-params">s</span>.\n					<span class="code-function">src</span> =\n					<span class="code-string">\'{{appUrl}}assets/js/script.js\'</span>;\n					<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n					<span class="code-params">w</span>[p] =\n					<span class="code-string">\'{{Adminid}}\';</span>\n					<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n					<span class="code-keyword">if</span>(\n					<span class="code-params">d</span>.\n					<span class="code-built_in">head</span>)\n					<span class="code-params">d</span>.\n					<span class="code-built_in">head</span>.\n					<span class="code-function">appendChild</span>(s);\n					<br /> &nbsp;&nbsp;&nbsp;&nbsp;&#125;)(\n					<span class="code-params">document</span>,\n					<span class="code-params">window</span>,\n					<span class="code-string">\'APPID\'</span>);\n				</span>\n				<br />\n				<span class="code-title">&lt;/script&gt;</span>\n				<br />\n				<span class="code-comment">&lt;!-- CometEngage HTML Snippet End--&gt;</span>\n				<br />\n			</code>\n		</div>\n		<div class="automatic-request">\n			<p>The code should be present on all pages where you want the chat widget to appear. For multiple pages, the easiest way\n				to achieve that is to paste the code into the common section like header or footer.</p>\n		</div>\n	</div>\n\n	<ion-row>\n		<ion-col>\n			<ion-item>\n				<ion-label>Widget Position</ion-label>\n				<ion-select (ionChange)="setPosition(this.position)" [(ngModel)]="position">\n					<ion-option *ngFor="let position of positionkeys" [value]="position">{{positions[position]}}</ion-option>\n				</ion-select>\n			</ion-item>\n		</ion-col>\n	</ion-row>\n\n	<div class="automatic-request">\n		<div class="settings-section settings-section--border">\n			<h3 class="header header--h3">\n				<span>Widget Color</span>\n\n			</h3>\n\n			<div class="colors">\n				<button *ngFor="let buttoncolor of colorsarr; let i=index;" [className]="buttonclass[i]" [ngStyle]="{\'background-color\': buttoncolor,\'color\':buttoncolor,\'border-color\': buttoncolor}"\n				    (click)="setColor(buttoncolor,true)"></button>\n			</div>\n\n		</div>\n	</div>\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\custombutton\custombutton.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_commondata_commondata__["a" /* CommondataProvider */]])
], CustombuttonPage);

//# sourceMappingURL=custombutton.js.map

/***/ })

});
//# sourceMappingURL=13.js.map
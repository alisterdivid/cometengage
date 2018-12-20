webpackJsonp([14],{

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__(931);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatPageModule = (function () {
    function ChatPageModule() {
    }
    return ChatPageModule;
}());
ChatPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */])]
    })
], ChatPageModule);

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ 931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatPage = (function () {
    function ChatPage(events, commondata) {
        this.events = events;
        this.commondata = commondata;
    }
    ChatPage.prototype.ionViewWillEnter = function () {
        this.sendmessage = false;
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
    };
    ChatPage.prototype.sendmymessage = function (val) {
        if (this.message == '' || this.message == undefined || this.message == null) {
            this.sendmessage = false;
        }
        else {
            this.sendmessage = true;
        }
    };
    return ChatPage;
}());
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chat',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\chat\chat.html"*/'<ion-header class="cus-header remove-back-btn" style="z-index: 99999999;">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block!important;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Chat Room\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content padding class="cus_mychat">\n	<div class="chat-wrapper">\n		<div class="chat-top">\n			<span></span>Chat with us, we are online.</div>\n		<div class="today" text-center>\n			<span>Today</span>\n		</div>\n		<div class="chat-msg" text-center>Hello! I have a question...</div>\n		<div class="introduce-div">\n			<div class="introduce-heading" text-center>Please Introduce yourself</div>\n			<ion-list>\n				<ion-item>\n					<ion-label>Username</ion-label>\n					<ion-input type="text" class="c_yourname" value="" placeholder="Your Name"></ion-input>\n				</ion-item>\n			</ion-list>\n		</div>\n	</div>\n</ion-content>\n<ion-footer class="cus-chat-footer">\n	<ion-toolbar class="chat-footer">\n		<ion-list>\n			<ion-item>\n				<ion-textarea elastic placeholder="Write Here..." [(ngModel)]="message" (ngModelChange)="sendmymessage(message)"></ion-textarea>\n			</ion-item>\n			<div class="footer-send-btn">\n				<span class="arrow1"></span>\n				<button ion-button [disabled]="!sendmessage">Send</button>\n			</div>\n		</ion-list>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\chat\chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_commondata_commondata__["a" /* CommondataProvider */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ })

});
//# sourceMappingURL=14.js.map
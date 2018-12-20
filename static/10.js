webpackJsonp([10],{

/***/ 916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPageModule", function() { return ForgotPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forgot__ = __webpack_require__(935);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ForgotPageModule = (function () {
    function ForgotPageModule() {
    }
    return ForgotPageModule;
}());
ForgotPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__forgot__["a" /* ForgotPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__forgot__["a" /* ForgotPage */])]
    })
], ForgotPageModule);

//# sourceMappingURL=forgot.module.js.map

/***/ }),

/***/ 935:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotPage = (function () {
    function ForgotPage(navCtrl, menuCtrl, formBuilder, http, loadingCtrl, alertCtrl, commondata) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.commondata = commondata;
        this.user = {};
        this.data = {};
        this.submitAttempt = false;
        this.loginerror = false;
        this.apiUrl = commondata.apiUrl;
        this.forgotForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])]
        });
        this.messageInput = this.forgotForm.controls['email'];
    }
    /*** When first page Loads  this method invokes automatically ***/
    ForgotPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
    };
    /** Navigate to Login Page , while press back button **/
    ForgotPage.prototype.backbutton = function () {
        this.navCtrl.push('LoginPage');
    };
    /** If click on signup navigate to signup page **/
    ForgotPage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    /** Code to recover password **/
    ForgotPage.prototype.recover = function () {
        var _this = this;
        this.loginerror = false;
        this.submitAttempt = true;
        if (!this.forgotForm.valid) {
        }
        else {
            this.data = {
                email: this.messageInput.value
            };
            this.validEmailCheck = this.messageInput.value;
            this.submitAttempt = false;
            return new Promise(function (resolve, reject) {
                var loader = _this.loadingCtrl.create({
                    content: 'Please wait...',
                    dismissOnPageChange: true
                });
                loader.present();
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                /** Pass email id to send password change verification email **/
                _this.http.post(_this.apiUrl + 'forgot_password', JSON.stringify(_this.data), { headers: headers }).subscribe(function (res) {
                    loader.dismiss();
                    _this.loginerror = false;
                    var alert = _this.alertCtrl.create({
                        title: 'CometEngage',
                        cssClass: 'forgotpass',
                        subTitle: 'Link has been sent to your email id to change the password.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.push('LoginPage');
                                }
                            }
                        ]
                    });
                    alert.present();
                    resolve(res.json());
                }, function (err) {
                    loader.dismiss();
                    if (err.status == '401') {
                        _this.loginerror = true;
                    }
                });
            });
        }
    };
    return ForgotPage;
}());
ForgotPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forgot',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\forgot\forgot.html"*/'<ion-header class="cus-header">\n	<ion-navbar hideBackButton="true">\n		<button ion-button class="new-signup-ion" (click)="backbutton()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n		<ion-title class="new-signup-tilte">\n			Forgot Password\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content padding class="bg-image">\n	<div class="cus_login">\n		<div class="logo">\n			<img src="assets/icon/logo.png">\n		</div>\n		<div class="forgot-desc">Enter your email address and we will send you a link to reset your password.</div>\n		<form [formGroup]="forgotForm">\n			<ion-list>\n				<ion-item class="login-username">\n					<ion-label>\n						<svg class="cometengage_svg" id="cometengage_svg_email" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n						 viewBox="0 0 64 64" xml:space="preserve">\n							<path d="M61,9H3c-1.105,0-2,0.895-2,2v42c0,1.105,0.895,2,2,2h58c1.105,0,2-0.895,2-2V11C63,9.895,62.105,9,61,9z M18.781,34.625 l-8,10C10.583,44.871,10.293,45,9.999,45c-0.219,0-0.439-0.071-0.624-0.219c-0.431-0.346-0.501-0.975-0.156-1.406l8-10 c0.346-0.429,0.975-0.502,1.406-0.156C19.056,33.564,19.126,34.193,18.781,34.625z M54.625,44.781C54.44,44.929,54.22,45,54.001,45 c-0.294,0-0.584-0.128-0.782-0.375l-8-10c-0.345-0.432-0.274-1.061,0.156-1.406c0.433-0.346,1.061-0.274,1.406,0.156l8,10 C55.126,43.807,55.056,44.436,54.625,44.781z M54.633,18.774l-22,18C32.449,36.925,32.225,37,32,37s-0.449-0.075-0.633-0.226l-22-18  c-0.428-0.351-0.491-0.98-0.142-1.407c0.351-0.428,0.979-0.49,1.407-0.142L32,34.708l21.367-17.482 c0.427-0.349,1.057-0.287,1.407,0.142C55.124,17.794,55.061,18.424,54.633,18.774z"></path>\n						</svg>\n					</ion-label>\n					<ion-input type="text" class="c_username" placeholder="Email ID" [(ngModel)]="user.email" formControlName="email"></ion-input>\n				</ion-item>\n				<p class="valid-form" *ngIf="!forgotForm.controls.email.valid  && forgotForm.controls.email.dirty">\n					Please enter a valid email.\n				</p>\n				<p class="valid-form" *ngIf="loginerror && user.email == validEmailCheck">\n					Invalid Email Id.\n				</p>\n				<div class="cus-btn" (click)="recover()">\n					<button ion-button full [disabled]="!forgotForm.valid">RECOVER PASSWORD</button>\n				</div>\n			</ion-list>\n		</form>\n	</div>\n</ion-content>\n\n<ion-footer class="cus-footer">\n	<ion-toolbar class="signin">\n		<ion-title>Don\'t have an account?\n			<span>\n				<u>\n					<a (click)="signup()">Sign Up</a>\n				</u>\n			</span>\n		</ion-title>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\forgot\forgot.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_commondata_commondata__["a" /* CommondataProvider */]])
], ForgotPage);

//# sourceMappingURL=forgot.js.map

/***/ })

});
//# sourceMappingURL=10.js.map
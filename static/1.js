webpackJsonp([1],{

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(944);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = (function () {
    function SignupPageModule() {
    }
    return SignupPageModule;
}());
SignupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */])]
    })
], SignupPageModule);

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_fcm__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_commondata_commondata__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_messaging_service_messaging_service__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SignupPage = (function () {
    function SignupPage(msgService, platform, navCtrl, menuCtrl, formBuilder, http, loadingCtrl, commondata, events, af, db, storage, fcm) {
        var _this = this;
        this.msgService = msgService;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.commondata = commondata;
        this.events = events;
        this.af = af;
        this.db = db;
        this.storage = storage;
        this.fcm = fcm;
        this.devicetype = '';
        this.signuperror = false;
        this.errmessage = '';
        this.apiUrl = commondata.apiUrl;
        /** sign up form validaton pattern **/
        this.signupForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^([\w-\.]+@(?!lsu.edu)([\w-]+\.)+[\w-]{2,4})?$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])],
            cpassword: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])]
        }, { validator: this.checkIfMatchingPasswords('password', 'cpassword') });
        if (this.platform.is('ios') || this.platform.is('android')) {
            fcm.getToken().then(function (token) {
                if (token != null)
                    localStorage.setItem('FCMToken', token);
                else
                    _this.checkToken();
            });
        }
        else {
            //this.msgService.getPermission();
        }
    }
    /** check password and confirm password **/
    SignupPage.prototype.checkIfMatchingPasswords = function (passwordKey, passwordConfirmationKey) {
        return function (group) {
            var passwordInput = group.controls[passwordKey], passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    };
    SignupPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
    };
    /** functionality of back button **/
    SignupPage.prototype.backbutton = function () {
        this.navCtrl.push('LoginPage');
    };
    /** get FCM token and set to localStorage variable **/
    SignupPage.prototype.checkToken = function () {
        var _this = this;
        this.fcm.getToken().then(function (token) {
            if (token != null)
                localStorage.setItem('FCMToken', token);
            else
                _this.checkToken();
        });
    };
    /** click on Lets start button to sign up user  **/
    SignupPage.prototype.home = function () {
        var _this = this;
        this.signuperror = false;
        this.errmessage = '';
        if (navigator.platform == 'Android') {
            this.devicetype = '0';
        }
        else if (navigator.platform == 'iPhone') {
            this.devicetype = '1';
        }
        else {
            this.devicetype = '';
        }
        if (!this.signupForm.valid) {
        }
        else {
            return new Promise(function (resolve, reject) {
                var loader = _this.loadingCtrl.create({
                    content: 'Please wait...',
                    dismissOnPageChange: true
                });
                loader.present();
                _this.validEmailCheck = _this.email;
                _this.validPasswordCheck = _this.password;
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                var body = JSON.stringify({
                    email: _this.email,
                    password: _this.password,
                    deviceType: _this.devicetype
                });
                headers.append('Content-Type', 'application/json');
                /** Sign up in backend database **/
                _this.http.post(_this.apiUrl + 'signup', body, { headers: headers }).subscribe(function (res) {
                    loader.dismiss();
                    _this.data = res.json();
                    _this.signuperror = false;
                    /** store user information in local Storage **/
                    localStorage.setItem('chatfirsttype', _this.data.data.userType);
                    /** store info in service variables **/
                    _this.commondata.userid = _this.data.data.userId;
                    _this.commondata.usertoken = _this.data.data.token;
                    _this.commondata.useremail = _this.data.data.email;
                    _this.commondata.usertype = _this.data.data.userType;
                    _this.commondata.username = _this.data.data.name;
                    /** store user information in local Storage **/
                    localStorage.setItem('chatfirstName', _this.data.data.name);
                    localStorage.setItem('chatfirsttoken', _this.data.data.token);
                    localStorage.setItem('chatfirstid', _this.data.data.userId);
                    localStorage.setItem('chatfirstEmail', _this.data.data.email);
                    localStorage.setItem('emailrequirecheck', '');
                    localStorage.setItem('imagetosend', '');
                    /** firebase authentication method sign up using email id and password **/
                    _this.af.auth.createUserWithEmailAndPassword(_this.email, _this.password).then(function (data) {
                        _this.storage.set('uid', data.uid);
                        localStorage.setItem('firebaseuid', data.uid);
                        var currentUserRef = _this.db.object("/users/" + data.uid);
                        localStorage.setItem('companyid', data.uid);
                        currentUserRef.set({ email: _this.email, FCMToken: localStorage.getItem('FCMToken'), id: localStorage.getItem('chatfirstid'), userType: localStorage.chatfirsttype, isOnline: true });
                        resolve(res.json());
                    }, function (error) { });
                }, function (err) {
                    loader.dismiss();
                    _this.signuperror = true;
                    if (err.status == '400') {
                        _this.errmessage = 'Password must be atleast 8 characters.';
                    }
                    if (err.status == '401') {
                        _this.errmessage = 'Email Id already taken.Use a different one.';
                    }
                });
            }).then(function () {
                _this.events.publish('user:login', _this.data.data);
                _this.navCtrl.push('MyqueuePage');
            });
        }
    };
    /** when user click on log in **/
    SignupPage.prototype.signin = function () {
        this.navCtrl.push('LoginPage');
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\signup\signup.html"*/'<ion-header class="cus-header">\n	<ion-navbar hideBackButton="true">\n		<button ion-button class="new-signup-ion" (click)="backbutton()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n		<ion-title class="new-signup-tilte">\n			Sign Up\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content padding class="bg-image">\n	<div class="cus_login cus-signup">\n		<div class="logo">\n			<img src="assets/icon/logo.png">\n		</div>\n		<div class="welcome-text">Welcome</div>\n		<form [formGroup]="signupForm">\n			<ion-list>\n				<ion-item class="login-username">\n					<ion-label>\n						<svg class="cometengage_svg" id="cometengage_svg_email" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n						 viewBox="0 0 64 64" xml:space="preserve">\n							<path d="M61,9H3c-1.105,0-2,0.895-2,2v42c0,1.105,0.895,2,2,2h58c1.105,0,2-0.895,2-2V11C63,9.895,62.105,9,61,9z M18.781,34.625 l-8,10C10.583,44.871,10.293,45,9.999,45c-0.219,0-0.439-0.071-0.624-0.219c-0.431-0.346-0.501-0.975-0.156-1.406l8-10 c0.346-0.429,0.975-0.502,1.406-0.156C19.056,33.564,19.126,34.193,18.781,34.625z M54.625,44.781C54.44,44.929,54.22,45,54.001,45 c-0.294,0-0.584-0.128-0.782-0.375l-8-10c-0.345-0.432-0.274-1.061,0.156-1.406c0.433-0.346,1.061-0.274,1.406,0.156l8,10 C55.126,43.807,55.056,44.436,54.625,44.781z M54.633,18.774l-22,18C32.449,36.925,32.225,37,32,37s-0.449-0.075-0.633-0.226l-22-18  c-0.428-0.351-0.491-0.98-0.142-1.407c0.351-0.428,0.979-0.49,1.407-0.142L32,34.708l21.367-17.482 c0.427-0.349,1.057-0.287,1.407,0.142C55.124,17.794,55.061,18.424,54.633,18.774z"></path>\n						</svg>\n					</ion-label>\n					<ion-input type="text" maxLength="40" class="c_username" placeholder="Email ID" [(ngModel)]="email" formControlName="email"></ion-input>\n				</ion-item>\n				<p class="valid-form" *ngIf="!signupForm.controls.email.valid  && signupForm.controls.email.dirty">\n					Please enter a valid email.\n				</p>\n				<ion-item class="login-password">\n					<ion-label>\n						<svg class="cometengage_svg" id="cometengage_svg_key" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n						 viewBox="0 0 64 64" xml:space="preserve">\n							<path d="M62,1H50c-0.3,0-0.5,0.1-0.7,0.3L23.5,27c-1.4-0.3-2.7-0.5-4.1-0.5c-4.8,0-9.4,1.9-12.8,5.3c-7.1,7.1-7.1,18.6,0,25.7 c3.4,3.4,8,5.3,12.8,5.3s9.4-1.9,12.8-5.3c4.4-4.4,6.2-10.9,4.8-17l5.7-5.8c0.2-0.2,0.3-0.4,0.3-0.7v-7h7c0.6,0,1-0.4,1-1v-7h7 c0.3,0,0.5-0.1,0.7-0.3l4-4c0.2-0.2,0.3-0.4,0.3-0.7V2C63,1.4,62.6,1,62,1z M19.2,50.2C18.1,51.4,16.6,52,15,52s-3.1-0.6-4.2-1.8 C9.6,49.1,9,47.6,9,46s0.6-3.1,1.8-4.2c1.1-1.1,2.6-1.8,4.2-1.8s3.1,0.6,4.2,1.8c1.1,1.1,1.8,2.6,1.8,4.2S20.4,49.1,19.2,50.2z"\n							/>\n						</svg>\n					</ion-label>\n					<ion-input type="password" maxLength="16" class="p_username" placeholder="Password" [(ngModel)]="password" formControlName="password"\n					 onCopy="return false" onPaste="return false"></ion-input>\n				</ion-item>\n				<p class="valid-form" *ngIf="!signupForm.controls.password.valid  && signupForm.controls.password.dirty">\n					Password should be between 8 to 16 characters.\n				</p>\n				<ion-item class="login-password">\n					<ion-label>\n						<svg class="cometengage_svg" id="cometengage_svg_key" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n						 viewBox="0 0 64 64" xml:space="preserve">\n							<path d="M62,1H50c-0.3,0-0.5,0.1-0.7,0.3L23.5,27c-1.4-0.3-2.7-0.5-4.1-0.5c-4.8,0-9.4,1.9-12.8,5.3c-7.1,7.1-7.1,18.6,0,25.7 c3.4,3.4,8,5.3,12.8,5.3s9.4-1.9,12.8-5.3c4.4-4.4,6.2-10.9,4.8-17l5.7-5.8c0.2-0.2,0.3-0.4,0.3-0.7v-7h7c0.6,0,1-0.4,1-1v-7h7 c0.3,0,0.5-0.1,0.7-0.3l4-4c0.2-0.2,0.3-0.4,0.3-0.7V2C63,1.4,62.6,1,62,1z M19.2,50.2C18.1,51.4,16.6,52,15,52s-3.1-0.6-4.2-1.8 C9.6,49.1,9,47.6,9,46s0.6-3.1,1.8-4.2c1.1-1.1,2.6-1.8,4.2-1.8s3.1,0.6,4.2,1.8c1.1,1.1,1.8,2.6,1.8,4.2S20.4,49.1,19.2,50.2z"\n							/>\n						</svg>\n					</ion-label>\n					<ion-input type="password" maxLength="16" class="p_username cus_p_username" placeholder="Confirm Password" [(ngModel)]="cpassword"\n					 formControlName="cpassword" onCopy="return false" onPaste="return false"></ion-input>\n				</ion-item>\n				<p class="valid-form" *ngIf="!signupForm.controls.cpassword.valid  && signupForm.controls.cpassword.dirty">\n					Password and Confirm Password does not matches.\n				</p>\n				<p class="valid-form" *ngIf="signuperror && email == validEmailCheck && password == validPasswordCheck && cpassword == validPasswordCheck">\n					{{errmessage}}\n				</p>\n				<div class="cus-btn" (click)="home()">\n					<button ion-button full [disabled]="!signupForm.valid">Engage</button>\n				</div>\n			</ion-list>\n		</form>\n	</div>\n</ion-content>\n<ion-footer class="cus-footer">\n	<ion-toolbar class="signin">\n		<ion-title>Have an account?\n			<span>\n				<u>\n					<a (click)="signin()">Sign In</a>\n				</u>\n			</span>\n		</ion-title>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\signup\signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__providers_messaging_service_messaging_service__["a" /* MessagingServiceProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_fcm__["a" /* FCM */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=1.js.map
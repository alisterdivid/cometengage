webpackJsonp([18],{

/***/ 908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountPageModule", function() { return AccountPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account__ = __webpack_require__(927);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AccountPageModule = (function () {
    function AccountPageModule() {
    }
    return AccountPageModule;
}());
AccountPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__account__["a" /* AccountPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__account__["a" /* AccountPage */])]
    })
], AccountPageModule);

//# sourceMappingURL=account.module.js.map

/***/ }),

/***/ 927:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_action_sheet__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_commondata_commondata__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AccountPage = (function () {
    function AccountPage(navCtrl, menuCtrl, formBuilder, http, commondata, loadingCtrl, platform, element, actionSheet, camera, events, alertCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.commondata = commondata;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.element = element;
        this.actionSheet = actionSheet;
        this.camera = camera;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.fullNameErr = false;
        this.fullNameErrMsg = '';
        this.titleErr = false;
        this.titleErrMsg = '';
        this.timezonedata = [];
        this.timeArr = [];
        this.timearr24format = [];
        this.timeArrlower = [];
        this.allDaysArr = [];
        this.allFormatArr = [];
        this.indexFormat = 0;
        this.checkBoxValue = undefined;
        this.time24formatlower = [];
        this.showhide = false;
        this.submitAttempt = false;
        this.emailexist = false;
        this.abc = { imageData: 'assets/icon/add_icon.png' };
        this.disableOperatingHours = true;
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday', 'Sunday'];
        this.editagentForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]()
        });
        this.editemailForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]()
        });
        this.apiUrl = commondata.apiUrl;
        /******** Form Validation *********/
        this.editemailForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])]
        });
    }
    /**** When first page Loads  this method invokes automatically ****/
    AccountPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            /******* Maintaining User Session ******/
            this.events.publish('user:checksession');
        }
        /******** Generating Range Slider For Notifications *********/
        this.notistatus = true;
        var componentRef = this;
        componentRef.getprofile();
        if (this.platform.is('mobileweb')) {
            this.phone = false;
        }
        else if (this.platform.is('ios') || this.platform.is('android')) {
            this.phone = true;
        }
        else {
            this.phone = false;
        }
        var image = this.element.nativeElement.querySelector('.accountimage');
        var imagesplit = image.src.split(/[/]+/).pop();
        if (imagesplit == 'user_img.png') {
            this.showsize = false;
        }
        else {
            this.showsize = true;
        }
        this.selectBoxValue = '(UTC-12:00) International Date Line West';
        this.menuCtrl.enable(true);
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            /****Setting timezone which is already saved****/
            _this.http.get(_this.apiUrl + 'timezone', { headers: headers }).subscribe(function (res) {
                _this.timeData = res.json();
                _this.timezonedata = _this.timeData.timezoneList;
                resolve(res.json());
            }, function (err) {
                _this.errdata = err.json();
                console.log('err' + JSON.stringify(err));
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish('user:checksession');
                }
            });
        });
    };
    /**** Function to change range from Range slider ******/
    AccountPage.prototype.changeRange = function (i, type) {
        /** FIXME */
        if (this.disableOperatingHours) {
            return;
        }
        var accountData = this.data.data.operation_hours;
        var formatTime = this.allFormatArr[this.indexFormat];
        console.log('In change Range for i');
        /**** changeRange method called by multiple for this take parameter -enter called when enter to page  ****/
        if (type == 'enter') {
            console.log('If Enter');
            for (var i_1 = 0; i_1 < this.allDaysArr.length; i_1++) {
                for (var key in accountData) {
                    if (accountData.hasOwnProperty(key)) {
                        console.log('If got key');
                        if (key == this.allDaysArr[i_1].servKey) {
                            console.log('If got key match');
                            if (accountData[key] == '') {
                                console.log('If got empty key val');
                                this.allDaysArr[i_1].isChkbox = false;
                                this.allDaysArr[i_1].className = 'sum-range account-range';
                                if (this.checkBoxValue) {
                                    console.log('If got checkBoxValue');
                                    this.allDaysArr[i_1].lowerTime = '09:00';
                                    this.allDaysArr[i_1].upperTime = '18:00';
                                    this.allDaysArr[i_1].rangeModel = { lower: formatTime.indexOf(this.allDaysArr[i_1].lowerTime) * 30, upper: formatTime.indexOf(this.allDaysArr[i_1].upperTime) * 30 };
                                }
                                else {
                                    console.log('If not checkBoxValue');
                                    this.allDaysArr[i_1].lowerTime = '09:00 AM';
                                    this.allDaysArr[i_1].upperTime = '06:00 PM';
                                    this.allDaysArr[i_1].rangeModel = { lower: formatTime.indexOf(this.allDaysArr[i_1].lowerTime) * 30, upper: formatTime.indexOf(this.allDaysArr[i_1].upperTime) * 30 };
                                }
                            }
                            else {
                                console.log('If not empty key val');
                                this.allDaysArr[i_1].isChkbox = true;
                                this.allDaysArr[i_1].className = 'cus-range account-range';
                                this.allDaysArr[i_1].lowerTime = accountData[key].split('-')[0];
                                this.allDaysArr[i_1].upperTime = accountData[key].split('-')[1];
                                this.allDaysArr[i_1].rangeModel = { lower: formatTime.indexOf(this.allDaysArr[i_1].lowerTime) * 30, upper: formatTime.lastIndexOf(this.allDaysArr[i_1].upperTime) * 30 };
                            }
                        }
                        else {
                            console.log('If not key match');
                        }
                    }
                    else {
                        console.log('If not key');
                    }
                }
            }
        }
        else {
            console.log('else enter');
            this.allDaysArr[i].lowerTime = formatTime[this.allDaysArr[i].rangeModel.lower / 30];
            this.allDaysArr[i].upperTime = formatTime[this.allDaysArr[i].rangeModel.upper / 30];
        }
        this.showRangeBool = true;
    };
    /**** Save all detail in Account page ****/
    AccountPage.prototype.saveDetail = function () {
        var _this = this;
        if (this.name == undefined || this.name == '') {
            this.fullNameErr = true;
            this.fullNameErrMsg = 'Please enter name.';
            this.content.scrollToTop();
        }
        else if (this.name.length < 2 || this.name.length > 30) {
            this.fullNameErrMsg = 'Name should be between 2 to 30 characters.';
            this.fullNameErr = true;
            this.content.scrollToTop();
        }
        else {
            this.fullNameErr = false;
            var loader_1 = this.loadingCtrl.create({
                content: 'Please wait...',
                dismissOnPageChange: true
            });
            loader_1.present();
            return new Promise(function (resolve, reject) {
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                if (localStorage.getItem('imagetosend') == null || localStorage.getItem('imagetosend') == undefined || localStorage.getItem('imagetosend') == '') {
                    _this.imagesend = 'assets/icon/user_img.png';
                }
                else {
                    _this.imagesend = localStorage.getItem('imagetosend');
                }
                var body = JSON.stringify({
                    userId: localStorage.getItem('chatfirstid'),
                    name: _this.name,
                    profilePicture: _this.imagesend,
                    title: _this.title,
                    timezone: _this.selectBoxValue,
                    /** FIXME */
                    /* monday: this.allDaysArr[0].className == 'cus-range account-range' ? this.allDaysArr[0].lowerTime + '-' + this.allDaysArr[0].upperTime : '',
                    tuesday: this.allDaysArr[1].className == 'cus-range account-range' ? this.allDaysArr[1].lowerTime + '-' + this.allDaysArr[1].upperTime : '',
                    wednesday: this.allDaysArr[2].className == 'cus-range account-range' ? this.allDaysArr[2].lowerTime + '-' + this.allDaysArr[2].upperTime : '',
                    thursday: this.allDaysArr[3].className == 'cus-range account-range' ? this.allDaysArr[3].lowerTime + '-' + this.allDaysArr[3].upperTime : '',
                    friday: this.allDaysArr[4].className == 'cus-range account-range' ? this.allDaysArr[4].lowerTime + '-' + this.allDaysArr[4].upperTime : '',
                    saturday: this.allDaysArr[5].className == 'cus-range account-range' ? this.allDaysArr[5].lowerTime + '-' + this.allDaysArr[5].upperTime : '',
                    sunday: this.allDaysArr[6].className == 'cus-range account-range' ? this.allDaysArr[6].lowerTime + '-' + this.allDaysArr[6].upperTime : '', */
                    notification_status: _this.notistatus ? 1 : 0,
                    imagesize: _this.filesize,
                    imagename: _this.filename,
                    time_format: _this.checkBoxValue == true ? '24' : '12'
                });
                _this.http
                    .post(_this.apiUrl + 'update_profile', body, {
                    headers: headers
                })
                    .subscribe(function (res) {
                    _this.data = res.json();
                    loader_1.dismiss();
                    loader_1 = null;
                    _this.content.scrollToTop();
                    var componentRef = _this;
                    componentRef.getprofile();
                    resolve(res.json());
                }, function (err) {
                    _this.errdata = err.json();
                    console.log('err' + JSON.stringify(err));
                    loader_1.dismiss();
                    loader_1 = null;
                    if (_this.errdata.error == 'token_invalid') {
                        _this.events.publish('user:checksession');
                    }
                });
            });
        }
    };
    /**** When user open Account page then get users Profile Data *****/
    AccountPage.prototype.getprofile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        loader.present();
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            var body = JSON.stringify({
                userId: localStorage.getItem('chatfirstid'),
                userType: localStorage.getItem('chatfirsttype')
            });
            _this.http
                .post(_this.apiUrl + 'get-user-profile', body, {
                headers: headers
            })
                .subscribe(function (res) {
                _this.data = res.json();
                _this.commondata.profile = _this.data.data.profile;
                _this.data.data.operation_hours.notification_status == 1 ? (_this.notistatus = true) : (_this.notistatus = false);
                localStorage.setItem('imagetosend', _this.data.data.profile.profilePicture);
                if (_this.data.data.profile.name.indexOf('.') !== -1) {
                    _this.name = _this.data.data.profile.name.replace(/\./g, ' ');
                }
                else {
                    _this.name = _this.data.data.profile.name;
                }
                _this.title = _this.data.data.profile.title;
                _this.emailid = _this.data.data.profile.email;
                // this.commondata.useremail = this.data.data.profile.email
                if (_this.phone == true) {
                    _this.abc.imageData = _this.data.data.profile.profilePicture;
                    localStorage.setItem('imagetosend', _this.abc.imageData);
                }
                else {
                    var image = _this.element.nativeElement.querySelector('.accountimage');
                    image.src = _this.data.data.profile.profilePicture;
                    localStorage.setItem('imagetosend', image.src);
                }
                // this.commondata.userimage =  image.src
                _this.events.publish('user:login', _this.data.data.profile);
                if (_this.data.data.operation_hours.time_zone == null || _this.data.data.operation_hours.time_zone == '' || _this.data.data.operation_hours.time_zone == undefined) {
                    _this.selectBoxValue = '(UTC-12:00) International Date Line West';
                }
                else {
                    _this.selectBoxValue = _this.data.data.operation_hours.time_zone;
                }
                if (_this.data.data.operation_hours.notification_status == '1') {
                    _this.notifctnchck = true;
                }
                else {
                    _this.notifctnchck = false;
                }
                if (localStorage.getItem('checkcameraweb') == 'true') {
                    if (_this.data.data.profile.imagename == null || _this.data.data.profile.imagename == '' || _this.data.data.profile.imagename == undefined) {
                        _this.showsize = false;
                    }
                    else {
                        _this.showsize = true;
                        _this.filename = _this.data.data.profile.imagename;
                    }
                    if (_this.data.data.profile.imagesize == null || _this.data.data.profile.imagesize == '' || _this.data.data.profile.imagesize == undefined) {
                        _this.showsize = false;
                    }
                    else {
                        _this.showsize = true;
                        _this.filesize = _this.data.data.profile.imagesize;
                    }
                }
                else {
                    _this.showsize = false;
                }
                if (_this.data.data.operation_hours.time_format == '12') {
                    _this.indexFormat = 0;
                    _this.checkBoxValue = false;
                }
                else {
                    _this.indexFormat = 1;
                    _this.checkBoxValue = true;
                }
                loader.dismiss();
                loader = null;
                resolve(res.json());
            }, function (err) {
                _this.errdata = err.json();
                console.log('err' + JSON.stringify(err));
                loader.dismiss();
                loader = null;
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish('user:checksession');
                }
            });
        });
    };
    /** change self name **/
    AccountPage.prototype.changeName = function (val) {
        if (val == undefined || val == '') {
            this.fullNameErr = true;
            this.fullNameErrMsg = 'Please enter name.';
            this.content.scrollToTop();
        }
        else if (val.length < 2 || val.length > 30) {
            this.fullNameErrMsg = 'Name should be between 2 to 30 characters.';
            this.fullNameErr = true;
            this.content.scrollToTop();
        }
        else {
            this.fullNameErr = false;
        }
    };
    /** change title **/
    AccountPage.prototype.changeTitle = function (val) {
        if (val == undefined || val == '') {
            this.titleErr = false;
        }
        else if (val.length < 5 || val.length > 30) {
            this.titleErr = true;
            this.titleErrMsg = 'Title should be between 5 to 30 characters.';
        }
        else {
            this.titleErr = false;
        }
    };
    /** check time value **/
    AccountPage.prototype.checkvalue = function (val) {
        /** FIXME */
        if (this.disableOperatingHours) {
            return;
        }
        var tempIndex = this.indexFormat;
        if (val == true)
            this.indexFormat = 1;
        else
            this.indexFormat = 0;
        var formatTime = this.allFormatArr;
        for (var i = 0; i < this.allDaysArr.length; i++) {
            /** left side time is lower and right side is upper **/
            var tempLower = formatTime[this.indexFormat][formatTime[tempIndex].indexOf(this.allDaysArr[i].lowerTime)];
            var tempUpper = formatTime[this.indexFormat][formatTime[tempIndex].indexOf(this.allDaysArr[i].upperTime)];
            this.allDaysArr[i].lowerTime = tempLower;
            this.allDaysArr[i].upperTime = tempUpper;
        }
    };
    /** setting dynamically class name of slider **/
    AccountPage.prototype.rangeInvisible = function (e, id) {
        /** FIXME */
        if (this.disableOperatingHours) {
            return;
        }
        if (e.checked) {
            this.allDaysArr[id].className = 'cus-range account-range';
        }
        else
            this.allDaysArr[id].className = 'sum-range account-range';
    };
    AccountPage.prototype.noticheck = function (val) {
        val._value ? (this.notistatus = true) : (this.notistatus = false);
    };
    /**** Toggle Email ****/
    AccountPage.prototype.changeemail = function () {
        this.editagentForm.reset();
        this.showhide = !this.showhide;
        this.newemail = '';
    };
    /**** Code To edit users email Id ****/
    AccountPage.prototype.editemail = function () {
        var _this = this;
        if (!this.editagentForm.valid) {
        }
        else {
            var loader_2 = this.loadingCtrl.create({
                content: 'Please wait...',
                dismissOnPageChange: true
            });
            loader_2.present();
            this.validEmailCheck = this.newemail;
            var headers_1 = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            var body = JSON.stringify({
                email: this.newemail,
                userID: localStorage.getItem('chatfirstid')
            });
            headers_1.append('Content-Type', 'application/json');
            headers_1.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            /** hit backend api for reset password **/
            this.http.post(this.apiUrl + 'emailUpdate', body, { headers: headers_1 }).subscribe(function (res) {
                _this.emailexist = false;
                var body1 = JSON.stringify({
                    userId: localStorage.getItem('chatfirstid')
                });
                _this.saveDetail();
                _this.http
                    .post(_this.apiUrl + 'logout', body1, {
                    headers: headers_1
                })
                    .subscribe(function (res) {
                    loader_2.dismiss();
                    loader_2 = null;
                    var alert = _this.alertCtrl.create({
                        title: 'CometEngage',
                        cssClass: 'forgotpass',
                        subTitle: 'Link has been sent to your registered email id for verification.',
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
                }, function (err) {
                    _this.errdata = err.json();
                    console.log('err' + JSON.stringify(err));
                    loader_2.dismiss();
                    loader_2 = null;
                    if (_this.errdata.error == 'token_invalid') {
                        _this.events.publish('user:checksession');
                    }
                });
                _this.showhide = false;
            }, function (err) {
                loader_2.dismiss();
                loader_2 = null;
                _this.errdata = err.json();
                if (_this.errdata.response_code == '401') {
                    _this.emailexist = true;
                }
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish('user:checksession');
                }
            });
        }
    };
    AccountPage.prototype.cancel = function () {
        this.showhide = false;
    };
    /** as page loads */
    AccountPage.prototype.ngOnInit = function () {
        this.photos = [];
    };
    /*** Upload image from Android ****/
    AccountPage.prototype.ClickPhoto = function () {
        var _this = this;
        var buttonLabels = ['Camera', 'Gallery'];
        var option = {
            title: 'What do you want with this image?',
            subtitle: 'Choose an action',
            buttonLabels: buttonLabels,
            addCancelButtonWithLabel: 'Cancel',
            destructiveButtonLast: true
        };
        this.actionSheet.show(option).then(function (buttonIndex) {
            if (buttonIndex == 1) {
                var options = {
                    quality: 100,
                    destinationType: _this.camera.DestinationType.DATA_URL,
                    allowEdit: true,
                    encodingType: _this.camera.EncodingType.JPEG,
                    mediaType: _this.camera.MediaType.PICTURE
                };
                /**** Ionic cordova plugin to capture Image ****/
                _this.camera.getPicture(options).then(function (imageData) {
                    _this.base64Image = 'data:image/jpeg;base64,' + imageData;
                    _this.abc.imageData = 'data:image/jpeg;base64,' + imageData;
                    localStorage.setItem('imagetosend', imageData);
                    localStorage.setItem('checkcameraweb', 'false');
                    _this.photos.push(_this.base64Image);
                    _this.photos.reverse();
                }, function (err) {
                    //err
                });
            }
            else {
                var options = {
                    quality: 100,
                    sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: _this.camera.DestinationType.DATA_URL,
                    allowEdit: true,
                    encodingType: _this.camera.EncodingType.JPEG,
                    mediaType: _this.camera.MediaType.PICTURE
                };
                _this.camera.getPicture(options).then(function (imageData) {
                    _this.base64Image = 'data:image/jpeg;base64,' + imageData;
                    _this.abc.imageData = 'data:image/jpeg;base64,' + imageData;
                    localStorage.setItem('imagetosend', imageData);
                    localStorage.setItem('checkcameraweb', 'false');
                    _this.photos.push(_this.base64Image);
                    _this.photos.reverse();
                }, function (err) {
                    //err
                });
            }
        });
    };
    /** upload image from Web **/
    AccountPage.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.accountimage');
        reader.onload = function (e) {
            var src = e.target.result;
            image.src = src;
            localStorage.removeItem('profileimage');
            localStorage.setItem('profileimage', image.src);
            localStorage.removeItem('imagetosend');
            localStorage.setItem('imagetosend', localStorage.getItem('profileimage').split(',')[1]);
        };
        localStorage.setItem('checkcameraweb', 'true');
        this.imagephone = localStorage.getItem('imagetosend');
        reader.readAsDataURL(event.target.files[0]);
        var files = event.srcElement.files[0];
        this.showsize = true;
        this.filename = files.name;
        this.filesize = files.size / 1024;
        this.filesize = parseInt(this.filesize);
    };
    AccountPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    /*** Push Back to MyQueue Page */
    AccountPage.prototype.cancelform = function () {
        this.navCtrl.push('MyqueuePage');
    };
    return AccountPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */]) === "function" && _a || Object)
], AccountPage.prototype, "content", void 0);
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\account\account.html"*/'<ion-header class="cus-header remove-back-btn">\n	<ion-navbar>\n		<button ion-button menuToggle style="display:block;">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Your Account\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="cus_account">\n		<div class="account-profile" *ngIf="phone">\n			<img [src]="abc.imageData" (click)="ClickPhoto()">\n		</div>\n		<div class="account-profile" *ngIf="!phone">\n			<div class="account-image-upload">\n				<img class="accountimage" src="assets/icon/user_img.png">\n				<input type="file" class="upload" (change)="changeListner($event)" accept="image/*" />\n			</div>\n			<div class="file-upload-path" *ngIf="showsize">\n				{{filename}}\n				<span> , </span>\n				<span>{{filesize}}KB</span>\n			</div>\n		</div>\n		<ion-list class="ion-cus-details">\n			<ion-item>\n				<ion-label>Full Name</ion-label>\n				<ion-input type="text" placeholder="Full Name" maxLength="30" [(ngModel)]="name" (ngModelChange)="changeName(name)"></ion-input>\n			</ion-item>\n			<p class="valid-form" *ngIf="fullNameErr">\n				{{fullNameErrMsg}}\n			</p>\n			<ion-item>\n				<ion-label>Title</ion-label>\n				<ion-input type="text" placeholder="Title(Optional)" maxLength="30" [(ngModel)]="title" (ngModelChange)="changeTitle(title)"></ion-input>\n			</ion-item>\n			<p class="valid-form" *ngIf="titleErr">{{titleErrMsg}}</p>\n\n			<ion-item>\n				<ion-label>Email Address</ion-label>\n				<ion-input type="text" class="email" placeholder="Email" disabled [(ngModel)]="emailid"></ion-input>\n			</ion-item>\n			<ion-item class="account-select">\n				<ion-label>Time Zone</ion-label>\n				<ion-select [(ngModel)]="selectBoxValue">\n					<ion-option *ngFor="let timezone of timezonedata; let i = index" [selected]="i == 0">{{timezone.timezone}}</ion-option>\n				</ion-select>\n			</ion-item>\n\n		</ion-list>\n		<!--\n			<label class="account-time-format-label">Time format</label>\n			<ion-item class="account-time-fortmat hours-checkbox-left">\n				<ion-label>Show time with 24-hour clock (15:00 rather than 3:00 PM)</ion-label>\n				<ion-checkbox class="footer-checkbox" color="dark" checked="true" [(ngModel)]="checkBoxValue" (ionChange)="checkvalue($event.checked)"></ion-checkbox>\n			</ion-item>\n			<div class="operating-hours-wrapper">\n			<div class="operating-hours-heading">Operating Hours</div>\n			<ion-list class="ion-cus-operation" *ngFor="let day of days;">\n				<div class="hours-checkbox-left">\n					<ion-label></ion-label>\n					<ion-checkbox color="dark" checked="true" [(ngModel)]="days.isChkbox" (ionChange)="rangeInvisible($event, i)"></ion-checkbox>\n				</div>\n				<div class="right-hours">\n					<div class="day-time">\n						<div class="week">{{days.name}}</div>\n						<div class="time">{{days.lowerTime}} - {{days.upperTime}}</div>\n					</div>\n					<div [className]="days.className">\n						<ion-range *ngIf="showRangeBool" min="0" max="1440" dualKnobs="true" step="30" snaps="true" [(ngModel)]="days.rangeModel"\n						    color="danger" (ionChange)="changeRange(i)">\n							<ion-icon range-left small color="danger" name="thermometer"></ion-icon>\n							<ion-icon range-right color="danger" name="thermometer"></ion-icon>\n						</ion-range>\n					</div>\n				</div>\n			</ion-list>\n		</div>\n		<div class="cus-account-checkb new-account-checkbox">\n			<div class="signin">\n				<ion-label></ion-label>\n				<ion-checkbox class="footer-checkbox" color="dark" [checked]="notistatus" (ionChange)="noticheck($event)"></ion-checkbox>\n				<span>Send notification when operation hours start/end</span>\n			</div>\n		</div> -->\n		<!--\n		<div class="account-email agentwrapper-details new-account-email">\n			<ion-item>\n				<ion-label stacked>Email Address</ion-label>\n				<ion-input type="text" disabled [(ngModel)]="emailid"></ion-input>\n			</ion-item>\n		</div>\n		<div class="change-email-btn account-btn select-btn new-account-btn">\n			<button ion-button block class="green-btn" (click)="changeemail()">CHANGE</button>\n		</div>\n		<div class="show-field new-show-field" *ngIf="showhide==true" [formGroup]="editagentForm">\n			<div class="account-email agentwrapper-details new-account-email">\n				<ion-item>\n					<ion-label stacked>Enter New Email Id</ion-label>\n					<ion-input type="text" maxLength="40" formControlName="email" [(ngModel)]="newemail"></ion-input>\n				</ion-item>\n			</div>\n			<p class="valid-form" *ngIf="!editemailForm.controls.email.valid">\n				Please enter a valid email.\n			</p>\n			<p class="valid-form" *ngIf="emailexist==true && newemail == validEmailCheck">\n				Email Id already exists, choose the different one.\n			</p>\n			<div class="select-btn new-select-btn-acc">\n				<ion-grid>\n					<ion-row>\n						<ion-col class="col1" col-6>\n							<button ion-button block class="green-btn change-email-btn account-btn select-btn new-account-btn" [disabled]="!editagentForm.valid"\n							    (click)="editemail()">SAVE</button>\n						</ion-col>\n						<ion-col class="col2" col-6>\n							<button ion-button block class="grey-btn change-email-btn account-btn select-btn new-account-btn" (click)="cancel()">CANCEL</button>\n						</ion-col>\n					</ion-row>\n				</ion-grid>\n			</div>\n		</div>\n	-->\n		<div class="select-btn footer-select-btn new-footer-select-btn">\n			<button ion-button block class="green-btn" (click)="saveDetail()">SAVE</button>\n			<button ion-button block class="grey-btn" (click)="cancelform()">CANCEL</button>\n		</div>\n	</div>\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\account\account.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* MenuController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__providers_commondata_commondata__["a" /* CommondataProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_commondata_commondata__["a" /* CommondataProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* LoadingController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* Platform */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_action_sheet__["a" /* ActionSheet */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_action_sheet__["a" /* ActionSheet */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */]) === "function" && _o || Object])
], AccountPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
//# sourceMappingURL=account.js.map

/***/ })

});
//# sourceMappingURL=18.js.map
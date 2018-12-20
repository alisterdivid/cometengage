webpackJsonp([12],{

/***/ 914:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditagentPageModule", function() { return EditagentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editagent__ = __webpack_require__(933);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditagentPageModule = (function () {
    function EditagentPageModule() {
    }
    return EditagentPageModule;
}());
EditagentPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__editagent__["a" /* EditagentPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__editagent__["a" /* EditagentPage */])]
    })
], EditagentPageModule);

//# sourceMappingURL=editagent.module.js.map

/***/ }),

/***/ 933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditagentPage; });
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







var EditagentPage = (function () {
    function EditagentPage(navCtrl, navParams, menuCtrl, formBuilder, loadingCtrl, commondata, http, alertCtrl, element, actionSheet, camera, platform, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.commondata = commondata;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.element = element;
        this.actionSheet = actionSheet;
        this.camera = camera;
        this.platform = platform;
        this.events = events;
        this.showhide = false;
        this.submitAttempt = false;
        this.titleErr = false;
        this.titleErrMsg = '';
        this.agentrole = 'Admin';
        this.abc = { imageData: 'assets/icon/add_icon.png' };
        this.editagentForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]()
        });
        this.apiUrl = commondata.apiUrl;
        this.editagentForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])]
        });
    }
    EditagentPage.prototype.ionViewDidLoad = function () { };
    /*** When first page Loads  this method invokes automatically ***/
    EditagentPage.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
        this.agentid = this.navParams.get('agentid');
        if (this.platform.is('mobileweb')) {
            this.phone = false;
        }
        else if (this.platform.is('ios') || this.platform.is('android')) {
            this.phone = true;
        }
        else {
            this.phone = false;
        }
        var image = this.element.nativeElement.querySelector('.img-photo-agent');
        var imagesplit = image.src.split(/[/]+/).pop();
        if (imagesplit == 'user_img.png') {
            this.showsize = false;
        }
        else {
            this.showsize = true;
        }
        this.getagentdata();
    };
    /** Hit Api from backend to get agent data **/
    EditagentPage.prototype.getagentdata = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        var body = JSON.stringify({
            userId: localStorage.getItem('myagentid')
        });
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
        this.http.post(this.apiUrl + 'get-agent-info', body, { headers: headers }).subscribe(function (res) {
            _this.data = res.json();
            if (_this.data.data.firstName.indexOf('.') !== -1) {
                _this.name = _this.data.data.firstName.replace(/\./g, ' ');
            }
            else {
                _this.name = _this.data.data.firstName;
            }
            _this.title = _this.data.data.title;
            _this.email = _this.data.data.email;
            /** Check Platform for nativel image plugin else use standard file upload **/
            if (_this.platform.is('ios') || _this.platform.is('android') || _this.platform.is('mobileweb')) {
                /** Check profile picture selected or not , if not set default image **/
                if (_this.data.data.profilePicture == '' || _this.data.data.profilePicture == null || _this.data.data.profilePicture == undefined) {
                    _this.abc.imageData = 'assets/icon/user_img.png';
                }
                else {
                    _this.abc.imageData = _this.data.data.profilePicture;
                }
                localStorage.setItem('imageagentsend', _this.abc.imageData);
            }
            else {
                /** If image upload using web **/
                var image = _this.element.nativeElement.querySelector('.img-photo-agent');
                if (_this.data.data.profilePicture == '' || _this.data.data.profilePicture == null || _this.data.data.profilePicture == undefined) {
                    image.src = 'assets/icon/user_img.png';
                }
                else {
                    image.src = _this.data.data.profilePicture;
                }
                localStorage.setItem('imageagentsend', image.src);
            }
            if (localStorage.getItem('checkcamerawebagent') == 'true') {
                if (_this.data.data.imagename == null || _this.data.data.imagename == '' || _this.data.data.imagename == undefined) {
                    _this.showsize = false;
                }
                else {
                    _this.showsize = true;
                    _this.filename = _this.data.data.imagename;
                }
                if (_this.data.data.imagesize == null || _this.data.data.imagesize == '' || _this.data.data.imagesize == undefined) {
                    _this.showsize = false;
                }
                else {
                    _this.showsize = true;
                    _this.filesize = _this.data.data.imagesize;
                }
            }
            else {
                _this.showsize = false;
            }
            if (_this.data.data.userType == 2) {
                _this.agentrole = 'Admin';
            }
            else {
                _this.agentrole = 'Agent';
            }
            loader.dismiss();
            loader = null;
        }, function (err) {
            loader.dismiss();
            loader = null;
            _this.errdata = err.json();
            console.log('err' + JSON.stringify(err));
            if (_this.errdata.error == 'token_invalid') {
                _this.events.publish(('user:checksession'));
            }
        });
    };
    /** When user click to change email **/
    EditagentPage.prototype.changeemail = function () {
        this.editagentForm.reset();
        this.showhide = !this.showhide;
        this.newemail = '';
    };
    /** Edit email hit backend api  **/
    EditagentPage.prototype.editemail = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.editagentForm.valid) {
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loader_1.present();
            this.validEmailCheck = this.newemail;
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            var body = JSON.stringify({
                email: this.newemail,
                userID: localStorage.getItem('myagentid')
            });
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            /*** API To update User email  ***/
            this.http.post(this.apiUrl + 'emailUpdate', body, { headers: headers }).subscribe(function (res) {
                _this.emailexist = false;
                _this.email = _this.newemail;
                _this.content.scrollToTop();
                loader_1.dismiss();
                _this.showhide = false;
            }, function (err) {
                loader_1.dismiss();
                _this.errdata = err.json();
                if (_this.errdata.response_code == '401') {
                    _this.emailexist = true;
                    _this.showhide = true;
                }
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish(('user:checksession'));
                }
            });
        }
    };
    EditagentPage.prototype.cancel = function () {
        this.showhide = false;
    };
    EditagentPage.prototype.backbutton = function () {
        this.navCtrl.push('AgentPage');
    };
    /*** Save all fields when click on save button ***/
    EditagentPage.prototype.saveagentinfo = function () {
        var _this = this;
        if (this.name == undefined || this.name == '') {
            this.fullNameErr = true;
            this.content.scrollToTop();
        }
        else if (this.name.length < 2 || this.name.length > 30) {
            this.namemsg = 'Name should be between 2 to 30 characters.';
            this.fullNameErr = true;
            this.content.scrollToTop();
        }
        else {
            this.fullNameErr = false;
            if (this.agentrole == 'Agent') {
                this.agenttype = 3;
            }
            else {
                this.agenttype = 2;
            }
            if (localStorage.getItem('imageagentsend') == null || localStorage.getItem('imageagentsend') == undefined || localStorage.getItem('imageagentsend') == '') {
                this.imagesend = '';
            }
            else {
                this.imagesend = localStorage.getItem('imageagentsend');
            }
            var loader_2 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loader_2.present();
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            var body = JSON.stringify({
                userId: localStorage.getItem('myagentid'),
                name: this.name,
                profilePicture: this.imagesend,
                title: this.title,
                email: this.email,
                role: this.agenttype,
                imagesize: this.filesize,
                imagename: this.filename
            });
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            /** Hit backend api to save details of agents **/
            this.http.post(this.apiUrl + 'edit-agent', body, { headers: headers }).subscribe(function (res) {
                loader_2.dismiss();
                loader_2 = null;
                _this.data = res.json();
                _this.navCtrl.push('AgentPage');
                //console.log('Edit Agent Response :: '+JSON.stringify(this.data))
            }, function (err) {
                loader_2.dismiss();
                loader_2 = null;
                _this.errdata = err.json();
                console.log('err' + JSON.stringify(err));
                if (_this.errdata.error == 'token_invalid') {
                    _this.events.publish(('user:checksession'));
                }
            });
        }
    };
    EditagentPage.prototype.cancelagentinfo = function () {
        this.navCtrl.push('AgentPage');
    };
    /*** Delete agents ***/
    EditagentPage.prototype.deleteagentinfo = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete User',
            cssClass: 'logout',
            message: 'Are you sure, you want to delete user?',
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
                        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                        var body = JSON.stringify({
                            userId: localStorage.getItem('myagentid')
                        });
                        headers.append('Content-Type', 'application/json');
                        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
                        _this.http.post(_this.apiUrl + 'delete-agent', body, { headers: headers }).subscribe(function (res) {
                            //console.log('Delete Agent Response :: '+JSON.stringify(res))
                            loader.dismiss();
                            loader = null;
                            _this.navCtrl.push('AgentPage');
                        }, function (err) {
                            loader.dismiss();
                            loader = null;
                            _this.errdata = err.json();
                            //console.log('err'+JSON.stringify(err))
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
    /*** validation while user edit name ***/
    EditagentPage.prototype.changeName = function (val) {
        if (val == undefined || val == '') {
            this.fullNameErr = true;
            this.namemsg = 'Please enter name.';
        }
        else if (val.length < 2 || val.length > 30) {
            this.namemsg = 'Name should be between 2 to 30 characters.';
            this.fullNameErr = true;
            this.content.scrollToTop();
        }
        else {
            this.fullNameErr = false;
        }
    };
    /*** Validation to change title ***/
    EditagentPage.prototype.changeTitle = function (val) {
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
    /*** user image upload code ***/
    EditagentPage.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.img-photo-agent');
        reader.onload = function (e) {
            var src = e.target.result;
            image.src = src;
            localStorage.setItem('agentimage', image.src);
            localStorage.setItem('imageagentsend', localStorage.getItem('agentimage').split(',')[1]);
        };
        localStorage.setItem('checkcamerawebagent', 'true');
        reader.readAsDataURL(event.target.files[0]);
        var files = event.srcElement.files[0];
        this.showsize = true;
        this.filename = files.name;
        this.filesize = files.size / 1024;
        this.filesize = parseInt(this.filesize);
    };
    /** Code With Camera Plugin to access nativly from ios and android devices **/
    EditagentPage.prototype.ClickPhoto = function () {
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
                _this.camera.getPicture(options).then(function (imageData) {
                    _this.base64Image = 'data:image/jpeg;base64,' + imageData;
                    _this.abc.imageData = 'data:image/jpeg;base64,' + imageData;
                    localStorage.setItem('imageagentsend', imageData);
                    localStorage.setItem('checkcamerawebagent', 'false');
                }, function (err) { });
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
                    localStorage.setItem('imageagentsend', imageData);
                    localStorage.setItem('checkcamerawebagent', 'false');
                }, function (err) { });
            }
        });
    };
    /** Code to remove Image **/
    EditagentPage.prototype.removephoto = function () {
        this.myInputVariable.nativeElement.value = '';
        var image = this.element.nativeElement.querySelector('.img-photo-agent');
        image.src = 'assets/icon/user_img.png';
        localStorage.setItem('imageagentsend', '');
        this.showsize = false;
    };
    EditagentPage.prototype.chatbutton = function () {
        this.events.publish('user:chat');
    };
    return EditagentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myInput')
    /***** Define Variables  *******/
    ,
    __metadata("design:type", Object)
], EditagentPage.prototype, "myInputVariable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */])
], EditagentPage.prototype, "content", void 0);
EditagentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-editagent',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\editagent\editagent.html"*/'<ion-header class="cus-header new_cus_addgroup">\n	<ion-navbar hideBackButton="true">\n		<button ion-button class="new-signup-ion" (click)="backbutton()">\n			<ion-icon name="arrow-back"></ion-icon>\n		</button>\n		<ion-title class="new-signup-tilte">\n			Edit Agent\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="agent-name">{{name}}</div>\n	<ion-list class="agentwrapper-details">\n		<ion-item>\n			<ion-label stacked>Name</ion-label>\n			<ion-input type="text" maxLength="30" [(ngModel)]="name" (ngModelChange)="changeName(name)"></ion-input>\n		</ion-item>\n		<p class="valid-form" *ngIf="fullNameErr">\n			{{namemsg}}\n		</p>\n		<ion-item>\n			<ion-label stacked>Title</ion-label>\n			<ion-input type="text" maxLength="30" [(ngModel)]="title" [(ngModel)]="title" (ngModelChange)="changeTitle(title)"></ion-input>\n		</ion-item>\n		<p class="valid-form" *ngIf="titleErr">{{titleErrMsg}}</p>\n		<ion-item>\n			<ion-label stacked>Email Address</ion-label>\n			<ion-input type="text" disabled [(ngModel)]="email"></ion-input>\n		</ion-item>\n		<div class="change-email-btn">\n			<button ion-button block class="green-btn" (click)="changeemail()">CHANGE</button>\n		</div>\n		<div class="show-field new-show-field1" *ngIf="showhide==true" [formGroup]="editagentForm">\n			<ion-item>\n				<ion-label stacked>Enter New Email Id</ion-label>\n				<ion-input type="text" maxLength="40" formControlName="email" [(ngModel)]="newemail"></ion-input>\n			</ion-item>\n			<p class="valid-form" *ngIf="!editagentForm.controls.email.valid  && editagentForm.controls.email.dirty">\n				Please enter a valid email.\n			</p>\n			<p class="valid-form" *ngIf="emailexist==true && newemail == validEmailCheck">\n				Email Id already exists, choose the different one.\n			</p>\n			<div class="select-btn show-field-cus">\n				<ion-grid>\n					<ion-row>\n						<ion-col class="col1" col-6>\n							<button ion-button block class="green-btn" [disabled]="!editagentForm.valid" (click)="editemail()">SAVE</button>\n						</ion-col>\n						<ion-col class="col2" col-6>\n							<button ion-button block class="grey-btn" (click)="cancel()">CANCEL</button>\n						</ion-col>\n					</ion-row>\n				</ion-grid>\n			</div>\n		</div>\n		<ion-item>\n			<label class="c_lable">Photo</label>\n			<div class="edit-agent-photo" *ngIf="phone">\n				<img [src]="abc.imageData" (click)="ClickPhoto()">\n			</div>\n			<div class="edit-agent-photo" *ngIf="!phone">\n				<img src="assets/icon/user_img.png" class="img-photo-agent">\n				<input #myInput type="file" class="upload" (change)="changeListner($event)" accept="image/*">\n				<span class="edit-photo-details_cus" *ngIf="showsize">\n					<span>{{filename}}</span>\n					<span> &nbsp;,&nbsp; </span>\n					<span> {{filesize}}KB </span>\n					<div class="select-btn remove_btn">\n						<button ion-button block class="grey-btn" (click)="removephoto()">REMOVE</button>\n					</div>\n				</span>\n			</div>\n		</ion-item>\n		<label class="c_lable1">Role</label>\n		<ion-item class="account-select">\n			<ion-label>Role</ion-label>\n			<ion-select [(ngModel)]="agentrole" interface="popover">\n				<ion-option [selected]=\'agentrole=="Agent"\'>Agent</ion-option>\n				<ion-option [selected]=\'agentrole=="Admin"\'>Admin</ion-option>\n			</ion-select>\n		</ion-item>\n	</ion-list>\n	<div class="select-btn">\n		<ion-grid>\n			<ion-row>\n				<ion-col class="col1" col-6>\n					<button ion-button block class="green-btn" (click)="saveagentinfo()">SAVE</button>\n				</ion-col>\n				<ion-col class="col2" col-6>\n					<button ion-button block class="grey-btn" (click)="cancelagentinfo()">CANCEL</button>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n	</div>\n	<div class="delete-user-btn">\n		<button ion-button block class="red-btn" (click)="deleteagentinfo()">DELETE USER</button>\n	</div>\n	<!-- <div class="chat-icon-block" (click)="chatbutton()" *ngIf="this.commondata.userdevice">\n		<img src="assets/icon/chat_img.png">\n	</div> -->\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\editagent\editagent.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_action_sheet__["a" /* ActionSheet */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
], EditagentPage);

//# sourceMappingURL=editagent.js.map

/***/ })

});
//# sourceMappingURL=12.js.map
webpackJsonp([7],{

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoPageModule", function() { return InfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info__ = __webpack_require__(938);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InfoPageModule = (function () {
    function InfoPageModule() {
    }
    return InfoPageModule;
}());
InfoPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__info__["a" /* InfoPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__info__["a" /* InfoPage */])]
    })
], InfoPageModule);

//# sourceMappingURL=info.module.js.map

/***/ }),

/***/ 938:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_index__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_chats_chats__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_commondata_commondata__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_usersprovider_usersprovider__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var InfoPage = InfoPage_1 = (function () {
    function InfoPage(navCtrl, navParams, db, commondata, loadingCtrl, events, chatsProvider, local, up, http, formBuilder) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.commondata = commondata;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.chatsProvider = chatsProvider;
        this.local = local;
        this.up = up;
        this.http = http;
        this.formBuilder = formBuilder;
        this.sendmessage = false;
        this.disableUser = false;
        this.message = '';
        this.messages = [];
        this.visitorsarr = [];
        this.displayarr = [];
        this.getuserdata = [];
        this.agentlist = [];
        this.filteredusers = [];
        this.temparr = [];
        this.agentclass = [];
        this.grouplist = [];
        this.groupAgentsList = [];
        this.groupclass = [];
        this.agentkeys = [];
        this.mainChatList = [];
        this.usersNotification = [];
        this.ind = 0;
        this.manageIDArr = [];
        this.apiUrl = commondata.apiUrl;
        this.signupForm = formBuilder.group({
            uemail: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^([\w-\.]+@(?!lsu.edu)([\w-]+\.)+[\w-]{2,4})?$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])],
            umobile: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])],
            uname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])],
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required])]
        });
        this.up.getUid().then(function (uid) {
            var loader = _this.loadingCtrl.create({
                content: 'Please wait...',
                dismissOnPageChange: false
            });
            loader.present();
            _this.useridkey = uid;
            _this.interlocutor = localStorage.getItem('paramid'); // param id set in chat.ts , reference of chat room
            if (localStorage.getItem('chatfirsttype') == '2') {
                // 2 = admin
                chatsProvider.getChatRef(_this.useridkey, _this.interlocutor).then(function (chatRef) {
                    _this.chatroomref = chatRef;
                    localStorage.setItem('chatrefchat', _this.chatroomref);
                    _this.chats = _this.db.list(chatRef);
                    loader.dismiss();
                    loader = null;
                });
                _this.db.list("/users/" + _this.interlocutor).subscribe(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].$key == 'email') {
                            _this.uemail = data[i].$value;
                        }
                        if (data[i].$key == 'mobile') {
                            _this.umobile = data[i].$value;
                        }
                        if (data[i].$key == 'username') {
                            _this.uname = data[i].$value;
                        }
                    }
                });
            }
            else {
                // agent
                chatsProvider
                    .getAgentChatRef(_this.interlocutor) //pass chat ref of room
                    .then(function (chatRef) {
                    _this.chatroomref = chatRef;
                    localStorage.setItem('chatrefchat', _this.chatroomref);
                    _this.chats = _this.db.list(chatRef);
                    loader.dismiss();
                    loader = null;
                });
                _this.db.list("/users/" + _this.interlocutor.split(',')[0]).subscribe(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].$key == 'email') {
                            _this.uemail = data[i].$value;
                        }
                        if (data[i].$key == 'mobile') {
                            _this.umobile = data[i].$value;
                        }
                        if (data[i].$key == 'username') {
                            _this.uname = data[i].$value;
                        }
                    }
                });
            }
        });
    }
    InfoPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        localStorage.currentNotiPage = 'MychatPage';
        var id = localStorage
            .getItem('chatrefchat')
            .split('/')[2]
            .split(',')[0] +
            ',' +
            localStorage.getItem('firebaseuid');
        var usersLeaveList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id);
        new Promise(function (resolve, reject) {
            usersLeaveList.once('value', function (item) {
                var itemVal = item.val();
                resolve(itemVal);
            });
        }).then(function (itemVal) {
            for (var key in itemVal) {
                if (itemVal[key].leave == true) {
                    _this.disableUser = true;
                }
                else {
                    _this.disableUser = false;
                    _this.anotherFunc();
                }
            }
        });
        this.up.getUid().then(function (uid) {
            _this.loadingCtrl.create({
                content: 'Please wait...',
                dismissOnPageChange: false
            });
            // loader.present();
            _this.useridkey = uid;
            _this.interlocutor = localStorage.getItem('paramid');
            if (localStorage.getItem('chatfirsttype') == '2') {
                _this.chatsProvider.getChatRef(_this.useridkey, _this.interlocutor).then(function (chatRef) {
                    //console.log('my chatRef :: '+chatRef)
                    _this.chatroomref = chatRef;
                    localStorage.setItem('chatrefchat', _this.chatroomref);
                    _this.chats = _this.db.list(chatRef);
                    _this.chats.subscribe(function (item) {
                        _this.mainChatList = [];
                        _this.recursFunc(0, item);
                    });
                    // loader.dismiss();
                    // loader = null;
                });
                _this.db.list("/users/" + _this.interlocutor).subscribe(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].$key == 'email') {
                            _this.uemail = data[i].$value;
                        }
                        if (data[i].$key == 'mobile') {
                            _this.umobile = data[i].$value;
                        }
                        if (data[i].$key == 'username') {
                            _this.uname = data[i].$value;
                        }
                    }
                });
            }
            else {
                _this.chatsProvider.getAgentChatRef(_this.interlocutor).then(function (chatRef) {
                    //console.log('my chatRef :: '+chatRef)
                    _this.chatroomref = chatRef;
                    localStorage.setItem('chatrefchat', _this.chatroomref);
                    _this.chats = _this.db.list(chatRef);
                    _this.chats.subscribe(function (item) {
                        _this.mainChatList = [];
                        _this.recursFunc(0, item);
                    });
                    //   loader.dismiss();
                    //   loader = null;
                });
                _this.interlocutor = _this.interlocutor.split(',')[0];
                _this.db.list("/users/" + _this.interlocutor).subscribe(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].$key == 'email') {
                            _this.uemail = data[i].$value;
                        }
                        if (data[i].$key == 'mobile') {
                            _this.umobile = data[i].$value;
                        }
                        if (data[i].$key == 'username') {
                            _this.uname = data[i].$value;
                        }
                    }
                });
            }
        });
    };
    InfoPage.prototype.addJoinedMsgAfterAdminAdd = function (tempref, loginuserid, key) {
        var specialref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref + "/" + key);
        specialref.update({
            join: 'own'
        });
        this.chats.push({
            name: this.username,
            userid: localStorage.getItem('chatfirstid'),
            email: localStorage.getItem('chatfirstEmail'),
            specialMessage: true,
            joinmessage: "Agent - Joined",
            time: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP,
            date: new Date(),
            image: localStorage.getItem('imagetosend'),
            type: 'agent'
        });
    };
    InfoPage.prototype.anotherFunc = function () {
        var _this = this;
        var loginUserId = localStorage.getItem('firebaseuid');
        var tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
        var specialref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref);
        new Promise(function (resolve, reject) {
            specialref.once('value', function (item) {
                var data = item.val();
                if (data == null) {
                    _this.disableOtherUsers(tempref, loginUserId, true);
                    resolve(false);
                }
                else {
                    var flag = false;
                    var count = 0;
                    var ind = '';
                    for (var key in data) {
                        count++;
                        ind = key;
                        if (data[key].loginuserid == loginUserId) {
                            if (data[key].join == 'admin') {
                                _this.addJoinedMsgAfterAdminAdd(tempref, loginUserId, key);
                            }
                            flag = true;
                        }
                    }
                    if (count == 1) {
                        if (data[ind].status == 'company')
                            _this.disableOtherUsers(tempref, loginUserId, true);
                    }
                    if (flag == false) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                }
            });
        }).then(function (status) {
            if (status) {
                //if
            }
            else {
                //only for 1st time for that id
                var userType;
                var type;
                localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
                specialref.push({
                    loginuserid: loginUserId,
                    chatref: tempref,
                    status: type,
                    time: new Date().getTime(),
                    join: 'own'
                });
                //push a special message in chats table
                _this.chats
                    .push({
                    name: _this.username,
                    userid: localStorage.getItem('chatfirstid'),
                    email: localStorage.getItem('chatfirstEmail'),
                    specialMessage: true,
                    joinmessage: userType + " - Joined",
                    time: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP,
                    date: new Date(),
                    image: localStorage.getItem('imagetosend'),
                    type: type
                })
                    .then(function () { })
                    .catch(function () { });
            }
        });
    };
    InfoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.username = localStorage.getItem('chatfirstName');
        if (localStorage.getItem('chatfirsttoken') == null || localStorage.getItem('chatfirsttoken') == undefined) {
            this.events.publish(('user:checksession'));
        }
        if (localStorage.getItem('imagetosend') == null || localStorage.getItem('imagetosend') == '' || localStorage.getItem('imagetosend') == undefined) {
            this.showimage = 'assets/icon/user_img.png';
        }
        else {
            this.showimage = localStorage.getItem('imagetosend');
        }
        this.showagent = localStorage.getItem('add');
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
        var body = JSON.stringify({
            userId: localStorage.getItem('chatfirstid')
        });
        this.http
            .post(this.apiUrl + 'get-login-agent', body, {
            headers: headers
        })
            .subscribe(function (res) {
            _this.data = res.json();
            if (_this.data.data == '' || _this.data.data == null) {
                _this.noagent = false;
            }
            else {
                _this.noagent = true;
            }
        }, function (err) {
            _this.errdata = err.json();
            if (_this.errdata.error == 'token_invalid') {
                _this.events.publish(('user:checksession'));
            }
        });
        this.recursFunc = function (i, item) {
            if (i < item.length) {
                if (i == 0) {
                    item[i].showDate = true;
                    item[i].dateCont = _this.formatDate(item[i].time);
                    _this.mainChatList.push(item[i]);
                    i++;
                    return _this.recursFunc(i, item);
                }
                else {
                    if (_this.formatDate(item[i].time) != _this.formatDate(item[i - 1].time)) {
                        item[i].showDate = true;
                        item[i].dateCont = _this.formatDate(item[i].time);
                    }
                    _this.mainChatList.push(item[i]);
                    i++;
                    return _this.recursFunc(i, item);
                }
            }
            else {
                setTimeout(function () {
                    if (_this.content._scroll)
                        _this.content.scrollToBottom(0);
                }, 500);
            }
        };
        this.recAgent = function (currentInd, agentArr) {
            _this.currentGroupsRef = _this.db.list("/agents/" + _this.agentkeys[currentInd]);
            var chatref = localStorage.getItem('chatrefchat');
            chatref = chatref.split('/chats/')[1].split(',')[0]; //get clicked users id
            if (currentInd < agentArr.length) {
                return new Promise(function (resolve, reject) {
                    _this.currentGroupsRef.subscribe(function (item) {
                        //console.log('Items => '+JSON.stringify(item));
                        var agentIndex = item.findIndex(function (x) { return x.chatref == _this.chatroomref; });
                        if (agentIndex == -1) {
                            _this.currentGroupsRef.push({
                                chatref: _this.chatroomref
                            });
                            //also push this key to addedagents table
                            _this.currentAgentRef1 = _this.db.list("/addedagents");
                            var chatref1 = localStorage.getItem('chatrefchat');
                            chatref1 = chatref1.split('/chats/')[1].split(',')[0];
                            _this.currentAgentRef1.push({
                                agentid: _this.agentkeys[currentInd],
                                email: _this.groupAgentsList[currentInd],
                                anoynomousUid: chatref,
                                source: 'admin',
                                chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
                            });
                            resolve(true);
                        }
                        else
                            resolve(true);
                    });
                }).then(function (succ) {
                    if (succ == true) {
                        // console.log('true :: ')
                        currentInd++;
                        return _this.recAgent(currentInd, agentArr);
                    }
                });
            }
            else {
                //console.log('complete recursion ..')
            }
        };
        /** format date functionality **/
        this.formatDate = function (time) {
            var objd = new Date(time);
            var day_temp = objd.getDate();
            var ordinal_suffix_of = function (i) {
                var j = i % 10, k = i % 100;
                if (j == 1 && k != 11) {
                    return i + 'st';
                }
                if (j == 2 && k != 12) {
                    return i + 'nd';
                }
                if (j == 3 && k != 13) {
                    return i + 'rd';
                }
                return i + 'th';
            };
            var day = ordinal_suffix_of(day_temp);
            var year = objd.getFullYear();
            var month = new Array();
            month[0] = 'January';
            month[1] = 'February';
            month[2] = 'March';
            month[3] = 'April';
            month[4] = 'May';
            month[5] = 'June';
            month[6] = 'July';
            month[7] = 'August';
            month[8] = 'September';
            month[9] = 'October';
            month[10] = 'November';
            month[11] = 'December';
            var month_name = month[objd.getMonth()];
            var formatted_date = day + ' ' + month_name + ' ' + year;
            var currentDate = new Date();
            var datePrevious = new Date();
            datePrevious.setDate(datePrevious.getDate() - 1);
            if (objd.getDate() == currentDate.getDate() && objd.getMonth() == currentDate.getMonth() && objd.getFullYear() == currentDate.getFullYear()) {
                return 'Today';
            }
            else if (objd.getDate() == datePrevious.getDate() && objd.getDay() == datePrevious.getDay() && objd.getFullYear() == datePrevious.getFullYear()) {
                return 'Yesterday';
            }
            else {
                return formatted_date;
            }
        };
        // add group check exist or not
        /*this.http.post(this.apiUrl + 'group', body, {
            headers: headers
        })
        .subscribe(res => {
            this.groupAgentdata = res.json()
            if (this.groupAgentdata.data == "" || this.groupAgentdata.data == null) {
                this.nogroup = false;
            } else {
                this.nogroup = true;
            }
        }, (err) => {
            this.errdata = err.json()
            if (this.errdata.error == 'token_invalid') {
                this.events.publish(('user:checksession'))
            }
        });*/
        this.checkagent = function (agentemail, ind) {
            var agentTempId = localStorage.chatrefchat.split('/chats/')[1].split(',')[0];
            _this.addedAgentRef = _this.db.list('/addedagents');
            _this.addedAgentRef.subscribe(function (item) {
                for (var i = 0; i < item.length; i++) {
                    if (item[i].email == agentemail && item[i].anoynomousUid == agentTempId) {
                        _this.agentclass[ind] = 'agent_add_link active';
                    }
                }
            });
        };
        this.checkGroup = function (group_id, ind) {
            var anoynomousTempId = localStorage.chatrefchat.split('/chats/')[1].split(',')[0];
            _this.addedGroupRef = _this.db.list('/addedgroups');
            _this.addedGroupRef.subscribe(function (item) {
                //console.log('fetching group list'+JSON.stringify(item));
                for (var i = 0; i < item.length; i++) {
                    if (item[i].group_id == group_id && item[i].anoynomousUid == anoynomousTempId) {
                        // alert('already present')
                        //console.log('Inside Deactive link ')
                        _this.groupclass[ind] = 'agent_add_link active';
                    }
                }
            });
        };
        for (var i = 0; i < this.agentlist.length; i++) {
            this.agentclass[i] = 'agent_add_link';
        }
        /*****Code to fetch the user which should receive notification*********/
        var agentsLocalList = this.db.list("/agents");
        var idChat = localStorage.getItem('chatrefchat').split('/')[2];
        //console.log('idChat => '+idChat);
        agentsLocalList.subscribe(function (resp) {
            //console.log('resp => '+JSON.stringify(resp));
            var tempNoti = [];
            localStorage.getItem('chatfirsttype') == '2'
                ? (tempNoti = [])
                : (tempNoti = [
                    {
                        key: localStorage
                            .getItem('chatrefchat')
                            .split('/')[2]
                            .split(',')[1],
                        fcm: false
                    }
                ]);
            var _loop_1 = function (j) {
                for (var key in resp[j]) {
                    if (resp[j][key].chatref == idChat) {
                        var tempInd = tempNoti.findIndex(function (x) { return x.key == resp[j].$key; });
                        if (tempInd == -1)
                            tempNoti.push({ key: resp[j].$key, fcm: false });
                        continue;
                    }
                }
                if (j == resp.length - 1) {
                    _this.usersNotification = tempNoti;
                    var _loop_2 = function (m) {
                        var usersTokenList = _this.db.object("/users/" + _this.usersNotification[m].key);
                        usersTokenList.subscribe(function (item) {
                            if (item.FCMToken != undefined && _this.usersNotification) {
                                if (item.FCMToken != 'null') {
                                    _this.usersNotification[m].fcm = item.FCMToken;
                                    _this.usersNotification[m].id = item.id;
                                    _this.usersNotification[m].userType = item.userType;
                                    if (m == _this.usersNotification.length - 1)
                                        _this.removeIDWhenNotAllow(0);
                                }
                                else {
                                    _this.usersNotification[m].fcm = false;
                                    _this.usersNotification[m].id = item.id;
                                    _this.usersNotification[m].userType = item.userType;
                                    if (m == _this.usersNotification.length - 1)
                                        _this.removeIDWhenNotAllow(0);
                                }
                            }
                            else {
                                // this.usersNotification[m].fcm=false;
                                if (_this.usersNotification[m].fcm) {
                                    _this.usersNotification[m].fcm = false;
                                }
                                _this.usersNotification[m].id = item.id;
                                _this.usersNotification[m].userType = item.userType;
                                if (m == _this.usersNotification.length - 1)
                                    _this.removeIDWhenNotAllow(0);
                            }
                        });
                    };
                    for (var m = 0; m < _this.usersNotification.length; m++) {
                        _loop_2(m);
                    }
                }
            };
            //console.log('tempNoti => ',JSON.stringify(tempNoti))
            for (var j = 0; j < resp.length; j++) {
                _loop_1(j);
            }
        });
    };
    /** remove that users who dont enable notifications or timing not lies **/
    InfoPage.prototype.removeIDWhenNotAllow = function (index) {
        var _this = this;
        var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        if (index == 0)
            this.manageIDArr = Object.assign([], this.usersNotification);
        if (index < this.usersNotification.length) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            //console.log('this.usersNotification ',JSON.stringify(this.usersNotification));
            var body = JSON.stringify({
                userId: this.usersNotification[index].id,
                userType: this.usersNotification[index].userType
            });
            this.http.post(this.apiUrl + 'get-user-profile', body, { headers: headers }).subscribe(function (res) {
                var output = res.json();
                _this.commondata.profile = output.data.profile;
                if (output.data.operation_hours.notification_status == 0) {
                    _this.manageIDArr.splice(index, 1);
                    index++;
                    _this.removeIDWhenNotAllow(index);
                }
                else {
                    if (output.data.operation_hours[dayNames[new Date().getDay()]] == '') {
                        _this.manageIDArr.splice(index, 1);
                        index++;
                        _this.removeIDWhenNotAllow(index);
                    }
                    else {
                        var lower = output.data.operation_hours[dayNames[new Date().getDay()]].split('-')[0];
                        var upper = output.data.operation_hours[dayNames[new Date().getDay()]].split('-')[1];
                        if (output.data.operation_hours.time_format == '12') {
                            var lowerComplex = { hour: 0, minute: 0 };
                            var upperComplex = { hour: 0, minute: 0 };
                            if (lower.split(' ')[1] == 'AM') {
                                lowerComplex.hour = lower.split(' ')[0].split(':')[0];
                                lowerComplex.minute = lower.split(' ')[0].split(':')[1];
                            }
                            else {
                                lowerComplex.hour = parseInt(lower.split(' ')[0].split(':')[0]) + 12;
                                lowerComplex.minute = lower.split(' ')[0].split(':')[1];
                            }
                            if (upper.split(' ')[1] == 'AM') {
                                upperComplex.hour = upper.split(' ')[0].split(':')[0];
                                upperComplex.minute = upper.split(' ')[0].split(':')[1];
                            }
                            else {
                                upperComplex.hour = parseInt(upper.split(' ')[0].split(':')[0]) + 12;
                                upperComplex.minute = upper.split(' ')[0].split(':')[1];
                            }
                            var lowerTime = new Date(new Date(new Date().setHours(lowerComplex.hour)).setMinutes(lowerComplex.minute)).getTime();
                            var upperTime = new Date(new Date(new Date().setHours(upperComplex.hour)).setMinutes(upperComplex.minute)).getTime();
                            if (lowerTime == upperTime) {
                                index++;
                                _this.removeIDWhenNotAllow(index);
                            }
                            else if (lowerTime <= new Date().getTime() && new Date().getTime() <= upperTime) {
                                index++;
                                _this.removeIDWhenNotAllow(index);
                            }
                            else {
                                _this.manageIDArr.splice(index, 1);
                                index++;
                                _this.removeIDWhenNotAllow(index);
                            }
                        }
                        else {
                            var lowerTime = new Date(new Date(new Date().setHours(lower.split(':')[0])).setMinutes(lower.split(':')[1])).getTime();
                            var upperTime = new Date(new Date(new Date().setHours(upper.split(':')[0])).setMinutes(upper.split(':')[1])).getTime();
                            if (lowerTime <= new Date().getTime() && new Date().getTime() <= upperTime) {
                                index++;
                                _this.removeIDWhenNotAllow(index);
                            }
                            else {
                                _this.manageIDArr.splice(index, 1);
                                index++;
                                _this.removeIDWhenNotAllow(index);
                            }
                        }
                    }
                }
            });
        }
        else {
            this.usersNotification = Object.assign([], this.manageIDArr);
            this.manageIDArr = [];
        }
    };
    InfoPage.prototype.ionViewDidLoad = function () {
        if (this.commondata.userstatus == undefined || this.commondata.userstatus == null || this.commondata.userstatus == '') {
            this.commondata.userstatus = 'online';
        }
    };
    /** disable other users as user receives message **/
    InfoPage.prototype.disableOtherUsers = function (ref, userID, times) {
        var _this = this;
        if (times) {
            if (localStorage.getItem('chatfirsttype') != '2')
                this.addedAgentFTime(ref, userID);
        }
        var agentsLocalListTemp = this.db.list("/agents");
        var lengthTemp = 0;
        var testTemp = 0;
        agentsLocalListTemp.subscribe(function (data) {
            lengthTemp = data.length;
        });
        var agentsLocalList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/agents/");
        agentsLocalList.once('value', function (item) {
            var resp = item.val();
            //console.log('resp => '+JSON.stringify(resp));
            var tempNoti = [];
            var _loop_3 = function (j) {
                testTemp++;
                for (var key in resp[j]) {
                    if (resp[j][key].chatref == ref) {
                        var tempInd = tempNoti.findIndex(function (x) { return x.key == j; });
                        if (tempInd == -1 && j != userID)
                            tempNoti.push(j);
                        continue;
                    }
                }
                if (lengthTemp == testTemp) {
                    if (localStorage.getItem('chatfirsttype') != '2')
                        tempNoti.push(ref.split(',')[1]);
                    _this.recusionForDis(0, tempNoti, ref, times);
                }
            };
            for (var j in resp) {
                _loop_3(j);
            }
        });
    };
    /** recursively call all to disable the user new message seen **/
    InfoPage.prototype.recusionForDis = function (ind, tempNoti, ref, times) {
        var _this = this;
        if (ind < tempNoti.length) {
            var id_1 = ref.split(',')[0] + ',' + tempNoti[ind];
            var usersLeaveList_1 = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id_1);
            //let usersLeaveList = this.db.list(`/userChatRef/${id}`);
            return new Promise(function (resolve, reject) {
                usersLeaveList_1.once('value', function (item) {
                    resolve(item.val());
                });
            }).then(function (item) {
                //console.log('item => '+JSON.stringify(item));
                for (var key in item) {
                    var itemObservable = _this.db.object("/userChatRef/" + id_1 + "/" + key);
                    itemObservable.update({
                        leave: times,
                        source: 'update status for my queue'
                    });
                }
                ind++;
                return _this.recusionForDis(ind, tempNoti, ref, times);
            });
        }
        else {
            //console.log('recusionForDis complete');
        }
    };
    /** Added agents First time **/
    InfoPage.prototype.addedAgentFTime = function (ref, userID) {
        var agentTableId1 = this.up.firedata2;
        agentTableId1.once('value', function (item) {
            var itemVal = item.val();
            if (item == null) {
                agentTableId1.push({
                    agentid: userID,
                    anoynomousUid: ref.split(',')[0],
                    email: localStorage.getItem('chatfirstEmail')
                });
            }
            else {
                var flag = false;
                for (var key in itemVal) {
                    if (itemVal[key].agentid == userID && itemVal[key].anoynomousUid == ref.split(',')[0]) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    agentTableId1.push({
                        agentid: userID,
                        anoynomousUid: ref.split(',')[0],
                        email: localStorage.getItem('chatfirstEmail')
                    });
                }
            }
        });
    };
    /******** Function called when click on leave button ********/
    InfoPage.prototype.leaveChat = function () {
        var _this = this;
        var id = localStorage
            .getItem('chatrefchat')
            .split('/')[2]
            .split(',')[0] +
            ',' +
            localStorage.getItem('firebaseuid');
        var usersLeaveList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id);
        return new Promise(function (resolve, reject) {
            usersLeaveList.once('value', function (itemVal) {
                var item = itemVal.val();
                resolve(item);
            });
        }).then(function (item) {
            for (var key in item) {
                var itemObservable = _this.db.object("/userChatRef/" + id + "/" + key);
                itemObservable.update({
                    leave: true,
                    source: 'leavechat'
                });
            }
            _this.removeSpecialMsg();
            /** check last page and redirect there **/
            if (localStorage.prevPage == 'MyqueuePage') {
                _this.navCtrl.push('MyqueuePage');
            }
            else if (localStorage.prevPage == 'AllchatPage') {
                _this.navCtrl.push('AllchatPage');
            }
            else {
                _this.navCtrl.push('MyqueuePage');
            }
        });
    };
    /******* Remove from added agent table if admin leave *********/
    InfoPage.prototype.remFromAddedAgentTable = function () {
        var _this = this;
        var addedAgt = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/addedagents/");
        addedAgt.once('value', function (item) {
            var itemVal = item.val();
            var flag = false;
            var keyMatch = '';
            for (var key in itemVal) {
                if (itemVal[key].email == localStorage.getItem('chatfirstEmail') &&
                    itemVal[key].anoynomousUid ==
                        localStorage
                            .getItem('chatrefchat')
                            .split('/chats/')[1]
                            .split(',')[0]) {
                    flag = true;
                    keyMatch = key;
                    break;
                }
            }
            if (flag) {
                var addedAgtRemove = _this.db.list("/addedagents/" + keyMatch);
                addedAgtRemove.remove();
            }
            _this.managequeueWheLeave();
        });
    };
    InfoPage.prototype.managequeueWheLeave = function () {
        //this.navCtrl.push(MyqueuePage);
    };
    InfoPage.prototype.removeSpecialMsg = function () {
        var loginUserID = localStorage.getItem('firebaseuid');
        var tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
        var specialref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref);
        specialref.once('value', function (item) {
            var itemVal = item.val();
            if (item != null) {
                for (var key in itemVal) {
                    if (itemVal[key].loginuserid == loginUserID) {
                        var userRemove = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref + "/" + key);
                        userRemove.remove();
                    }
                }
            }
        });
        var userType;
        var type;
        localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
        this.chats.push({
            name: this.username,
            userid: localStorage.getItem('chatfirstid'),
            email: localStorage.getItem('chatfirstEmail'),
            specialMessage: true,
            joinmessage: userType + " - Left",
            time: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP,
            date: new Date(),
            image: localStorage.getItem('imagetosend'),
            type: type
        });
        if (localStorage.getItem('chatfirsttype') != '2')
            this.remFromAddedAgentTable();
        else
            this.managequeueWheLeave();
    };
    /** when all leave chat room assign admin **/
    InfoPage.prototype.assignAdminOnLeave = function () {
        var _this = this;
        var id = localStorage.getItem('chatrefchat').split('/')[2];
        var usersLeaveList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id);
        return new Promise(function (resolve, reject) {
            usersLeaveList.once('value', function (item) {
                resolve(item.val());
            });
        }).then(function (item) {
            for (var key in item) {
                var itemObservable = _this.db.object("/userChatRef/" + id + "/" + key);
                itemObservable.update({
                    leave: false,
                    source: 'assignAdminOnLeave'
                });
            }
        });
    };
    /** while admin leave so assign Admin **/
    InfoPage.prototype.assignAgentsWhenAdminLeave = function () {
        var loginUserId = localStorage.getItem('firebaseuid');
        var tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
        this.disableOtherUsers(tempref, loginUserId, false);
    };
    /**** Join Chat Room Functionality ****/
    InfoPage.prototype.joinChat = function () {
        var _this = this;
        var id = localStorage
            .getItem('chatrefchat')
            .split('/')[2]
            .split(',')[0] +
            ',' +
            localStorage.getItem('firebaseuid');
        var usersLeaveList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id);
        return new Promise(function (resolve, reject) {
            usersLeaveList.once('value', function (itemVal) {
                var item = itemVal.val();
                resolve(item);
            });
        }).then(function (item) {
            for (var key in item) {
                var itemObservable = _this.db.object("/userChatRef/" + id + "/" + key);
                itemObservable.update({
                    leave: false,
                    source: 'JoinChat'
                });
            }
            _this.addSpecialMessage();
        });
    };
    /** add special joined or left message **/
    InfoPage.prototype.addSpecialMessage = function () {
        var loginUserId = localStorage.getItem('firebaseuid');
        var tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
        var specialref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref);
        var userType;
        var type;
        localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
        specialref.push({
            loginuserid: loginUserId,
            chatref: tempref,
            status: type,
            time: new Date().getTime(),
            join: 'join button own'
        });
        if (localStorage.getItem('chatfirsttype') != '2') {
            this.addedAgentFTime(tempref, loginUserId);
        }
        this.chats.push({
            name: this.username,
            userid: localStorage.getItem('chatfirstid'),
            email: localStorage.getItem('chatfirstEmail'),
            specialMessage: true,
            joinmessage: userType + " - Joined",
            time: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP,
            date: new Date(),
            image: localStorage.getItem('imagetosend'),
            type: type
        });
    };
    /**** End Join Chat Room functionality ***/
    InfoPage.prototype.checkAvailaibility = function () {
        var _this = this;
        var ref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/users/');
        ref
            .once('value', function (item) {
            _this.usersData = item.val();
            if (_this.data != null) {
            }
        })
            .then(function () {
            //console.log('associated users for update token ==> ',JSON.stringify(this.usersNotification))
            _this.ind = 0;
            _this.recForIterateAllData(0, _this.usersNotification, _this.usersData);
        });
    };
    /** iterate all data recursively **/
    InfoPage.prototype.recForIterateAllData = function (ind, data, usersData) {
        var _this = this;
        if (ind < data.length) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
            var body = JSON.stringify({
                userId: data[ind].id,
                userType: data[ind].userType
            });
            this.http.post(this.apiUrl + 'get-user-profile', body, { headers: headers }).subscribe(function (res) {
                var output = res.json();
                _this.commondata.profile = output.data.profile;
                _this.getCurrentTime(output.data.operation_hours, usersData);
            });
        }
    };
    InfoPage.prototype.getCurrentTime = function (output, usersData) {
        var _this = this;
        var day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var currentDay = day[new Date().getDay()];
        var hour;
        var minute;
        for (var key in output) {
            if (key == currentDay) {
                if (output[key] != '') {
                    if (output[key].split('-')[0].split(' ')[1] == 'AM') {
                        hour = output[key]
                            .split('-')[0]
                            .split(' ')[0]
                            .split(':')[0];
                        minute = output[key]
                            .split('-')[0]
                            .split(' ')[0]
                            .split(':')[1];
                    }
                    else {
                        hour =
                            parseInt(output[key]
                                .split('-')[0]
                                .split(' ')[0]
                                .split(':')[0]) + 12;
                        minute = output[key]
                            .split('-')[0]
                            .split(' ')[0]
                            .split(':')[1];
                    }
                    var upperMili = new Date();
                    upperMili.setHours(hour);
                    upperMili.setMinutes(minute);
                    var uperMilliseconds = new Date(upperMili).getTime();
                    if (output[key].split('-')[1].split(' ')[1] == 'AM') {
                        hour = output[key]
                            .split('-')[1]
                            .split(' ')[0]
                            .split(':')[0];
                        minute = output[key]
                            .split('-')[1]
                            .split(' ')[0]
                            .split(':')[1];
                    }
                    else {
                        hour =
                            parseInt(output[key]
                                .split('-')[1]
                                .split(' ')[0]
                                .split(':')[0]) + 12;
                        minute = output[key]
                            .split('-')[1]
                            .split(' ')[0]
                            .split(':')[1];
                    }
                    // console.log('upper hour =>',hour)
                    // console.log('upper minute =>',minute)
                    var lowerMili = new Date();
                    lowerMili.setHours(hour);
                    lowerMili.setMinutes(minute);
                    var lowerMiliseconds = new Date(lowerMili).getTime();
                    // console.log(upperMili ,'&& ',lowerMili)
                    var currentMiliSec = new Date().getTime();
                    if (currentMiliSec >= uperMilliseconds && currentMiliSec <= lowerMiliseconds) {
                        console.log('send notification');
                    }
                    else {
                        // console.log('current Time not lying in the set time')
                        // console.log('this.usersData ==>',JSON.stringify(usersData))
                        for (var key_1 in usersData) {
                            if (usersData[key_1].id == output.user_id) {
                                //alert('delete this id fcm '+usersData[key].id)
                                var dbref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/users/" + key_1);
                                dbref
                                    .update({
                                    FCMToken: ''
                                })
                                    .then(function () {
                                    //call recursive functiuion
                                    _this.ind++;
                                    _this.recForIterateAllData(_this.ind, _this.usersNotification, usersData);
                                });
                            }
                        }
                    }
                }
                else {
                    //console.log('blank');
                    for (var key_2 in usersData) {
                        // console.log('key->',key)
                        if (usersData[key_2].id) {
                            // console.log(usersData[key].id+'=='+output.user_id)
                            if (usersData[key_2].id == output.user_id) {
                                // console.log('true ==>')
                                var ref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/users/" + key_2);
                                ref.update({ FCMToken: '' });
                                this.recForIterateAllData(0, this.usersNotification, usersData);
                            }
                        }
                    }
                }
            }
        }
    };
    /** send message functionality **/
    InfoPage.prototype.sendmymessage = function () {
        var _this = this;
        if (this.message.trim() == '')
            return;
        var finalArrToken = [];
        for (var k = 0; k < this.usersNotification.length; k++) {
            if (this.usersNotification[k].fcm != false)
                finalArrToken.push(this.usersNotification[k].fcm);
        }
        if (this.disableUser)
            this.disableUser = false;
        if (this.message == '' || this.message == undefined) {
        }
        else {
            if (localStorage.getItem('chatfirsttype') == '2') {
                this.chattype = 'company';
            }
            else {
                this.chattype = 'agent';
            }
            if (finalArrToken.length > 0) {
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'key=' + this.commondata.fbconfig.apiKey);
                var body = {
                    notification: {
                        title: 'Custom Ionic',
                        body: this.message,
                        sound: 'default',
                        click_action: 'FCM_PLUGIN_ACTIVITY',
                        icon: 'fcm_push_icon'
                    },
                    registration_ids: finalArrToken
                };
                this.http
                    .post('https://fcm.googleapis.com/fcm/send', body, {
                    headers: headers
                })
                    .subscribe(function (res) {
                    //console.log('res => '+JSON.stringify(res));
                }, function (err) {
                    // console.log('res err => '+JSON.stringify(err));
                });
            }
            var id_2 = localStorage
                .getItem('chatrefchat')
                .split('/')[2]
                .split(',')[0] +
                ',' +
                localStorage.getItem('firebaseuid');
            var usersLeaveList_2 = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id_2);
            return new Promise(function (resolve, reject) {
                usersLeaveList_2.once('value', function (item) {
                    var itemVal = item.val();
                    resolve(itemVal);
                });
            }).then(function (itemVal) {
                for (var key in itemVal) {
                    if (itemVal[key].leave == true) {
                        var itemObservable = _this.db.object("/userChatRef/" + id_2 + "/" + key);
                        itemObservable.update({
                            leave: false,
                            source: 'sendmessage'
                        });
                        var userType = void 0;
                        var type = void 0;
                        localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
                        _this.chats.push({
                            name: _this.username,
                            userid: localStorage.getItem('chatfirstid'),
                            email: localStorage.getItem('chatfirstEmail'),
                            specialMessage: true,
                            joinmessage: userType + " - Joined",
                            time: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP,
                            date: new Date(),
                            image: localStorage.getItem('imagetosend'),
                            type: _this.chattype
                        });
                        _this.inUserWhenMsgAfterLeave();
                    }
                    _this.chats
                        .push({
                        name: _this.username,
                        userid: _this.useridkey,
                        email: localStorage.getItem('chatfirstEmail'),
                        specialMessage: false,
                        message: _this.message,
                        time: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP,
                        date: new Date(),
                        image: _this.showimage,
                        type: _this.chattype
                    })
                        .then(function () {
                        setTimeout(function () {
                            if (_this.content._scroll)
                                _this.content.scrollToBottom();
                        }, 500);
                    })
                        .catch(function () { });
                    _this.message = '';
                }
            });
        }
    };
    /****** Include user in chat reference when user message after leave *********/
    InfoPage.prototype.inUserWhenMsgAfterLeave = function () {
        var loginUserId = localStorage.getItem('firebaseuid');
        var tempref = localStorage.getItem('chatrefchat').split('/chats/')[1];
        var specialref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref);
        var userType;
        var type;
        localStorage.getItem('chatfirsttype') == '2' ? ((userType = 'Company'), (type = 'company')) : ((userType = 'Agent'), (type = 'agent'));
        specialref.push({
            loginuserid: loginUserId,
            chatref: tempref,
            status: type,
            time: new Date().getTime(),
            join: 'own'
        });
        if (localStorage.getItem('chatfirsttype') != '2')
            this.addedAgentFTime(tempref, loginUserId);
    };
    InfoPage.prototype.ClickPhoto = function () {
        this.navCtrl.push(InfoPage_1);
    };
    /** check message validation **/
    InfoPage.prototype.mymessage = function (val) {
        if (val == '' || val == undefined || val == null || val.trim() == '') {
            this.sendmessage = false;
        }
        else {
            this.sendmessage = true;
        }
    };
    InfoPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        localStorage.setItem('prevPage', null);
        localStorage.currentNotiPage = '';
        var id = localStorage
            .getItem('chatrefchat')
            .split('/')[2]
            .split(',')[0] +
            ',' +
            localStorage.getItem('firebaseuid');
        var usersLeaveList = this.db.list("/userChatRef/" + id);
        return new Promise(function (resolve, reject) {
            usersLeaveList.subscribe(function (item) {
                resolve(item);
            });
        }).then(function (item) {
            if (item[0] == undefined) {
                usersLeaveList.push({
                    chatRef: id,
                    leaveTime: new Date().getTime(),
                    leave: false,
                    source: 'leavepage'
                });
            }
            else {
                var itemObservable = _this.db.object("/userChatRef/" + id + "/" + item[0].$key);
                itemObservable.update({
                    leaveTime: new Date().getTime(),
                    source: 'leavepageupdate'
                });
            }
        });
    };
    InfoPage.prototype.messagekey = function (keyvalue) { };
    InfoPage.prototype.addagent = function () {
        var _this = this;
        //end
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
        var body = JSON.stringify({
            userId: localStorage.getItem('chatfirstid') // chatfirst id is company id
        });
        this.http
            .post(this.apiUrl + 'get-login-agent', body, {
            headers: headers
        })
            .subscribe(function (res) {
            _this.data = res.json();
            if (_this.data.data == '' || _this.data.data == null) {
                _this.list = false;
            }
            else {
                _this.list = true;
                _this.agentlist = _this.data.data;
                //check if email already present
                for (var i = 0; i < _this.agentlist.length; i++) {
                    _this.checkagent(_this.agentlist[i].email_id, i);
                }
                //check end
                _this.noagent = false;
            }
            //resolve(res.json());
        }, function (err) {
            _this.errdata = err.json();
            if (_this.errdata.error == 'token_invalid') {
                _this.events.publish(('user:checksession'));
            }
        });
        //check if agent is already in database
    };
    /** manage + and . icon **/
    InfoPage.prototype.chatagent = function (email, index) {
        var _this = this;
        for (var i = 0; i < this.agentlist.length; i++) {
            if (this.agentlist[i].email_id == email) {
                this.agentclass[i] = 'agent_add_link active';
            }
        }
        // code to set entry in agents table with chat ref
        this.chatroomref = localStorage.getItem('chatrefchat');
        this.chatroomref = this.chatroomref.split('chats/')[1]; // companyid,userid
        var usersList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/users/");
        usersList.once('value', function (item) {
            var itemVal = item.val();
            var cnt = 0;
            var _loop_4 = function (key) {
                cnt++;
                if (itemVal[key].email == email) {
                    _this.agentuserid = key;
                    cnt = Object.keys(itemVal).length;
                }
                if (cnt == Object.keys(itemVal).length) {
                    _this.currentAgentRef1 = _this.db.list("/addedagents");
                    var chatref = localStorage.getItem('chatrefchat');
                    chatref = chatref.split('/chats/')[1].split(',')[0];
                    _this.currentAgentRef1.push({
                        agentid: _this.agentuserid,
                        email: email,
                        anoynomousUid: chatref,
                        source: 'admin1',
                        chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
                    });
                    /****** Entry in User Chat Ref Table  ********/
                    var id_3 = localStorage
                        .getItem('chatrefchat')
                        .split('/')[2]
                        .split(',')[0] +
                        ',' +
                        _this.agentuserid;
                    var usersLeaveList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id_3);
                    usersLeaveList.once('value', function (item) {
                        var itemVal = item.val();
                        for (var key_3 in itemVal) {
                            var itemObservable = _this.db.object("/userChatRef/" + id_3 + "/" + key_3);
                            itemObservable.update({
                                leave: false,
                                source: 'enable agent from plus icon add agent'
                            });
                        }
                    });
                    /***** End Entry in User Chat Ref  *********/
                    var loginUserId = _this.agentuserid;
                    var tempref = localStorage.getItem('chatrefchat').split('/')[2];
                    var specialref = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref);
                    specialref.push({
                        loginuserid: loginUserId,
                        chatref: tempref,
                        status: 'agent',
                        time: new Date().getTime(),
                        join: 'admin'
                    });
                    return "break";
                }
            };
            for (var key in itemVal) {
                var state_1 = _loop_4(key);
                if (state_1 === "break")
                    break;
            }
        });
    };
    //group
    InfoPage.prototype.addGroup = function () {
        this.nogroup = false;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
        /* Uncomment for groups*/
        /*let body = JSON.stringify({
            userId: localStorage.getItem('chatfirstid'),
        });*/
        /**** Api to fetch group list  */
        /*this.http.post(this.apiUrl + 'group', body, {
            headers: headers
        }).subscribe((res) => {
                this.groupAgentdata = res.json();

                //console.log(JSON.stringify(this.data))
                if (this.groupAgentdata.data == "" || this.groupAgentdata.data == null) {
                    this.checklist = false;
                } else {
                    this.grouplist = this.groupAgentdata.data;
                    this.checklist = true;
                    //check if group already present
                    for (let i = 0; i < this.grouplist.length; i++) {
                        this.checkGroup(this.grouplist[i].group_id, i); //call this func
                    }
                    //end
                }
            }, (err) => {
                this.errdata = err.json()
                if (this.errdata.error == 'token_invalid') {
                    this.events.publish(('user:checksession'))
                }
            }
        )*/
    };
    //to fetch all agents when click to particular group
    InfoPage.prototype.chatGroup = function (group_id, group_name, i) {
        var _this = this;
        for (var i_1 = 0; i_1 < this.grouplist.length; i_1++) {
            if (this.grouplist[i_1].group_id == group_id) {
                this.groupclass[i_1] = 'agent_add_link active';
            }
        }
        //also push this key to addedagents table
        this.currentGroup = this.db.list("/addedgroups");
        var chatref = localStorage.getItem('chatrefchat');
        chatref = chatref.split('/chats/')[1].split(',')[0]; //get clicked users id
        this.currentGroup.push({
            group_id: group_id,
            group_name: group_name,
            anoynomousUid: chatref
        });
        /******Api to get all agents chat list here based on particular group id  */
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
        var body = JSON.stringify({
            userId: localStorage.getItem('chatfirstid'),
            groupId: group_id
        });
        this.http
            .post(this.apiUrl + 'getGroupAgent', body, {
            headers: headers
        })
            .subscribe(function (res) {
            _this.allAgentsList = res.json();
            if (_this.groupAgentdata.data == '' || _this.groupAgentdata.data == null) {
                //if
            }
            else {
                _this.groupAgentsList = [];
                for (var i = 0; i < _this.allAgentsList.agentList.length; i++) {
                    if (_this.allAgentsList.agentList[i].groupStatus == 1) {
                        _this.groupAgentsList.push(_this.allAgentsList.agentList[i].email);
                    }
                }
                _this.chatroomref = localStorage.getItem('chatrefchat').split('chats/')[1]; // companyid,userid
                /***********Code to fetch the firebase id of agents*********/
                var usersList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/users/");
                usersList.once('value', function (item) {
                    var itemVal = item.val();
                    var firebaseIdArr = [];
                    var cnt = 0;
                    for (var key in itemVal) {
                        var ind = _this.groupAgentsList.indexOf(itemVal[key].email);
                        cnt++;
                        if (ind != -1) {
                            firebaseIdArr.push({ key: key, email: itemVal[key].email });
                        }
                        if (cnt == Object.keys(itemVal).length) {
                            _this.addAgentsInChatRefWhenGroupsAdd(0, firebaseIdArr);
                        }
                    }
                });
                /*this.db.list('/users')
        .subscribe(data => {
            this.getuserdata = data;
            let firebaseIdArr=[];
            for (let j = 0; j < this.groupAgentsList.length; j++) {
                let agentInd=this.getuserdata.findIndex((x) => x.email == this.groupAgentsList[j])
                if(agentInd!=-1)
                    firebaseIdArr.push({key:this.getuserdata[agentInd].$key,email:this.groupAgentsList[j]});
                if(j==this.groupAgentsList.length-1){
                    this.addAgentsInChatRefWhenGroupsAdd(0,firebaseIdArr);
                }
            }
        })*/
            }
        }, function (err) {
            _this.errdata = err.json();
            if (_this.errdata.error == 'token_invalid') {
                _this.events.publish(('user:checksession'));
            }
        });
        /******End Api to get all agents chat list here based on particular group id  */
    };
    /** add all agents along with group **/
    InfoPage.prototype.addAgentsInChatRefWhenGroupsAdd = function (index, firebaseIdArr) {
        var _this = this;
        //console.log('firebaseIdArr => '+JSON.stringify(firebaseIdArr));
        if (index < firebaseIdArr.length) {
            var id_4 = localStorage
                .getItem('chatrefchat')
                .split('/')[2]
                .split(',')[0] +
                ',' +
                firebaseIdArr[index].key;
            var usersLeaveList = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/userChatRef/" + id_4);
            usersLeaveList.once('value', function (item) {
                var itemVal = item.val();
                if (item != null) {
                    for (var key in itemVal) {
                        var itemObservable = _this.db.object("/userChatRef/" + id_4 + "/" + key);
                        itemObservable.update({
                            leave: false,
                            source: 'enable agent from plus icon add group'
                        });
                        index++;
                        return _this.addAgentsInChatRefWhenGroupsAdd(index, firebaseIdArr);
                    }
                }
            });
        }
        else {
            //console.log('add group recursion for chat reference complete');
            this.addAgentsInAddedAgentWhenGroupsAdd(0, firebaseIdArr);
        }
    };
    /** add agents if already added agents **/
    InfoPage.prototype.addAgentsInAddedAgentWhenGroupsAdd = function (index, firebaseIdArr) {
        var _this = this;
        if (index < firebaseIdArr.length) {
            var addedAgentList_1 = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/addedagents/");
            var chatref_1 = localStorage
                .getItem('chatrefchat')
                .split('/')[2]
                .split(',')[0];
            addedAgentList_1.once('value', function (item) {
                var itemVal = item.val();
                //console.log('itemVal => '+JSON.stringify(itemVal));
                var flag = false;
                if (itemVal == null) {
                    addedAgentList_1.push({
                        agentid: firebaseIdArr[index].key,
                        email: firebaseIdArr[index].email,
                        anoynomousUid: chatref_1,
                        source: 'from added group',
                        chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
                    });
                    index++;
                    return _this.addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr);
                }
                else {
                    for (var key in itemVal) {
                        if (itemVal[key].agentid == firebaseIdArr[index].key && itemVal[key].anoynomousUid == chatref_1) {
                            flag = true;
                            break;
                        }
                        else {
                        }
                    }
                    if (flag == false) {
                        addedAgentList_1.push({
                            agentid: firebaseIdArr[index].key,
                            email: firebaseIdArr[index].email,
                            anoynomousUid: chatref_1,
                            source: 'from added group',
                            chatref: localStorage.getItem('chatrefchat').split('/chats/')[1]
                        });
                        index++;
                        return _this.addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr);
                    }
                    else {
                        index++;
                        return _this.addAgentsInAddedAgentWhenGroupsAdd(index, firebaseIdArr);
                    }
                }
            });
        }
        else {
            //console.log('add group recursion for added agent table complete');
            this.addAgentsInSpclMsgWhenGroupsAdd(0, firebaseIdArr);
        }
    };
    /** special message of all agents **/
    InfoPage.prototype.addAgentsInSpclMsgWhenGroupsAdd = function (index, firebaseIdArr) {
        var _this = this;
        if (index < firebaseIdArr.length) {
            var loginUserId_1 = firebaseIdArr[index].key;
            var tempref_1 = localStorage.getItem('chatrefchat').split('/')[2];
            var specialref_1 = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/specialmessage/" + tempref_1);
            specialref_1.once('value', function (item) {
                var itemVal = item.val();
                if (itemVal == null) {
                    specialref_1.push({
                        loginuserid: loginUserId_1,
                        chatref: tempref_1,
                        status: 'agent',
                        time: new Date().getTime(),
                        join: 'admin'
                    });
                    index++;
                    return _this.addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr);
                }
                else {
                    var flag = false;
                    for (var key in itemVal) {
                        if (itemVal[key].loginuserid == loginUserId_1) {
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        specialref_1.push({
                            loginuserid: loginUserId_1,
                            chatref: tempref_1,
                            status: 'agent',
                            time: new Date().getTime(),
                            join: 'admin'
                        });
                        index++;
                        return _this.addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr);
                    }
                    else {
                        index++;
                        return _this.addAgentsInSpclMsgWhenGroupsAdd(index, firebaseIdArr);
                    }
                }
            });
        }
        else {
            //console.log('add group recursion for added agent table complete');
        }
    };
    /** update name of snippet user   **/
    InfoPage.prototype.updateName = function (uname) {
        var interlocutor;
        if (localStorage.chatfirsttype == 2) {
            interlocutor = localStorage.getItem('paramid');
            if (uname != '') {
                this.db.list('/users').update(interlocutor, {
                    username: uname
                });
            }
        }
        else {
            interlocutor = localStorage.getItem('paramid').split(',')[0];
            if (uname != '') {
                this.db.list('/users').update(interlocutor, {
                    username: uname
                });
            }
        }
        if (uname != '') {
            /*** code to update name  in visitors table  ***/
            var visitorUpdateRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/visitors');
            visitorUpdateRef.once('value', function (item) {
                var items = item.val();
                for (var key in items) {
                    // console.log('key >>',JSON.stringify(key));
                    // console.log('key >>',JSON.stringify(items[key]));
                    for (var key1 in items[key]) {
                        console.log('data :: ', JSON.stringify(items[key][key1]));
                        /*** update code */
                        if (items[key][key1].anoynomousUid == interlocutor) {
                            var updatePath = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref("/visitors/" + key + "/" + key1);
                            updatePath.update({ name: uname });
                        }
                    }
                }
            });
        }
    };
    /** update snippet users email **/
    InfoPage.prototype.updateEmail = function (uemail) {
        if (uemail != '') {
            var interlocutor = localStorage.getItem('paramid');
            this.db.list('/users').update(interlocutor, {
                email: uemail
            });
        }
    };
    /** update mobile number of snippet user **/
    InfoPage.prototype.updateMobile = function (umobile) {
        if (umobile != '') {
            var interlocutor = localStorage.getItem('paramid');
            this.db.list('/users').update(interlocutor, {
                mobile: umobile
            });
        }
    };
    return InfoPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_7_ionic_angular_index__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_ionic_angular_index__["c" /* Content */])
], InfoPage.prototype, "content", void 0);
InfoPage = InfoPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-info',template:/*ion-inline-start:"c:\xampp\htdocs\cometengage\client\app\src\pages\info\info.html"*/'<!--\n  Generated template for the GroupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="cus-header cus-back-icon">\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			Info\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div class="chat_mobile">\n		<div class="chat_side_block">\n			<div class="form_block">\n				<ion-list>\n					<form [formGroup]="signupForm">\n						<ion-item>\n							<ion-label stacked>Name</ion-label>\n							<ion-input type="text" maxLength="30" [(ngModel)]="uname" formControlName="uname" value="{{uname}}" (ionBlur)="updateName(uname)"></ion-input>\n						</ion-item>\n\n						<p class="valid-form" *ngIf="!signupForm.controls.uname.valid  && signupForm.controls.uname.dirty">\n							Please enter a valid name.\n						</p>\n\n						<ion-item>\n							<!-- <ion-label stacked>{{showagent}}</ion-label> -->\n							<ion-label stacked>Email</ion-label>\n							<ion-input type="email" value="{{uemail}}" [(ngModel)]="uemail" formControlName="uemail" (ionBlur)="updateEmail(uemail)"></ion-input>\n						</ion-item>\n						<p class="valid-form" *ngIf="!signupForm.controls.uemail.valid  && signupForm.controls.uemail.dirty">\n							Please enter a valid email.\n						</p>\n\n\n						<ion-item>\n							<ion-label stacked>Phone Number</ion-label>\n							<ion-input type="text" value="{{umobile}}" [(ngModel)]="umobile" formControlName="umobile" (ionBlur)="updateMobile(umobile)"></ion-input>\n						</ion-item>\n\n						<p class="valid-form" *ngIf="!signupForm.controls.umobile.valid  && signupForm.controls.umobile.dirty">\n							Please enter a valid number.\n						</p>\n					</form>\n				</ion-list>\n				<div class="change-email-btn account-btn">\n					<button ion-button block class="green-btn" (click)="addagent()" *ngIf="noagent">Add Agent</button>\n				</div>\n\n				<div class="agent-list" *ngIf="list">\n					<div class="agent-repeat" *ngFor="let agent of agentlist; let i=index;" [className]="agentclass[i]">\n						<a class="agent_add_link" href="javascript:void(0);">\n							<span class="green_dot"></span>\n							<span class="agent_name">{{agent.name}}</span>\n							<span class="green_plus" (click)="chatagent(agent.email_id,i)">+</span>\n						</a>\n					</div>\n\n\n					<!-- <button *ngFor="let buttoncolor of colorsarr; let i=index;" [className]="buttonclass[i]" [ngStyle]="{\'background-color\': buttoncolor,\'color\':\'#ffffff\',\'border-color\': buttoncolor}" (click)="selectColor(buttoncolor,i)"></button>\n -->\n					<!-- <div class="agent-repeat">\n								<a class="agent_add_link active" href="javascript:void(0);">\n									<span class="green_dot"></span>\n									<span class="green_plus">+</span>\n									<span class="agent_name"></span>\n									 <span class="grey_em">you!</span>\n								</a>\n						</div>  -->\n				</div>\n\n				<div class="change-email-btn account-btn">\n					<button ion-button block class="green-btn" (click)="addGroup()" *ngIf="nogroup">Add Group</button>\n					<!-- // api -->\n				</div>\n\n\n				<div class="agent-list" *ngIf="checklist">\n					Groups\n					<div class="agent-repeat" *ngFor="let group of grouplist; let i=index;" [className]="groupclass[i]">\n						<a class="agent_add_link" href="javascript:void(0);">\n							<span class="green_dot"></span>\n							<span class="agent_name">{{group.group_name}}</span>\n							<!-- <span class="agent_name">{{agent.email_id}}</span> -->\n\n							<span class="green_plus" (click)="chatGroup(group.group_id,group.group_name,i)">+</span>\n\n\n							<!--  <span class="grey_em">you!</span> -->\n						</a>\n					</div>\n				</div>\n\n				<div class="select-btn footer-select-btn">\n					<!-- <button ion-button block class="grey-btn" *ngIf="list" (click)="leaveChat()">Leave</button>  -->\n					<button ion-button block class="abddsd asdasd red-btn" (click)="leaveChat()" *ngIf="!disableUser">Leave</button>\n					<button ion-button block class="green-btn" (click)="joinChat()" *ngIf="disableUser">Join</button>\n				</div>\n			</div>\n		</div>\n	</div>\n</ion-content>'/*ion-inline-end:"c:\xampp\htdocs\cometengage\client\app\src\pages\info\info.html"*/
    })
    /** copy page for mobile view when user click on i button on chat page  **/
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_9__providers_commondata_commondata__["a" /* CommondataProvider */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_8__providers_chats_chats__["a" /* ChatsProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_10__providers_usersprovider_usersprovider__["a" /* UsersproviderProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
], InfoPage);

var InfoPage_1;
//# sourceMappingURL=info.js.map

/***/ })

});
//# sourceMappingURL=7.js.map
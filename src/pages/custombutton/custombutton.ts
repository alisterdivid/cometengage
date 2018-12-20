import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController, MenuController, LoadingController, Events, IonicPage } from 'ionic-angular';

import { CommondataProvider } from '../../providers/commondata/commondata';

@IonicPage()
@Component({
	selector: 'page-custombutton',
	templateUrl: 'custombutton.html'
})
export class CustombuttonPage {
	/** Define variables **/

	apiUrl: any;
	appUrl: any;
	stringifiedfbconfig: any;
	Adminid: any;
	showhide: any;
	public name = 'Show widget code';
	errdata: any;

	color: string = '';
	colorsarr: Array<string> = ['#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979', '#819595'];
	buttonclass: Array<string> = [];

	position: string = 'BottomLeft';
	positions: any = {
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
	positionkeys: Array<string> = Object.keys(this.positions);

	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public events: Events, public http: Http, public loadingCtrl: LoadingController, public commondata: CommondataProvider) {
		this.apiUrl = commondata.apiUrl;
		this.appUrl = commondata.appUrl;
		this.stringifiedfbconfig = JSON.stringify(commondata.fbconfig);
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(true);
		this.events.publish('user:checksession');
		this.Adminid = localStorage.getItem('companyid');
		this.getSettings();
	}

	ionViewDidEnter() {
		localStorage.currentNotiPage = 'CustombuttonPage';
	}

	ionViewWillLeave() {
		localStorage.currentNotiPage = '';
	}

	setPosition(position) {
		this.postSetting({ type: 'position', value: position });
	}

	setColor(color, post = false) {
		this.color = color;
		for (let i = 0; i < this.colorsarr.length; i++) {
			if (this.colorsarr[i] == this.color) {
				this.buttonclass[i] = 'js-color colors__color colors__color--selected';
			} else {
				this.buttonclass[i] = 'js-color colors__color';
			}
		}
		if (post) {
			this.postSetting({ type: 'color', value: color });
		}
	}

	chat() {
		this.navCtrl.push('MychatPage');
	}

	changecode() {
		if ((this.showhide = !this.showhide)) {
			this.name = 'Hide widget code';
		} else {
			this.name = 'Show widget code';
		}
	}

	getSettings() {
		let body = JSON.stringify({ firebaseId: this.Adminid });
		this.http.post(this.apiUrl + 'getSetting', body, { headers: this.getPostHeaders() }).subscribe(
			res => {
				let data = res.json();
				this.color = data.data[0]['color'];
				this.position = data.data[0]['position'];
				this.setColor(this.color);
			},
			error => {
				this.handlePostError(error);
			}
		);
	}

	postSetting(setting) {
		let body = JSON.stringify({ firebaseId: this.Adminid, type: setting.type, value: setting.value });
		this.http.post(this.apiUrl + 'settingUpdate', body, { headers: this.getPostHeaders() }).subscribe(
			response => {},
			error => {
				this.handlePostError(error);
			}
		);
	}

	getPostHeaders() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('chatfirsttoken'));
		return headers;
	}

	handlePostError(error) {
		this.errdata = error.json();
		if (this.errdata.response_code == '401') {
		}
		if (this.errdata.error == 'token_invalid') {
			this.events.publish('user:checksession');
		}
	}
}



// WEBPACK FOOTER //
// ./src/pages/custombutton/custombutton.ts
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';

import { ActionSheet } from '@ionic-native/action-sheet';
import { Camera } from '@ionic-native/camera';
import { FCM } from '@ionic-native/fcm';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ChatsProvider } from '../providers/chats/chats';
import { CommondataProvider } from '../providers/commondata/commondata';
import { MessagingServiceProvider } from '../providers/messaging-service/messaging-service';
import { UsersproviderProvider } from '../providers/usersprovider/usersprovider';

import { CometEngage } from './app.component';

const cloudSettings: CloudSettings = {
	core: {
		app_id: 'ff033666'
	},
	insights: {
		enabled: false
	},
	push: {
		sender_id: '316966730584',
		pluginConfig: {
			ios: {
				badge: true,
				sound: true
			},
			android: {
				iconColor: '#343434'
			}
		}
	}
};
/** firebase credentials **/
var firebase = {
	apiKey: 'AIzaSyCI4q4Tjh9BPWRTkqxLKs1mrFrKggssOgo',
	authDomain: 'cometengage.firebaseapp.com',
	databaseURL: 'https://cometengage.firebaseio.com',
	projectId: 'cometengage',
	storageBucket: 'cometengage.appspot.com',
	messagingSenderId: '316966730584'
};

var apiUrl = 'https://api.cometengage.com/api/';
var appUrl = 'https://app.cometengage.com/';
if (window.location.host == 'app.chatforyoursite.com') {
	apiUrl = 'https://api.chatforyoursite.com/api/';
	appUrl = 'https://app.chatforyoursite.com/';
	firebase = {
		apiKey: 'AIzaSyBTFld93SKOZoQZXkjdc_OMyImlTH9NPhY',
		authDomain: 'ccapp-00004.firebaseapp.com',
		databaseURL: 'https://ccapp-00004.firebaseio.com',
		projectId: 'ccapp-00004',
		storageBucket: 'ccapp-00004.appspot.com',
		messagingSenderId: '702094498151'
	};
}

@NgModule({
	declarations: [CometEngage],
	imports: [
		CommonModule,
		BrowserModule,
		HttpModule,
		CloudModule.forRoot(cloudSettings),
		AngularFireModule.initializeApp(firebase), // define AngularFire module
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(CometEngage, {})
	],
	bootstrap: [IonicApp],
	entryComponents: [CometEngage],
	providers: [StatusBar, SplashScreen, ActionSheet, Camera, { provide: ErrorHandler, useClass: IonicErrorHandler }, CommondataProvider, ChatsProvider, UsersproviderProvider, FCM, MessagingServiceProvider]
})
export class AppModule {}



// WEBPACK FOOTER //
// ./src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database/';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
//import { GooglePlus } from '@ionic-native/google-plus';
const firebaseConfig = {
  apiKey: "AIzaSyAU6qVO0Us9_ofqxkuj2GEzyz2pgRLDi-I",
  authDomain: "ioniclipson.firebaseapp.com",
  projectId: "ioniclipson",
  storageBucket: "ioniclipson.appspot.com",
  messagingSenderId: "999112778830",
  appId: "1:999112778830:web:bc663ad85d61e8796f0f1f"
};
const app = initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [
    AngularFireAuth,
    GooglePlus,
    { provide: 
    RouteReuseStrategy, useClass: IonicRouteStrategy,
  }, NavParams, ],
  bootstrap: [
    AppComponent

  ],
})
export class AppModule { }

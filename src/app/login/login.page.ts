import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

import { Capacitor } from '@capacitor/core';

import { Capability } from 'protractor';

import { Plugin } from '@capacitor/core';
import { Plugins } from 'protractor/built/plugins';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

}

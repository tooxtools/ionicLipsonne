import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capability } from 'protractor';
import '@codetrix-studio/capacitor-google-auth'
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
  UserInfo = null;

  constructor(private googlePlus: GooglePlus) { }

  ngOnInit() {
  }
  googleSignup() {
    this.googlePlus.login({
      webClientId: "999112778830-7df6sibj1ol5tpl24flpjjpe0pkjetts.apps.googleusercontent.com",
      onoffline: true
    })
      .then((res: any) => {
        console.log('Google singin done')
        console.log(res)
        let googleObject = {
          name: res.displayName,
          email: res.email
        }

      }).catch(err => {
        console.log('error', err);
        console.error(err);
      })

  }

}

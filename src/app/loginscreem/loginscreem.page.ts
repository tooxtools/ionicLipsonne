import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { NavController, LoadingController } from '@ionic/angular'

//registerWebPlugin(FacebookLogin);


import { Router } from '@angular/router';
import { FacebookLoginPlugin } from '@capacitor-community/facebook-login';

import { AuthenticationService } from "../shared/authentication-service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loginscreem',
  templateUrl: './loginscreem.page.html',
  styleUrls: ['./loginscreem.page.scss'],
})
export class LoginscreemPage implements OnInit {

  errorMessage: string = '';
  ValidationFormUSer: FormGroup;
  fbLogin: FacebookLoginPlugin;
  user = null;
  token = null;


  constructor(private router: Router, private http: HttpClient,
    private navCtrl: NavController, private formbuilder: FormBuilder, public authService: AuthenticationService,
    public loadingCtrl: LoadingController, public afAuth: AngularFireAuth) {  }

  ngOnInit() {

    this.ValidationFormUSer = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
    });

  }

  validationMessages = {
    //names: [{ type: "required", message: "Please Enter your Full Names" }],
    //phone: [{ type: "required", message: "Please Enter your Phone No." }],
    email: [
      { type: 'required', message: "Enter your Email Adress" },
      { type: "pattern", meesage: "Please the Email Entered is Incorrect. Try again.." }
    ],
    password: [
      { type: "required", message: "password is required here" },
      { type: "minlength", message: "Passwrd must be at least 5 character" }
    ]
  }
  loginUser() {
    const user = {
      email:this.ValidationFormUSer.value.email,
      password:this.ValidationFormUSer.value.password
    }
    console.log('user:'+user)
    this.authService.loginUser(user)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/home');
      }, err => {
        this.errorMessage = err.message;
      })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/singnup');
  }

  //faceboooooooooooooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkk

}
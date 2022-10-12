import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule} from '@angular/forms'

import {AlertController, NavController,LoadingController} from '@ionic/angular'

import { AppPreferences } from '@ionic-native/app-preferences/ngx';

import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-loginscreem',
  templateUrl: './loginscreem.page.html',
  styleUrls: ['./loginscreem.page.scss'],
})
export class LoginscreemPage implements OnInit {
 validationMessages = {
    names: [{type:"required", message:"Please Enter your Full Names"}],
    phone: [{type:"required", message:"Please Enter your Phone No."}],
    email: [
      {type: 'required',message:"Enter your Email Adress"},
      {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
    ],
    password: [
      {type: "required", message: "password is required here"},
      {type:"minlength", message: "Passwrd must be at least 6 character"}
    ]}

    validationsFormUser: FormGroup;
    errorMessage: string = '';



  constructor(private router: Router, 
    private navCtrl: NavController ,private formbuilder:FormBuilder,  public authService: AuthenticationService,
    public loadingCtrl : LoadingController,   ){}

  


  ngOnInit(){

  this.validationsFormUser = this.formbuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ]))
  })

  }
  loginUser(value) {
    this.authService.loginUser(value)
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
    
  }


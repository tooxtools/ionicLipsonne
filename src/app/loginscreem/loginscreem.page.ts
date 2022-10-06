import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";


@Component({
  selector: 'app-loginscreem',
  templateUrl: './loginscreem.page.html',
  styleUrls: ['./loginscreem.page.scss'],
})
export class LoginscreemPage implements OnInit {

  constructor(    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {  }
  logIn(email, password) {
    this.authService.SignIn(email, password)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['home']);          
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}


import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
//
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as firebase from 'firebase/app';
//
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { App } from '@capacitor/app';
import { initializeApp } from 'firebase/app';




//import * as firebase from 'firebase/compat';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private user: User;
  userData: any;
  username: string;
  uid: string;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public auth: AngularFireAuth,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password

  // loginUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afAuth.signInWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => resolve(res),
  //         err => reject(err))
  //   })
  // }

  // Register user with email/password

  // RegisterUser(email, password,) {
  //   return this.ngFireAuth.createUserWithEmailAndPassword(email!, password!);
  // }
  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      });
    });
  }
  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {

        this.router.navigate(['home']);

        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      country: user.country,
      city: user.city,
      sexe: user.sexe
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  async SignOut() {
    await this.ngFireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }




  setUser(user: User) {
    return this.user = user;
  }

  getUID(): string {
    return this.user.uid;
  }

  userRegistration(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(value?.email, value?.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }


  // signinUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => resolve(res),
  //         err => reject(err))
  //   })
  // }


  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value?.email, value?.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }




  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.ngFireAuth.currentUser) {
        this.ngFireAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((_error: any) => {
            reject();
          });
      }
    })
  }




  userDetails() {
    return this.auth.user
  }
  // GoogleloginAuth(){
  //   return this.googleplus.login({
  //     'scopes':'profile email',

  //     'webClientId':'206201421419-u1mp61vt8faleo46c8n4lm3hadsam9i7.apps.googleusercontent.com',
  //     'offline':true
  //   });
  // }


}
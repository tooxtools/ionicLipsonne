import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../shared/authentication-service";

import firebase from 'firebase/compat/app'

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;
  profileName: any;
  profileImageUrl: any;
  profileEmail: any;

  constructor(private database : AngularFirestore,public navCtrl:NavController,private authService: AuthenticationService) {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const result = this.database.doc(`/profile/${this.authService.getUID()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("PROFILE::", profile);
           this.profileName = profile['name'];
           this.profileImageUrl = profile['photoUrl'];
           this.profileEmail = profile['email'];
        })
      }
    })
   }


  ngOnInit() {  }
  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('/login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}



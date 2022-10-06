import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../shared/authentication-service";

import firebase from 'firebase/compat/app'

import { AngularFirestore } from '@angular/fire/compat/firestore';




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

  constructor(private database : AngularFirestore,private authservice: AuthenticationService) {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const result = this.database.doc(`/profile/${this.authservice.getUID()}`);
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


  ngOnInit() {
  }

}

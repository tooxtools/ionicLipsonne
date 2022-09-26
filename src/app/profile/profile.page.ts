import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( public authService: AuthenticationService) { }

  ngOnInit() {
  }

}

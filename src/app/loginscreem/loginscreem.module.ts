import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginscreemPageRoutingModule } from './loginscreem-routing.module';

import { LoginscreemPage } from './loginscreem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginscreemPageRoutingModule
  ],
  declarations: [LoginscreemPage]
})
export class LoginscreemPageModule {}

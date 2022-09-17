import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginscreemPage } from './loginscreem.page';

const routes: Routes = [
  {
    path: '',
    component: LoginscreemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginscreemPageRoutingModule {}

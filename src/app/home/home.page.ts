import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
Articles : any[];

  constructor (public navCtrl: NavController, public router:Router ){ 
    this.Articles=[
      {nom: 'Télévision', prix : 145, details: "De la Senegalaise"},
      {nom: 'Ordinateur', prix : 389,  details: "De la Senegalaise"},
      {nom: 'Ralonge', prix : 474,  details: "De la bonnnequiestcool"},
      {nom: 'Tableau', prix : 254, details: "superclass"},
      {nom: 'Decodeur', prix : 852, details: "bien taille sans trop"},
      {nom: 'Ampoule', prix : 357,  details: "ma propre cretivité"}
    ]
  } 
  showDetails(): void {
      this.navCtrl.navigateForward('/details');
      // this.router.navigate(['/details'])
      // console.log('daccord')
    }

    showData(data : any) :void{
      console.log('data is', data)
    }



  }

function showDetail() {
  throw new Error('Function not implemented.');
}


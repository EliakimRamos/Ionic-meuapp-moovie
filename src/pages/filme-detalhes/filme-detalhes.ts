import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoovieProvider]
})
export class FilmeDetalhesPage {
 public Filme;
 public FilmeId;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public movieProviders: MoovieProvider
    ) {
  }

  ionViewDidEnter() {
    this.FilmeId = this.navParams.get("id");
    this.movieProviders.getMooviesDetails(this.FilmeId).subscribe(data=>{
        let retorno = (data as any)._body;
        this.Filme = JSON.parse(retorno);
    },error =>{
      console.log(error);
    })
  }

}

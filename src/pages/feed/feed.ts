import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
      MoovieProvider
  ]
})
export class FeedPage {
 public loader;
  public lista_filmes = new Array<any>();
  public nomeUser:string = 'Eliakim R. de Souza';
  public objeto_feed = {
                         title: this.nomeUser,
                         date: "Outubro 15, 2017",
                         description: "Estou estudando ionic e criando um app massa...",
                         qtd_likes: 12,
                         qtd_coments: 4,
                         time_coments: '11h ago'
                      }
  public refresher;
  public isrefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;
  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          private movieProvider:MoovieProvider,
          public loadingCtrl: LoadingController
        ) {
  }

  public somaDoisNumeros(num1:number,num2:number): void{
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isrefreshing = true;

    this.carregaFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregaFilmes(true);
  }

  ionViewDidEnter() {
    this.carregaFilmes();
  }
public carregaFilmes(newpage: boolean = false){
  this.presentLoading();
  this.movieProvider.getLatesMoovies(this.page).subscribe(
    data=>{
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      if(newpage){
        this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
        this.infiniteScroll.complete();
      }else{
        this.lista_filmes = objeto_retorno.results;
      }
     
      this.closeLoading();
      if(this.isrefreshing){
        this.refresher.complete();
        this.isrefreshing = false;
      }
    },error=>{
      console.log(error);
      this.closeLoading();
      if(this.isrefreshing){
        this.refresher.complete();
        this.isrefreshing = false;
      }
    }
  )
}
  presentLoading() {
   this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  abrirDetelhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }
}

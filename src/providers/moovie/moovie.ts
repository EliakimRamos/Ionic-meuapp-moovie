import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3"
  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  public getLatesMoovies(page = 1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=7f6dcfdfbcf423cbeb9d748f39328c69`);
  }
  public getMooviesDetails(filmeId){
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=7f6dcfdfbcf423cbeb9d748f39328c69`);
  }
}

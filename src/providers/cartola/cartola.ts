import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular/platform/platform';

/*
  Generated class for the CartolaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartolaProvider {
  basepath = "/cartolaapi";
  constructor(
            public http: Http,
            private _plataform: Platform
          ) {
            
            if(this._plataform.is("cordova")){
              this.basepath = "https://api.cartolafc.globo.com";
            }
  }

  atletas(){
    return this.http.get(this.basepath+"/atletas/mercado");
  }

}

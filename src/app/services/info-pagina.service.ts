import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) {
    // console.log('Servicio de infoPagina listo')
    this.cargar_info();

    this.cargar_equipo();
  }

  private cargar_info() {
    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json').subscribe( (resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;

      // console.log(resp['twitter']);
      // console.log(resp);
    });

   }

   private cargar_equipo() {

    this.http.get('https://angular-webapp-b95ee.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {

      this.equipo = resp;
      console.log(resp);
    });

   }
}

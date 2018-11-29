import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ItemsCocheLogico } from '../class/itemsCocheLogico';
import { ItemsCodigoCuadrado } from '../class/itemsCodigoCuadrado';
import { ItemsParadas } from '../class/itemsParadas';
import { ReporteUno } from '../class/reporteUno';
import { ReporteDos } from '../class/reporteDos';

@Injectable({
  providedIn: 'root'
})
export class InformeServiceService {

  constructor(private http:HttpClient) {
     console.log('Reporte service esta listo'); 
  }

  getQuery(query: string){
    const url = `http://localhost:8080/goalsystem/v1/${query}`;
    return this.http.get(url);
  }

  getCodigoCuadrados():Observable<ItemsCodigoCuadrado[]> {
    return this.getQuery(`codigoCuadrados`)
               .pipe(map(codigoCuadrados => codigoCuadrados as ItemsCodigoCuadrado[] ));
  }

  getCocheLogico():Observable<ItemsCocheLogico[]>{
    return this.getQuery(`cocheLogico`)
               .pipe(map(cocheLogico => cocheLogico as ItemsCocheLogico[]));
  }

  getParadas():Observable<ItemsParadas[]>{
    return this.getQuery(`paradas`)
                .pipe(map(paradas => paradas as ItemsParadas[] ));
  }

  getInformeUnoByCodigoCuadrado(idCodigoCuadrado:number):Observable<ReporteUno[]>{
    return this.getQuery(`/informeUno/${idCodigoCuadrado}`)
                .pipe(map(informeUno => informeUno as ReporteUno[]));
  }

  getInformeUnoByCodigoCuadradoAndCocheLogico(idCodicoCuadrado:number, idCocheLogico:number):Observable<ReporteUno[]>{
      return this.getQuery(`/informeUno/${idCodicoCuadrado}?idCoche=${idCocheLogico}`)
                  .pipe(map(informeUno => informeUno as ReporteUno[]));
  }
  
  getInformeDos(idCodigoCuadrado:number,idParadas:string):Observable<ReporteDos[]>{
    return this.getQuery(`/informeDos/${idCodigoCuadrado}/${idParadas}`)
                .pipe(map( informeDos => informeDos as ReporteDos[]));
  }

}

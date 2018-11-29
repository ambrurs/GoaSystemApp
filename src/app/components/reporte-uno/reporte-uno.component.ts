import { Component, OnInit } from '@angular/core';
import { InformeServiceService } from '../../services/informe-service.service';
import { ItemsCodigoCuadrado } from '../../class/itemsCodigoCuadrado';
import { ItemsCocheLogico } from 'src/app/class/itemsCocheLogico';
import { ReporteUno } from 'src/app/class/reporteUno';
import swal from 'sweetalert2';


@Component({
  selector: 'app-reporte-uno',
  templateUrl: './reporte-uno.component.html',
  styleUrls: ['./reporte-uno.component.css']
})
export class ReporteUnoComponent implements OnInit {

  codigoCuadrado:ItemsCodigoCuadrado[] = [];
  cochesLogicos:ItemsCocheLogico[] = [];
  informeUno:ReporteUno[] = [];
  idCodigoCuadrado:number = 0;
  idCocheLogico:number = 0;
  isCocheLogico:boolean = false;

  constructor(private informeService:InformeServiceService) {

    this.informeService.getCodigoCuadrados().subscribe(
      codigoCuadrados => {
       this.codigoCuadrado = codigoCuadrados;
       console.log(this.codigoCuadrado);

       if(this.codigoCuadrado === undefined || this.codigoCuadrado.length === 0 ){
        swal({
          type: 'error',
          title: 'Códigos Cuadrados vacios...',
          text: 'No se encontraron códigos cuadrados'
        })
      }

      }
    );

    this.informeService.getCocheLogico().subscribe(
      cocheLogico => {
        this.cochesLogicos = cocheLogico;
        console.log(this.cochesLogicos);

        if(this.cochesLogicos === undefined || this.cochesLogicos.length === 0 ){
          swal({
            type: 'error',
            title: 'Coches lógicos vacios...',
            text: 'No se encontraron coches lógicos'
          })
        }

      }
    );

   }

  ngOnInit() {
  }

  findInformeUno(){

    if(this.isCocheLogico){
      this.informeService.getInformeUnoByCodigoCuadradoAndCocheLogico(this.idCodigoCuadrado,this.idCocheLogico)
          .subscribe(
            informeUno => {
              this.informeUno = informeUno;

              if(this.informeUno === undefined || this.informeUno.length === 0 ){
                swal({
                  type: 'error',
                  title: 'Infome vació...',
                  text: 'No se encontraron resultados para generar el informe'
                })
              }
            }
          );
    }else{
      this.informeService.getInformeUnoByCodigoCuadrado(this.idCodigoCuadrado)
                         .subscribe(
                           informeUno => {
                             this.informeUno = informeUno;
                            
                             if(this.informeUno === undefined || this.informeUno.length === 0 ){
                              swal({
                                type: 'error',
                                title: 'Infome vació...',
                                text: 'No se encontraron resultados para generar el informe'
                              })
                            }
                            }
                         );
    }

   

  }

}

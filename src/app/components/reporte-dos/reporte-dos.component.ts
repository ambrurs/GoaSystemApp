import { Component, OnInit } from '@angular/core';
import { InformeServiceService } from '../../services/informe-service.service';
import { ItemsCodigoCuadrado } from '../../class/itemsCodigoCuadrado';
import { ItemsParadas } from '../../class/itemsParadas';
import { ReporteDos } from '../../class/reporteDos';
import swal from 'sweetalert2';
@Component({
  selector: 'app-reporte-dos',
  templateUrl: './reporte-dos.component.html',
  styleUrls: ['./reporte-dos.component.css']
})
export class ReporteDosComponent implements OnInit {

  codigoCuadrado:ItemsCodigoCuadrado[] = [];
  paradas:ItemsParadas[] = [];
  informeDos:ReporteDos[] = [];
  idCodigoCuadrado:number;
  idsParadas:any[] = [];

  constructor(private informeService:InformeServiceService) {

      this.informeService.getCodigoCuadrados()
           .subscribe(codigoCuadrado => { 
             this.codigoCuadrado = codigoCuadrado
            
             if(this.codigoCuadrado === undefined || this.codigoCuadrado.length === 0 ){
              swal({
                type: 'error',
                title: 'Código cuadrado ...',
                text: 'No se encontraron códigos cuadrados'
              })
            }

            });

      this.informeService.getParadas()
        .subscribe(paradas => {
          this.paradas = paradas;
         
          if(this.paradas === undefined || this.paradas.length === 0 ){
            swal({
              type: 'error',
              title: 'Paradas vacias ...',
              text: 'No se encontraron paradas'
            })
          }

        });


   }

  ngOnInit() {
  }

  generarInforme(){
    this.informeService.getInformeDos(this.idCodigoCuadrado,this.obtenerIdParadas())
                        .subscribe( informeDos => {
                          this.informeDos = informeDos;
                          console.log(this.informeDos);

                          if(this.informeDos === undefined || this.informeDos.length === 0 ){
                            swal({
                              type: 'error',
                              title: 'Informe vació ...',
                              text: 'No se encontraron resultados para generar el informe'
                            })
                          }                           

                        } );

  }

  obtenerIdParadas():string{
    let paradasInforme = "";
    console.log(this.idsParadas);

    for (let index = 0; index < this.idsParadas.length; index++) {
      const element = this.idsParadas[index];
      if(paradasInforme === ""){
        paradasInforme = element + ",";        
      }else{
         if(this.idsParadas.length = index ){
          paradasInforme = paradasInforme+ element;
         } else{
           paradasInforme = paradasInforme+ element + ",";
         }
      
      }
      
    }
  
    return paradasInforme.slice(0,paradasInforme.length-1);
  }

}

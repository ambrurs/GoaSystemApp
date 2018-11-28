import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReporteUnoComponent } from './components/reporte-uno/reporte-uno.component';
import { ReporteDosComponent } from './components/reporte-dos/reporte-dos.component';


const ROUTES: Routes = [
   {path: 'home', component: HomeComponent},
   {path: 'reporteuno',component: ReporteUnoComponent},
   {path: 'reportedos',component: ReporteDosComponent},
   { path: '',redirectTo: 'home',pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES,{useHash:true})],
    exports: [RouterModule],
    providers: []
  })
  export class AppRoutingModule {
  }
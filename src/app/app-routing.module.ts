import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ModificarComponent } from './modificar/modificar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';

const routes: Routes = [
  {path: 'agregar', component: AgregarComponent},
  {path: 'modificar/:sku', component: ModificarComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'visualizar', component: VisualizarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

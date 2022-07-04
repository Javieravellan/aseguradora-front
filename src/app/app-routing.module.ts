import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './components/crud-clientes/lista-clientes/lista-clientes.component';
import { ListaSegurosComponent } from './components/crud-seguros/lista-seguros/lista-seguros.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'seguros', component: ListaSegurosComponent},
  {path: 'clientes', component: ListaClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

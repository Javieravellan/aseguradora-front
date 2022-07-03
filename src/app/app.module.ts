import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ListaSegurosComponent } from './components/crud-seguros/lista-seguros/lista-seguros.component';
import { AgregarNuevoComponent } from './components/crud-seguros/agregar-nuevo/agregar-nuevo.component';
import { AgregarNuevoClienteComponent } from './components/crud-clientes/agregar-nuevo/agregar-nuevo-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaClientesComponent } from './components/crud-clientes/lista-clientes/lista-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ListaSegurosComponent,
    AgregarNuevoComponent,
    AgregarNuevoClienteComponent,
    ListaClientesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

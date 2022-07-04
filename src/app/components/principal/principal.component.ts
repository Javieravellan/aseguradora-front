import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Seguro } from 'src/app/models/Seguro';
import { ClientesService } from 'src/app/services/clientes.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  cuadroBusqueda:string='';
  busquedaPorCodigoSeguro:string='';
  segurosDeClienteActual?:Seguro[];
  clientesPorSeguro?: Cliente[];

  constructor(private serviceCliente: ClientesService,
    private serviceSeguro: SegurosService) { }

  ngOnInit(): void {
  }

  buscar() {
    console.log(this.cuadroBusqueda);
    this.serviceCliente.buscarSegurosPorCedulaCliente(this.cuadroBusqueda)
    .subscribe({
      next: (data:any) => {
        this.segurosDeClienteActual = data;
        this.cuadroBusqueda=""
      },
      error: err => alert(err.statusText)
    })
  }

  buscarClientesPorCodigoSeguro() {
    console.log(this.busquedaPorCodigoSeguro);
    this.serviceSeguro.buscarSegurosPorCodigoSeguro(this.busquedaPorCodigoSeguro)
    .subscribe({
      next: (data:any) => {
        this.clientesPorSeguro = data as Cliente[];
        this.busquedaPorCodigoSeguro = ''
      },
      error: err => alert(err.statusText)
    })
  }

}

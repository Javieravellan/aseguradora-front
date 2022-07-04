import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { Seguro } from 'src/app/models/Seguro';
import { ClientesService } from 'src/app/services/clientes.service';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-agregar-seguro',
  templateUrl: './agregar-seguro.component.html',
  styleUrls: ['./agregar-seguro.component.css']
})
export class AgregarSeguroComponent implements OnInit, OnDestroy {
  @ViewChild("cerrar")
  cerrarForm:any;

  segurosDisponibles?:Seguro[];
  clienteActual?: Cliente;
  nombreCliente?:string="";
  subscriptorAbrirAsignacion?: Subscription
  
  constructor(
    private serviceSeguro: SegurosService, 
    private rxjs: MyRxJSService,
    private servicioCliente: ClientesService) {
    this.obtenerSeguros(); 
    this.subscriptorAbrirAsignacion = this.rxjs.getSubject<Cliente>("agregarSeguro").subscribe(
      (cliente: Cliente) => {
        this.nombreCliente = cliente.nombreCliente||"";
        this.clienteActual = cliente;
      }
    )
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptorAbrirAsignacion?.unsubscribe();
  }

  obtenerSeguros() {
    this.serviceSeguro.obtenerTodosLosSeguros()
      .subscribe({
        next: (value) => {
          this.segurosDisponibles = value
        },
        error: err => console.log
      })
  }

  asignarSeguro(e: any) {
    this.servicioCliente.asignarSeguro(e.target.value, this.clienteActual!.cedulaCliente!)
    .subscribe({
      next: data => {
        this.cerrarForm.nativeElement.click();
      },
      error: err => alert("Error al asignar el seguro.")
    })
    console.log(this.clienteActual);
  }

}

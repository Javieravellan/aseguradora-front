import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit, OnDestroy {

  @ViewChild("btnNuevo")
  btnAbrirModal: any;

  susbcriptorNuevo?: Subscription;
  susbcriptorActualizar?: Subscription;

  listaClientes?: Cliente[];

  constructor(
    private rxjs: MyRxJSService,
    private service: ClientesService
  ) {
    this.susbcriptorNuevo = this.rxjs.getSubject<Cliente>("nuevoCliente").subscribe(
      (cliente: Cliente) => {
        let index = this.listaClientes?.findIndex(s => s.cedulaCliente = cliente.cedulaCliente);
        if (index != -1) this.listaClientes![index!] = cliente;
        else this.listaClientes?.push(cliente)
      }
    )
  }

  ngOnInit(): void {
    this.obtenerTodosLosClientes();
  }

  ngOnDestroy(): void {
    this.susbcriptorNuevo?.unsubscribe();
  }

  abrirForm() {
    this.rxjs.emitEvent("abrirForm", "Crear");
  }

  obtenerTodosLosClientes() {
    this.service.obtenerTodosLosClientes()
      .subscribe({
        next: (data) => {
          this.listaClientes = data
        },
        error: err => console.log(err)
      })
  }

  abrirFormularioParaActualizar(cliente: Cliente) {
    this.btnAbrirModal.nativeElement.click();
    this.rxjs.emitEvent("actualizarCliente", cliente);
  }

  eliminarCliente(cedula: string) {
    if (cedula != "" && window.confirm('¿Estás seguro de realizar esta acción?')) {
      this.service.eliminarCliente(cedula)
      .subscribe({
        next: data => {
          if (data) {
            let index = this.listaClientes?.findIndex(s => s.cedulaCliente == cedula)
            this.listaClientes?.splice(index!, 1);
          }
        }
      })
    }
  }

}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { Seguro } from 'src/app/models/Seguro';
import { ClientesService } from 'src/app/services/clientes.service';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit, OnDestroy {

  @ViewChild("btnNuevo")
  btnAbrirModal: any;
  @ViewChild("seguro")
  formSeguro:any;
  segurosDisponibles:Seguro[] = []; 
  dataInputFile: any; 

  susbcriptorNuevo?: Subscription;
  susbcriptorActualizar?: Subscription;

  listaClientes?: Cliente[];

  clienteActual?:Cliente;

  constructor(
    private rxjs: MyRxJSService,
    private service: ClientesService,
  ) {
    this.obtenerTodosLosClientes();
    this.susbcriptorNuevo = this.rxjs.getSubject<Cliente>("nuevoCliente").subscribe(
      (cliente: Cliente) => {
        let index = this.listaClientes?.findIndex(s => s.cedulaCliente == cliente.cedulaCliente);
        if (index != -1) this.listaClientes![index!] = cliente;
        else this.listaClientes?.push(cliente)
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.susbcriptorNuevo?.unsubscribe();
  }

  abrirForm() {
    this.rxjs.emitEvent("abrirForm", "Crear");
  }

  cargarDatosDesdeArchivo(event: any) {
    if (!event.target.files[0]) return;
    let file = event.target.files[0] as File
    this.service.crearClientesDesdeArchivo(file)
    .subscribe({
      next: data => {
        if (data.length == 0) return;
        this.listaClientes = this.listaClientes?.concat(data); // add array elements returned
        this.dataInputFile = "";
      },
      error: err => console.log
    })
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

  abrirFormularioParaActualizar(e:Event, cliente: Cliente) {
    e.stopPropagation();
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
            if(index == -1) return
            this.listaClientes?.splice(index!, 1);
          }
        },
        error: err => console.log
      })
    }
  }

  asignarSeguroACliente(cliente:Cliente) {
    this.formSeguro.nativeElement.click();
    this.rxjs.emitEvent<Cliente>("agregarSeguro", cliente);
  }
}

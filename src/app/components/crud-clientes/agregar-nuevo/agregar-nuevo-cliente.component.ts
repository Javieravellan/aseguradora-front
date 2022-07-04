import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cliente, ClientesSeguros } from 'src/app/models/Cliente';
import { Seguro } from 'src/app/models/Seguro';
import { ClientesService } from 'src/app/services/clientes.service';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-agregar-nuevo-cliente',
  templateUrl: './agregar-nuevo-cliente.component.html',
  styleUrls: ['./agregar-nuevo-cliente.component.css']
})
export class AgregarNuevoClienteComponent implements OnInit, OnDestroy {

  myFormCliente?: FormGroup;
  clienteActual?: Cliente;
  esActualizar: boolean = false

  susbcriptorActualizar?: Subscription;
  susbcriptorAbrirForm?: Subscription;

  textButton: string = "Crear"

  // variable de plantilla
  @ViewChild('closeForm', { static: true }) closeForm!: ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private service: ClientesService,
    private rxjs: MyRxJSService, // rxjs
  ) {
    this.crearForm();
    // susbcribir al evento actualizar cliente
    this.susbcriptorActualizar = this.rxjs.getSubject<Cliente>("actualizarCliente")
      .subscribe((event) => this.mostrarSeguroEnFormulario(event, this.myFormCliente!));

    this.susbcriptorAbrirForm = this.rxjs.getSubject<string>("abrirForm")
      .subscribe((event) => {
        this.textButton = event
        this.esActualizar = false
        this.myFormCliente?.get("cedulaCliente")?.enable();
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.susbcriptorActualizar?.unsubscribe();
    this.susbcriptorAbrirForm?.unsubscribe();
  }

  // add new secure
  enviarFormulario() {
    if (this.textButton == "Crear") this.crearNuevoCliente(); //console.log("crearemos nuevo seguro")
    else if (this.textButton == "Actualizar") this.actualizarCliente(); //console.log("Actualizaremos un seguro");
  }

  private crearNuevoCliente() {
    if (this.myFormCliente!.valid) {
      let nuevoCliente = this.myFormCliente!.value as Cliente;
      nuevoCliente.clientesSeguros = [];
      nuevoCliente.telefono = nuevoCliente.telefono?.toString();
      
      this.service.crearCliente(nuevoCliente)
        .subscribe({
          next: data => {
            this.clienteActual = data

            // emito cambios
            this.rxjs.emitEvent("nuevoCliente", this.clienteActual);
            this.myFormCliente!.reset()
            this.closeForm.nativeElement.click();
          },
          error: err => console.log
        })
    } else {
      console.log("Debe completar todos los campos del formulario.")
    }
  }

  private actualizarCliente() {
    if (this.myFormCliente!.valid) {
      this.myFormCliente?.get("cedulaCliente")?.enable();
      let nuevoCliente = this.myFormCliente!.value as Cliente;
      // ahorita es el cliente actual y tiene todo lo que tiene
      nuevoCliente.telefono = nuevoCliente.telefono?.toString();
      
      this.clienteActual!.cedulaCliente = nuevoCliente.cedulaCliente
      this.clienteActual!.nombreCliente = nuevoCliente.nombreCliente
      this.clienteActual!.telefono = nuevoCliente.telefono
      this.clienteActual!.edad = nuevoCliente.edad
      this.clienteActual!.clientesSeguros = (!this.clienteActual?.clientesSeguros) ? [] : 
        this.clienteActual?.clientesSeguros;

      console.log(this.clienteActual);
      this.myFormCliente?.get("cedulaCliente")?.enable();

      this.service.actualizarCliente(this.clienteActual!)
        .subscribe({
          next: (data: Cliente) => {
            this.clienteActual = data
            // emito cambios
            this.rxjs.emitEvent("nuevoCliente", this.clienteActual);
            this.myFormCliente!.reset()
            this.closeForm.nativeElement.click();
          },
          error: (err) => console.log(err)
        })
    }
  }

  private crearForm(): void {
    this.myFormCliente = this.formBuilder.group({
      cedulaCliente: new FormControl('', Validators.required),
      nombreCliente: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
    })
  }

  private mostrarSeguroEnFormulario(cliente: Cliente, form: FormGroup) {
    this.textButton = "Actualizar"
    this.esActualizar = true
    if (cliente) {
      this.clienteActual = cliente; // solo en actualizar
      console.log(this.clienteActual);
      form.get("cedulaCliente")?.disable();
      form.setValue({
        cedulaCliente: cliente.cedulaCliente,
        nombreCliente: cliente.nombreCliente,
        telefono: cliente.telefono?.toString(),
        edad: cliente.edad,
      });
    }
  }
}

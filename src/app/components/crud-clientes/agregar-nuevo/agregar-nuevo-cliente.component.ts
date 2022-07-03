import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';

@Component({
  selector: 'app-agregar-nuevo-cliente',
  templateUrl: './agregar-nuevo-cliente.component.html',
  styleUrls: ['./agregar-nuevo-cliente.component.css']
})
export class AgregarNuevoClienteComponent implements OnInit, OnDestroy {

  myFormCliente?: FormGroup;
  clienteActual?: Cliente;

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
        this.myFormCliente?.get("cedulaCliente")?.enable();
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.susbcriptorActualizar?.unsubscribe();
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
      nuevoCliente.clientesSeguros = [];
      this.myFormCliente?.get("cedulaCliente")?.enable();

      this.service.actualizarCliente(nuevoCliente)
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

    if (cliente) {
      this.clienteActual = cliente;
      form.get("cedulaCliente")?.disable();
      form.setValue({
        cedulaCliente: cliente.cedulaCliente,
        nombreCliente: cliente.nombreCliente,
        telefono: cliente.telefono,
        edad: cliente.edad,
      });
    }
  }
}

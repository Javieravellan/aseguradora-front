import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Seguro } from 'src/app/models/Seguro';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-agregar-nuevo',
  templateUrl: './agregar-nuevo.component.html',
  styleUrls: ['./agregar-nuevo.component.css']
})
export class AgregarNuevoComponent implements OnInit, OnDestroy {

  myForm?: FormGroup;
  seguroActual?: Seguro;

  susbcriptorActualizar?: Subscription;
  susbcriptorAbrirForm?: Subscription;

  @Input()
  textButton: string = "Crear"

  // variable de plantilla
  @ViewChild('closeForm', {static: true}) closeForm!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private service: SegurosService,
    private rxjs: MyRxJSService, // rxjs
  ) {
    this.crearForm();
    // susbcribir al evento actualizar seguro
    this.susbcriptorActualizar = this.rxjs.getSubject<Seguro>("actualizarSeguro")
      .subscribe((event) => this.mostrarSeguroEnFormulario(event, this.myForm!));
    
    this.susbcriptorAbrirForm = this.rxjs.getSubject<string>("abrirForm")
    .subscribe((event) => {
      this.textButton = event
      this.myForm?.get("codigoSeguro")?.enable();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.susbcriptorActualizar?.unsubscribe();
  }

  // add new secure
  enviarFormulario() {
    if (this.textButton == "Crear") this.crearNuevoSeguro(); //console.log("crearemos nuevo seguro")
    else if (this.textButton == "Actualizar") this.actualizarSeguro(); //console.log("Actualizaremos un seguro");
  }

  private crearNuevoSeguro() {
    if (this.myForm!.valid) {
      let nuevoSeguro = this.myForm!.value as Seguro;
      nuevoSeguro.clientesSeguros = [];

      this.service.crearSeguro(nuevoSeguro)
        .subscribe({
          next: data => {
            this.seguroActual = data

            // emito cambios
            this.rxjs.emitEvent("nuevoSeguro", this.seguroActual);
            this.myForm!.reset()
            this.closeForm.nativeElement.click();
          },
          error: err => console.log
        })
    } else {
      console.log("Debe completar todos los campos del formulario.")
    }
  }

  private actualizarSeguro() {
    if (this.myForm!.valid) {
      this.myForm?.get("codigoSeguro")?.enable();
      let nuevoSeguro = this.myForm!.value as Seguro;
      nuevoSeguro.clientesSeguros = [];
      this.myForm?.get("codigoSeguro")?.enable();

      this.service.actualizarSeguro(nuevoSeguro)
      .subscribe({
        next: (data: Seguro) => {
          this.seguroActual = data
          // emito cambios
          this.rxjs.emitEvent("nuevoSeguro", this.seguroActual);
          this.myForm!.reset()
          this.closeForm.nativeElement.click();
        },
        error: (err) => console.log(err)
      })
    }
  }

  private crearForm(): void {
    this.myForm = this.formBuilder.group({
      codigoSeguro: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      sumaAsegurada: new FormControl('', Validators.required),
      primaSeguro: new FormControl('', Validators.required),
    })
  }

  private mostrarSeguroEnFormulario(seguro: Seguro, form: FormGroup) {
    this.textButton = "Actualizar"

    if (seguro) {
      this.seguroActual = seguro;
      form.get("codigoSeguro")?.disable();
      form.setValue({
        codigoSeguro: seguro.codigoSeguro,
        nombre: seguro.nombre,
        sumaAsegurada: seguro.sumaAsegurada,
        primaSeguro: seguro.primaSeguro,
      });
    }
  }
}

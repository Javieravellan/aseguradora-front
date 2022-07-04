import { compilePipeFromMetadata } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Seguro } from 'src/app/models/Seguro';
import { MyRxJSService } from 'src/app/services/my-rx-js.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-lista-seguros',
  templateUrl: './lista-seguros.component.html',
  styleUrls: ['./lista-seguros.component.css']
})
export class ListaSegurosComponent implements OnInit, OnDestroy {
  @ViewChild("btnNuevo")
  btnAbrirModal: any;
  segurosDisponibles?: Seguro[];

  susbcriptorNuevo?: Subscription;
  susbcriptorActualizar?: Subscription;

  constructor(
    private service: SegurosService,
    private rxjs: MyRxJSService,
  ) {  
    this.obtenerTodosLosSeguros();
    this.susbcriptorNuevo = this.rxjs.getSubject<Seguro>("nuevoSeguro").subscribe(
      (seguro: Seguro) => {
        let index = this.segurosDisponibles?.findIndex(s => s.codigoSeguro == seguro.codigoSeguro);
        console.log(index);
        if (index != -1) this.segurosDisponibles![index!] = seguro;
        else this.segurosDisponibles?.push(seguro)
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

  obtenerTodosLosSeguros() {
    this.service.obtenerTodosLosSeguros()
    .subscribe({
      next: (data) => {
        this.segurosDisponibles = data
      },
      error: err => console.log(err)
    })
  }

  abrirFormularioParaActualizar(seguro: Seguro) {
    this.btnAbrirModal.nativeElement.click();
    this.rxjs.emitEvent("actualizarSeguro", seguro);
  }

  eliminarSeguro(codigoSeguro: string) {
    if (codigoSeguro != "" && window.confirm('¿Estás seguro de realizar esta acción?')) {
      this.service.eliminarSeguro(codigoSeguro)
      .subscribe({
        next: data => {
          if (data) {
            let index = this.segurosDisponibles?.findIndex(s => s.codigoSeguro == codigoSeguro)
            this.segurosDisponibles?.splice(index!, 1);
          }
        }
      })
    }
  }

}

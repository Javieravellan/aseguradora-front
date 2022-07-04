import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  UrlApi = "https://localhost:7166/api/Aseguradora/clientes"

  constructor(private http: HttpClient) { }

  obtenerTodosLosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.UrlApi}`);
  }

  obtenerClientePorCedula(cedula: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.UrlApi}/${cedula}`);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.UrlApi}`, cliente, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  crearClientesDesdeArchivo(file: File): Observable<Cliente[]> {
    let form = new FormData()
    form.append("file", file);
    return this.http.post<Cliente[]>(`${this.UrlApi}/upload-file`, form)
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.UrlApi}`, cliente);
  }

  eliminarCliente(cedula: string) {
    return this.http.delete(`${this.UrlApi}/${cedula}`);
  }

  asignarSeguro(codigoSeguro:string, cedula:string) {
    let params = new HttpParams()
    params.set("codigoSeguro", codigoSeguro)
    params.set("cedula", cedula)
    return this.http.get(`${this.UrlApi}/asignar?codigoSeguro=${codigoSeguro}&cedula=${cedula}`);
  }

  buscarSegurosPorCedulaCliente(cedula:string) {
    return this.http.get(`${this.UrlApi}/buscar/${cedula}`);
  }
  
}

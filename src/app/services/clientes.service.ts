import { HttpClient } from '@angular/common/http';
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

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.UrlApi}`, cliente);
  }

  eliminarCliente(cedula: string) {
    return this.http.delete(`${this.UrlApi}/${cedula}`);
  }
}

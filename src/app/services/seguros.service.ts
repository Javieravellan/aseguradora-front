import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from '../models/Seguro';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {
  
  UrlApi = "https://localhost:7166/api/Aseguradora/seguros"
  
  constructor(private http: HttpClient) { }

  obtenerTodosLosSeguros(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${this.UrlApi}`);
  }

  obtenerSeguroPorCodigo(codigo: string): Observable<Seguro> {
    return this.http.get<Seguro>(`${this.UrlApi}/${codigo}`);
  }

  crearSeguro(seguro: Seguro): Observable<Seguro> {
    return this.http.post<Seguro>(`${this.UrlApi}`, seguro, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  actualizarSeguro(seguro: Seguro): Observable<Seguro> {
    return this.http.put<Seguro>(`${this.UrlApi}`, seguro);
  }

  eliminarSeguro(codigo: string) {
    return this.http.delete(`${this.UrlApi}/${codigo}`);
  }
}

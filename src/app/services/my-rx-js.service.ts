import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyRxJSService/*<T>*/ {

  //private subject = new BehaviorSubject<T|null>(null);
  // multiples eventos en un mismo servicio
  private subjects: Map<string, BehaviorSubject<any>> = new Map();
  
  /*get Subject(): Observable<any> {
    return this.subject.asObservable();
  }*/

  getSubject<K>(key:string): Observable<K> {
    this._validateSubject(key);
    return this.subjects.get(key)!.asObservable();
  }

  constructor() { }

  emitEvent<K>(key: string, event: K) {
    this._validateSubject(key);
    this.subjects.get(key)!.next(event);
  }

  /*emitEvent(event: T) {
    this.subject.next(event);
  }*/

  private _validateSubject(key: string) {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject(null));
    }
  }
}

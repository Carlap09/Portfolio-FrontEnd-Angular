import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url:string="http://localhost:8080";
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>
  {
    return this.http.get<any>(this.url+"/api/persona")
  }
  public addPersona(persona: Persona):Observable<Persona>{
    return this.http.post<Persona>(`${this.url}/api/persona`,persona);
  }
  public updatePersona(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.url}/api/persona`,persona);
  }
}
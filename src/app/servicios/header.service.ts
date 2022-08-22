import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServerUrl="https://apcarlapacheco.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public getPersona():Observable<Persona>{
    return this.http.get<Persona>(`${this.apiServerUrl}/api/persona`);
  }
  public addPersona(persona: Persona):Observable<Persona>{
    return this.http.post<Persona>(`${this.apiServerUrl}/api/persona`,persona);
  }
  public updatePersona(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.apiServerUrl}/api/persona`,persona);
  }
  
}

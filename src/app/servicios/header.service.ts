import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPer():Observable<Persona>{
    return this.http.get<Persona>(`${this.apiServerUrl}/persona/id/1`);

  }
  public addPersona(persona: Persona):Observable<Persona>{
    return this.http.post<Persona>(`${this.apiServerUrl}/persona/add`,persona);
  }
  public updatePersona(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.apiServerUrl}/persona/update`,persona);
  }
  public deletePersona(PersonaId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/persona/delete/${PersonaId}`);
  }

}

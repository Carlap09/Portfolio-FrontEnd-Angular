import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private apiServerUrl="https://apcarlapacheco.herokuapp.com/";
  constructor(private http:HttpClient) { }

  public getProyectos():Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/api/proyectos`);
  }
  public addProyectos(proyectos: Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(`${this.apiServerUrl}/api/proyectos/add`,proyectos);
  }
  public updateProyectos(proyectos: Proyectos):Observable<Proyectos>{
    return this.http.put<Proyectos>(`${this.apiServerUrl}/api/proyectos/update`,proyectos);
  }
  public deleteProyectos(proyectosId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/proyectos/delete/${proyectosId}`);
  }
}

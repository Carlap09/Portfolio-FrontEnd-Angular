import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUser():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiServerUrl}/usuario/id/1`);

  }
  public addUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.apiServerUrl}/usuario/add`,usuario);
  }
  public updateUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiServerUrl}/usuario/update`,usuario);
  }
  public deleteUsuario(UsuarioId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/usuario/delete/${UsuarioId}`);
  }

}

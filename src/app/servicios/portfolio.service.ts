import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';



@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  
  constructor(private http:HttpClient) { }
    Url = 'http://localhosth:8080/personas/traer';
  
    obtenerDatos():Observable<any>{
    return this.http.get<persona[]>(this.Url);

  }
  
}

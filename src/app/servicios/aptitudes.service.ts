import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aptitudes } from '../model/aptitudes';

@Injectable({
  providedIn: 'root'
})
export class AptitudesService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getAptitudes():Observable<Aptitudes[]>{
    return this.http.get<Aptitudes[]>(`${this.apiServerUrl}/aptitudes/all`);
  }
  public addAptitudes(aptitudes: Aptitudes):Observable<Aptitudes>{
    return this.http.post<Aptitudes>(`${this.apiServerUrl}/aptitudes/add`,aptitudes);
  }
  public updateAptitudes(aptitudes: Aptitudes):Observable<Aptitudes>{
    return this.http.put<Aptitudes>(`${this.apiServerUrl}/aptitudes/update`, aptitudes);
  }
  public deleteAptitudes(aptitudesId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/aptitudes/delete/${aptitudesId}`);
  }
}

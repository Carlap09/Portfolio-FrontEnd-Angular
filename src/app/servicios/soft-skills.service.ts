import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoftSkills } from '../model/softSkills';

@Injectable({
  providedIn: 'root'
})
export class SoftSkillsService {
  private apiServerUrl="https://apcarlapacheco.herokuapp.com/";

  constructor(private http:HttpClient) { }
  public getSoftSkills():Observable<SoftSkills[]>{
    return this.http.get<SoftSkills[]>(`${this.apiServerUrl}/api/softSkills`);
  }
  public addSoftSkills(softSkills: SoftSkills):Observable<SoftSkills>{
    return this.http.post<SoftSkills>(`${this.apiServerUrl}/api/softSkills/add`,softSkills);
  }
  public updateSoftSkills(softSkills: SoftSkills):Observable<SoftSkills>{
    return this.http.put<SoftSkills>(`${this.apiServerUrl}/api/softSkills/update`, softSkills);
  }
  public deleteSoftSkills (softSkillsId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/softSkills/delete/${softSkillsId}`);
  }
}



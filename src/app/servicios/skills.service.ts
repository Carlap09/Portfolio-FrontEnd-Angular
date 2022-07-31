import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../model/skills'

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiServerUrl="http://localhost:8080";

  constructor(private http:HttpClient) { }

  public getSkills():Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.apiServerUrl}/api/skills`);
  }
  public addSkills(skills: Skills):Observable<Skills>{
    return this.http.post<Skills>(`${this.apiServerUrl}/api/skills/add`,skills);
  }
  public updateSkills(skills: Skills):Observable<Skills>{
    return this.http.put<Skills>(`${this.apiServerUrl}/api/skills/update`, skills);
  }
  public deleteSkills (skillsId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/skills/delete/${skillsId}`);
  }
}

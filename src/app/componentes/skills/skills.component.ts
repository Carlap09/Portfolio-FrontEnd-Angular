import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/servicios/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {

  public skills:Skills[] = [];
  public editSkills: Skills | undefined;
  public deleteSkills:Skills | undefined;
  
  constructor(private skillsService:SkillsService) { }
  ngOnInit(): void {
    this.getSkills();

  }
  public getSkills():void{
    this.skillsService.getSkills().subscribe({
      next:(Response: Skills[]) =>{
        this.skills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, skills?: Skills ):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addSkillsModal');
    }else if (mode==='edit'){
      this.editSkills=skills;
      button.setAttribute('data-target','#editSkillsModal');
    }else if (mode==='delete'){
      this.deleteSkills=skills;
      button.setAttribute('data-target','#deleteSkillsModal');
    }

    container?.appendChild(button);
    button.click();
  }
  public onAddSkills(addForm: NgForm){
    document.getElementById('add-skills-form')?.click();
    this.skillsService.addSkills(addForm.value).subscribe({
      next:(response:Skills)=>{
        console.log(response);
        this.getSkills();
        addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
    public onUpdateSkills (skills: Skills){
      this.editSkills=skills;
        document.getElementById('add-skills-form')?.click();
      this.skillsService.updateSkills(skills).subscribe({
        next:(response:Skills)=>{
        console.log(response);
          this.getSkills();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
        })
      }
    
    public onDeleteSkills(idSki: number):void{
      this.skillsService.deleteSkills(idSki).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getSkills();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
  }

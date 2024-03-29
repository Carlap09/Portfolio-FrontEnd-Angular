import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/servicios/education.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {

  public educations:Education[] = [];
  public editEducation: Education | undefined;
  public deleteEducation:Education | undefined;
  
  constructor(private educacionService:EducationService) { }
  ngOnInit(): void {
    this.getEducations();
  }
  public getEducations():void{
    this.educacionService.getEducation().subscribe({
      next:(Response: Education[]) =>{
        this.educations=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, educacion?: Education):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addEducationModal');
    }else if (mode ==='edit'){
      this.editEducation=educacion;
      button.setAttribute('data-target', '#editEducationModal');
    }else if (mode ==='delete'){
      this.deleteEducation=educacion;
      button.setAttribute('data-target', '#deleteEducationModal');
    }

    container?.appendChild(button);
    button.click();
  }
  public onAddEducation(addForm: NgForm){
    document.getElementById('add-education-form')?.click();
    this.educacionService.addEducation(addForm.value).subscribe({
      next:(response:Education)=>{
        console.log(response);
        this.getEducations();
        addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
    public onUpdateEducation (educacion: Education){
      this.editEducation=educacion;
        document.getElementById('add-education-form')?.click();
      this.educacionService.updateEducation(educacion).subscribe({
        next:(response:Education)=>{
        console.log(response);
          this.getEducations();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
        })
      }
    
    public onDeleteEducation(idEdu: number):void{
      this.educacionService.deleteEducation(idEdu).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getEducations();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      });
    };
  }
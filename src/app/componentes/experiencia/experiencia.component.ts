import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencia:Experiencia[]=[];
  public editExperiencia: Experiencia | undefined;
  public deleteExperiencia:Experiencia | undefined;
  

  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencia();
  }

  
  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response: Experiencia[]) =>{
        this.experiencia=Response;
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, experiencia?: Experiencia):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addExperienciaModal');
    }else if (mode==='edit'){
      this.editExperiencia=experiencia;
      button.setAttribute('data-target','#editExperienciaModal');
    }else if (mode==='delete'){
      this.deleteExperiencia=experiencia;
      button.setAttribute('data-target','#deleteExperienciaModal');
    }

    container?.appendChild(button);
    button.click();
  }
  public onAddExperiencia(addForm:NgForm){
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next:(response:Experiencia)=>{
        console.log(response);
        this.getExperiencia();
        addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
    public onUpdateExperiencia (experiencia: Experiencia){
      this.editExperiencia=experiencia;
        document.getElementById('add-experiencia-form')?.click();
      this.experienciaService.updateExperiencia(experiencia).subscribe({
        next:(response:Experiencia)=>{
        console.log(response);
          this.getExperiencia();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
        })
      }
      public onDeleteExperiencia (idExp: number):void{
      this.experienciaService.deleteExperiencia(idExp).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getExperiencia();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
  }



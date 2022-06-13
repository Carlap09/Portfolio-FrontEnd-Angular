import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { HeaderService } from 'src/app/servicios/header.service';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})

export class SobreMiComponent implements OnInit {
  public persona : Persona | undefined;
  public editPersona: Persona | undefined;
  public deletePersona:Persona | undefined;
  
  constructor(private headerService : HeaderService){ }

  ngOnInit(): void {
    this.getPer();
  }
  public getPer(): void{
    this.headerService.getPer().subscribe({
      next: (response: Persona) =>{
        this.persona=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
  })
  }
  public onOpenModal(mode:String, persona?: Persona):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addPersonaModal');
    }else if (mode==='edit'){
      this.editPersona=persona;
      button.setAttribute('data-target','#editPersonaModal');
    }else if (mode==='delete'){
    this.deletePersona=persona;
    button.setAttribute('data-target','#deletePersonaModal');
  }


    container?.appendChild(button);
    button.click();
  }
  public onAddPersona(addForm: NgForm){
    document.getElementById('add-persona-form')?.click();
    this.headerService.addPersona(addForm.value).subscribe({
      next:(response:Persona)=>{
        console.log(response);
        this.getPer();
        addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  public onUpdatePersona (persona: Persona){
    this.editPersona=persona;
      document.getElementById('add-persona-form')?.click();
    this.headerService.updatePersona(persona).subscribe({
      next:(response:Persona)=>{
      console.log(response);
        this.getPer();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
      })
    }
    public onDeletePersona(id: number):void{
      this.headerService.deletePersona(id).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getPer();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
}

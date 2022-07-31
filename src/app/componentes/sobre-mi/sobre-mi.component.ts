import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { HeaderService } from 'src/app/servicios/header.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';



@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})

export class SobreMiComponent implements OnInit {
  public persona : Persona | undefined;
  public editPersona: Persona | undefined;
  personas:any;
    
  constructor(private headerService : HeaderService, private datosPortfolio:PortfolioService){ }

  ngOnInit(): void {
    this.getPersona;
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log("Datos personales", JSON.stringify(data));
      this.persona=data[0];
    })
  
  } 
  
  public getPersona(): void{
    this.headerService.getPersona().subscribe({
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
  }


  container?.appendChild(button);
  button.click();

  }
  public onAddPersona(addForm: NgForm){
    document.getElementById('add-persona-form')?.click();
    this.headerService.addPersona(addForm.value).subscribe({
      next:(response:Persona)=>{
        console.log(response);
        this.getPersona();
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
        this.getPersona();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
      })
    }
}
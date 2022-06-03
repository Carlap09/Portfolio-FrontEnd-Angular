import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Aptitudes } from 'src/app/model/aptitudes';
import { AptitudesService } from 'src/app/servicios/aptitudes.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {

  public aptitudes:Aptitudes[] = [];
  public editAptitudes: Aptitudes | undefined;
  public deleteAptitudes:Aptitudes | undefined;
  
  constructor(private aptitudesService:AptitudesService) { }
  ngOnInit(): void {
    this.getAptitudes();
  }
  public getAptitudes():void{
    this.aptitudesService.getAptitudes().subscribe({
      next:(Response: Aptitudes[]) =>{
        this.aptitudes=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, aptitudes?: Aptitudes ):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addAptitudesModal');
    }else if (mode==='edit'){
      this.editAptitudes=aptitudes;
      button.setAttribute('data-target','#editAptitudesModal');
    }else if (mode==='delete'){
      this.deleteAptitudes=aptitudes;
      button.setAttribute('data-target','#deleteAptitudesModal');
    }

    container?.appendChild(button);
    button.click();
  }
  public onAddAptitudes(addForm: NgForm){
    document.getElementById('add-aptitudes-form')?.click();
    this.aptitudesService.addAptitudes(addForm.value).subscribe({
      next:(response:Aptitudes)=>{
        console.log(response);
        this.getAptitudes();
        addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
    public onUpdateAptitudes (aptitudes: Aptitudes){
      this.editAptitudes=aptitudes;
        document.getElementById('add-aptitudes-form')?.click();
      this.aptitudesService.updateAptitudes(aptitudes).subscribe({
        next:(response:Aptitudes)=>{
        console.log(response);
          this.getAptitudes();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
        })
      }
    
    public onDeleteAptitudes(idApti: number):void{
      this.aptitudesService.deleteAptitudes(idApti).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getAptitudes();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
  }

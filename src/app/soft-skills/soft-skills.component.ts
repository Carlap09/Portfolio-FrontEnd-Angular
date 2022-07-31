import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SoftSkills } from '../model/softSkills';
import { SoftSkillsService } from '../servicios/soft-skills.service';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {
  public softSkills:SoftSkills[] = [];
  public editSoftSkills: SoftSkills | undefined;
  public deleteSoftSkills:SoftSkills | undefined;

  constructor(private softSkillsService:SoftSkillsService) { }

  ngOnInit(): void {
    this.getSoftSkills();
  }
  public getSoftSkills():void{
    this.softSkillsService.getSoftSkills().subscribe({
      next:(Response: SoftSkills[]) =>{
        this.softSkills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, softSkills?: SoftSkills ):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addSoftSkillsModal');
    }else if (mode==='edit'){
      this.editSoftSkills=softSkills;
      button.setAttribute('data-target','#editSoftSkillsModal');
    }else if (mode==='delete'){
      this.deleteSoftSkills=softSkills;
      button.setAttribute('data-target','#deleteSoftSkillsModal');
    }

    container?.appendChild(button);
    button.click();
  }
  public onAddSoftSkills(addForm: NgForm){
    document.getElementById('add-softSkills-form')?.click();
    this.softSkillsService.addSoftSkills(addForm.value).subscribe({
      next:(response:SoftSkills)=>{
        console.log(response);
        this.getSoftSkills();
        addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
    public onUpdateSoftSkills (softSkills: SoftSkills){
      this.editSoftSkills=softSkills;
        document.getElementById('add-softSkills-form')?.click();
      this.softSkillsService.updateSoftSkills(softSkills).subscribe({
        next:(response:SoftSkills)=>{
        console.log(response);
          this.getSoftSkills();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
        })
      }
    
    public onDeleteSoftSkills(idSoftSki: number):void{
      this.softSkillsService.deleteSoftSkills(idSoftSki).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getSoftSkills();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
    }
  }


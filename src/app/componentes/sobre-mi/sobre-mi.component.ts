import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { HeaderService } from 'src/app/servicios/header.service';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})

export class SobreMiComponent implements OnInit {
  public usuario : Usuario | undefined;
  public editUsuario: Usuario | undefined;
  
  constructor(private headerService : HeaderService){ }

  ngOnInit(): void {
    this.getUser();
  }
  public getUser(): void{
    this.headerService.getUser().subscribe({
      next: (response: Usuario) =>{
        this.usuario=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
  })
  }

}

import { Component, OnInit } from '@angular/core';
import { usuario } from '../model/usuario.interface';
import { ServiceUsuarioService } from 'src/app/service/service-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent  implements OnInit {
  getUsuario: any
  getU: any

  mostrarAlerta: boolean = false

  mostrarEliminar: boolean = false

  
  constructor(private service: ServiceUsuarioService, private router: Router) { }

  ngOnInit() {
    this.getU = this.service.getUser()
    this.mostrarUser()
    //this.close()
    // this.deleteUser()
  }
  mostrarUser(){
    this.service.getInfoUser().subscribe((res: any)=>{
      this.getUsuario = res
      console.log('ok controlador', this.getUsuario)
    },
    (error)=>{
      console.log(error)
    }
  )}
  alertSi(){
    this.service.closeSession()
    this.router.navigateByUrl('/login')
    this.mostrarAlerta = false
  }
  alertNo(){
    this.mostrarAlerta= false
  }
  close(){
    this.mostrarAlerta = true
  }
  eliminarSi(){
    this.service.deleteUser().subscribe((res:any)=>{
      this.mostrarEliminar = false
      this.router.navigateByUrl('/registro')
    },
    (error)=>{
      console.log(error)
    })
  }
  eliminarNo(){
    this.mostrarEliminar = false
  }
  deletUser(){
    this.mostrarEliminar = true
  }

}

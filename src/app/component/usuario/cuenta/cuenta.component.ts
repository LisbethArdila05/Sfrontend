import { Component, OnInit } from '@angular/core';
import { usuario } from '../model/usuario.interface';
import { ServiceUsuarioService } from 'src/app/service/service-usuario.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent  implements OnInit {
  
  Usuario: usuario = {
    id: 0,
    nombreUsuario: '',
    email: '',
    contrasena: ''
  }

  mostrarAlerta: boolean = false
  mostrarEliminar: boolean = false

  constructor(private service: ServiceUsuarioService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('tokenSign') || ''
    const decode = jwtDecode(token) as usuario
    this.Usuario = decode
    console.log(this.Usuario)
  }

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

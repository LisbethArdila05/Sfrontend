import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ServiceUsuarioService } from 'src/app/service/service-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {

  mostrarAceptar: boolean = false
  mostrarError: boolean = false

  formUserRegistro = this.FormB.group({
    nombreUsuario: ['',Validators.required],
    email: ['',[Validators.required, Validators.email]],
    contrasena: ['',[Validators.required, Validators.minLength(8)]]
  })
  get getNombreUsuario () :FormControl{
    return this.formUserRegistro.get('nombreUsuario') as FormControl
  }
  get getEmail () :FormControl{
    return this.formUserRegistro.get('email') as FormControl
  }
  get getContrasena () :FormControl{
    return this.formUserRegistro.get('contrasena') as FormControl
  }
  constructor(private FormB: FormBuilder, private serviceU: ServiceUsuarioService, private route: Router) { }

  ngOnInit() {}

  crearUsuario(){
    const data = this.formUserRegistro.value as FormGroup;
    this.serviceU.registroUsuario(data).subscribe((res:any)=>{
      this.mostrarAceptar = true
      console.log('exitoso')
    },
    (error:any) => {
      this.mostrarError = true
      console.log('no exitoso', error.message)
    })
  }

  aceptarAlerta(){
    this.mostrarAceptar = false;
    this.route.navigateByUrl('/presentacion')
  }
  aceptarError(){
    this.mostrarError = false;
  }

}

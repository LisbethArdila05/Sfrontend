import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ServiceUsuarioService } from 'src/app/service/service-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  mostrarAceptar: boolean = false
  mostrarError: boolean = false

  formUserLogin = this.formB.group({
    nombreUsuario: ['',Validators.required],
    contrasena: ['',[Validators.required, Validators.minLength(8)]]
  })
  get getNombreUsuario () :FormControl{
    return this.formUserLogin.get('nombreUsuario') as FormControl
  }
  get getContrasena () :FormControl{
    return this.formUserLogin.get('contrasena') as FormControl
  }

  constructor(private formB: FormBuilder, private serviceU: ServiceUsuarioService, private router: Router) { }

  ngOnInit() {}

  loginUsuario(){
    const data = this.formUserLogin.value as FormGroup
    this.serviceU.loginUsuario(data).subscribe((res:any)=>{
      localStorage.setItem('tokenSign', res.tokenSession)
      this.mostrarAceptar = true;
      console.log('exitoso', res) 
    }, 
    (error: any)=>{
      console.log('No exitoso', error.message)
      this.mostrarError = true
    }
    )
  }
  aceptarAlerta(){
    this.router.navigateByUrl('/presentacion')
  }
  aceptarError(){
    this.mostrarError = false;
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { registroRouting, loginRouting, cuentaRouting } from './usuario-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    registroRouting,
    loginRouting,
    cuentaRouting,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsuarioModule { }

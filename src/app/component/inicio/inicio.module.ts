import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentacionRouting } from './inicio-routing.module';

import { InicioRoutingModule } from './inicio-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PresentacionRouting
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }

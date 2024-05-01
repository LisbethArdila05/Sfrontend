import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedAlertsComponent } from './shared-alerts/shared-alerts.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedMenuComponent } from './shared-menu/shared-menu.component';
import { SharedCargaComponent } from './shared-carga/shared-carga.component';



@NgModule({
  declarations: [SharedAlertsComponent, SharedMenuComponent, SharedCargaComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SharedAlertsComponent, SharedMenuComponent, SharedCargaComponent,]
})
export class SharedModule { }

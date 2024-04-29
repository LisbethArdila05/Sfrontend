import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedAlertsComponent } from './shared-alerts/shared-alerts.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedMenuComponent } from './shared-menu/shared-menu.component';



@NgModule({
  declarations: [SharedAlertsComponent, SharedMenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SharedAlertsComponent, SharedMenuComponent]
})
export class SharedModule { }

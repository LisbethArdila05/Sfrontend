import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { variablesRouting } from './dashboard-routing.module';
import { graficasRouting } from './dashboard-routing.module';

import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    variablesRouting,
    graficasRouting,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule,
    NgChartsModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }


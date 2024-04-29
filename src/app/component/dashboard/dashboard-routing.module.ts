import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariablesComponent } from './variables/variables.component';
import { GraficasComponent } from './graficas/graficas.component';


const routes: Routes = [
  {
    path: 'variables',
    component: VariablesComponent
  },
  {
    path: 'graficas',
    component: GraficasComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

export const variablesRouting = [VariablesComponent]
export const graficasRouting = [GraficasComponent]

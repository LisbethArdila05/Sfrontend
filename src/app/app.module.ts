import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioModule } from './component/usuario/usuario.module';
import { SharedModule } from './shared/shared.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DashboardModule } from './component/dashboard/dashboard.module';
import { NgChartsModule } from 'ng2-charts';
import { InicioModule } from './component/inicio/inicio.module';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    UsuarioModule,
    DashboardModule,
    InicioModule,
    SharedModule,
    HttpClientModule,
    NgChartsModule,
    BrowserModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {provide: JWT_OPTIONS, useValue:JWT_OPTIONS},
  JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceUsuarioService } from '../service/service-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginGuard implements CanActivate {

  constructor(private serviceU: ServiceUsuarioService){}
  canActivate(): boolean{
    if(!this.serviceU.isAuth()){
      console.log('El token no es valido o ya expiro')
      return false
    }
    return true;
  }
    
  }
  


import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../component/usuario/model/usuario.interface';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {jwtDecode} from 'jwt-decode'

@Injectable({
  providedIn: 'root' 
})
export class ServiceUsuarioService {

  private url = environment.baseUrl

  constructor(private http: HttpClient, private jwtservice: JwtHelperService) { }

  registroUsuario(formsUser: FormGroup):Observable<{message:string;}>{
    return this.http.post<{message:string;}>(`${this.url}/usuario/registro`, formsUser)
  }
  loginUsuario(formsLogin: FormGroup): Observable<{message:string;}>{
    return this.http.post<{message:string;}>(`${this.url}/usuario`,formsLogin)
  }
  isAuth(): boolean{
    const tokenSign = localStorage.getItem('tokenSign')
    if(this.jwtservice.isTokenExpired(tokenSign) || !localStorage.getItem('tokenSign')){
      return false
    }
    return true
  }
  getToken():string | null{
    const token = localStorage.getItem('tokenSign')
    //console.log(token)
    return token
  }
  getUser(){
    const tokenSign = this.getToken()
    //console.log(tokenSign)
    if(tokenSign){
      const decode = jwtDecode(tokenSign) as usuario
      const usuario = decode.nombreUsuario
      console.log(usuario)
      this.http.post<usuario>(`${this.url}/usuario/info`, {usuario}).subscribe( res => {},
      (error)=>{
        console.log(error)
      })
      return decode
    }else{
      return null
    }
  }
  getInfoUser():Observable<usuario>{
    return this.http.get<usuario>(`${this.url}/usuario/obtener`)
  }
  deleteUser():Observable<{mesagge:any;}>{
    return this.http.delete<{mesagge:any;}>(`${this.url}/usuario/del`)
  }

  closeSession(){
    localStorage.removeItem('tokenSign')
  }
 
}

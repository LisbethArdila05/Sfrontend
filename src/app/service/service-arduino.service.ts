import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode'
import { usuario } from '../component/usuario/model/usuario.interface';
import { GetSensor, GetFiltro, promedio } from '../component/dashboard/model/sensor.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceArduinoService {

  private url = environment.baseUrl

  constructor(private http: HttpClient) { }

  conexionArduino(idPlanta: number): Observable<any>{
    return this.http.post(`${this.url}/sensor`, {idPlanta})
  }

  getDatosSensor():Observable<GetSensor>{
    return this.http.get<GetSensor>(`${this.url}/sensor`)
  }
  getfirst():Observable<GetSensor>{
    return this.http.get<GetSensor>(`${this.url}/sensor/primer`)
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
      this.http.post<usuario>(`${this.url}/sensor/info`, {usuario}).subscribe( res => {},
        (error)=>{
          console.log(error)
        })
      return decode
    }else{
      return null
    }
  }
} 

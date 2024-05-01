import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode'
import { usuario } from '../component/usuario/model/usuario.interface';
import { GetSensor} from '../component/dashboard/model/sensor.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceArduinoService {

  private url = environment.baseUrl

  constructor(private http: HttpClient) { }

  conexionArduino(idPlanta: number, idUser: number): Observable<any>{
    return this.http.post(`${this.url}/sensor`, {idPlanta,idUser})
  }

  getDatosSensor():Observable<GetSensor>{
    return this.http.get<GetSensor>(`${this.url}/sensor`)
  }
  getfirst():Observable<GetSensor>{
    return this.http.get<GetSensor>(`${this.url}/sensor/primer`) 
  }
} 

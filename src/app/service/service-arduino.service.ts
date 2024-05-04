import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
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
    return this.http.post(`${this.url}/sensor`, {idPlanta, idUser})
  }

  getDatosSensor(idUser: number):Observable<GetSensor>{
    return this.http.get<GetSensor>(`${this.url}/sensor/${idUser}`)
  }
  getfirst(idUser: number):Observable<GetSensor>{
    return this.http.get<GetSensor>(`${this.url}/sensor/primer/${idUser}`).pipe(delay(500))
  }
} 

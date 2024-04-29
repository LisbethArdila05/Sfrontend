import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { planta } from '../component/dashboard/model/planta.interface';


@Injectable({
  providedIn: 'root'
})
export class ServicePlantaService {

  private url = environment.baseUrl

  constructor(private http: HttpClient) { }

  getPlanta():Observable<planta>{
    return this.http.get<planta>(`${this.url}/planta`) 
  }
}

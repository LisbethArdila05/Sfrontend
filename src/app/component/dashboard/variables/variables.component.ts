import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServicePlantaService } from 'src/app/service/service-planta.service';
import { ServiceArduinoService } from 'src/app/service/service-arduino.service';
import { planta } from '../model/planta.interface';
import { GetSensor } from '../model/sensor.interface';
import { PaginatePipe } from 'ngx-pagination';
import { usuario } from '../../usuario/model/usuario.interface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss'],
})
export class VariablesComponent  implements OnInit {

  public barChartData: any[] = [];
  public barChartLabels: string[] = ['Humedad', 'Temperatura C°', 'Humedad suelo'];
  public barChartOptions: any = { responsive: true}; 
  public barChartLegend = true;

  listPlant : planta[] = []
  listSensor: GetSensor [] =[]
  //paginacion
  p: number = 1;
  pagesize:number = 3;

  Usuario: usuario = {
    id: 0,
    nombreUsuario: '',
    email: '',
    contrasena: ''
  } 
  
  constructor(private service: ServicePlantaService, private serviceA: ServiceArduinoService) { }

  ngOnInit() {
    const token = localStorage.getItem('tokenSign') || ''
    const decode = jwtDecode(token) as usuario
    this.Usuario.id = decode.id
    this.plantas()
    this.getDatosSensor()
  }
  //paginacion
  handlePageChange(event:any) {
    this.p = event;
  }
  //metodos para 
  plantas(){
    this.service.getPlanta().subscribe((res:any)=>{
      for(let plants of res.planta){
        this.listPlant.push(plants)
      }
    },(error) => { 
      console.log(error)
    })
  }
  getDatosSensor(){
    this.serviceA.getDatosSensor(this.Usuario.id).subscribe((res: any) => {
      for(let sensor of res.GetSensor){
        this.listSensor.push(sensor)
      }
      const datos_mes = this.promedios(res.GetSensor);

      this.barChartData = datos_mes.map(datos => ({
        data: [
          datos.promedioHumedad, 
          datos.promedioTemperaturaC, 
          datos.promedioHumedadS
        ],
        backgroundColor: [
          '#11998e',
          '#93E4C1',
          '#135D66',
        ],
        borderColor: '#11998e',
        pointBackgroundColor: '#11998e',
        label: `mes ${datos.mes}`
      }))
    }, (error) =>{
      console.log(error)
    })
  }
  promedios(datos: any[]):any[] {
    const promediosPorMes: { [key: string]: any } = {};

  // Itera sobre los datos para calcular los promedios por mes
    datos.forEach(sensor => {
      const fecha = new Date(sensor.fecha);
      const mes = fecha.getMonth() + 1; // Meses en JavaScript son indexados desde 0
      const key = `${fecha.getFullYear()}-${mes}`;

      if (!promediosPorMes[key]) {
        promediosPorMes[key] = {
          mes: key,
          totalHumedad: 0,
          totalTemperaturaC: 0,
          totalHumedadS: 0,
          count: 0
        };
      }

      promediosPorMes[key].totalHumedad += sensor.sHumedad;
      promediosPorMes[key].totalTemperaturaC += sensor.sTemperaturaC;  
      promediosPorMes[key].totalHumedadS += sensor.sHumedadS;
      promediosPorMes[key].count++;
    });

  // Calcula el promedio de cada variable por mes
    const promedios = Object.values(promediosPorMes).map(datos => ({
      mes: datos.mes,
      promedioHumedad: datos.totalHumedad / datos.count,
      promedioTemperaturaC: datos.totalTemperaturaC / datos.count,
      promedioHumedadS: datos.totalHumedadS / datos.count
    }));
    return promedios
  }
  //filtra por mes
 
  

  //graficas de linea de un mes en general de todas las plantas agrupo por dia
  //valiables mas altas y bajas
}


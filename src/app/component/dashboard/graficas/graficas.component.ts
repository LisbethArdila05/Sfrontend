import { Component, OnInit } from '@angular/core';
import { ServicePlantaService } from 'src/app/service/service-planta.service';
import { planta } from '../model/planta.interface';
import { ServiceArduinoService } from 'src/app/service/service-arduino.service';
import { GetSensor } from '../model/sensor.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent  implements OnInit {
  public barChartData: any[] = [];
  public barChartLabels: string[] = ['Humedad', 'Temperatura C°', 'Humedad Suelo'];
  public barChartOptions: any = { responsive: true,}; 
  public barChartLegend = true;
  
  //colores targets
   humcolor: string= '';
   tempcolor :string = '';
   humscolor :string='';

  //conclusiones 
   humconclusion :string = '';
   humsconclusion: string= ''
   tempconclusion: string ='';

   imgPlanta: string ='';

  seleccionPlanta: boolean = false
  listPlant : planta[] = []
  listSensor : GetSensor[] = []
   
  plantaElejida: number = 0;

  getU: any
  //datosDisponibles: boolean = false
  

  constructor(private service: ServicePlantaService, private serviceA: ServiceArduinoService) { }

  ngOnInit() {
    this.plantas()
    this.sensorPrimero()
    this.getU = this.serviceA.getUser()
  }
  private imagePlanta(tipoPlanta: string) {
    switch(tipoPlanta){
      case "Amargas":
        return "assets/tipos-planta/Amarga.jpg";
      case "Aromaticas":
        return "assets/tipos-planta/Aromatica.jpg";
      case "Florales":
        return "assets/tipos-planta/Floral.jpg";
      case "Forestales":
        return "assets/tipos-planta/Forestal.jpg";
      case "Frutales":
        return "assets/tipos-planta/Frutal.jpg";
      case "Hortalizas":
        return "assets/tipos-planta/Hortaliza.jpg";
      case "Ornamentales":
        return "assets/tipos-planta/Ornamental.jpg";
      case "Verduras":
        return "assets/tipos-planta/verdura.jpg";
      default:
        return "assets/tipos-planta/Amarga.jpg"
    }
  }
  //esta funcion imprime la informacion de la tabla "planta"
  plantas(){
    this.service.getPlanta().subscribe((res:any)=>{
      for(let plants of res.planta){
        this.listPlant.push(plants)
      }
    },
    (error) => {
      console.log(error)
    }
    )}
  //esta funcion muestra la informacion que esta en la base de datos en la tabla "sensor" ademas de imprimirlos en la grafica
  sensorPrimero(){
    this.serviceA.getfirst().subscribe((res:any)=>{
      const sensorData = res.GetFirstsensor;
      if(typeof res.GetFirstsensor === 'object'){
        this.listSensor = []
        this.listSensor.push(res.GetFirstsensor)
       // this.datosDisponibles = true
        this.barChartData = [
          {
            data: [
              res.GetFirstsensor.sHumedad,
              res.GetFirstsensor.sTemperaturaC,
              res.GetFirstsensor.sHumedadS
            ],
            backgroundColor: '#5fa08c',
            label: 'Sensores'
          }];
          const tPlanta = sensorData.tipoPlanta.tipoPlanta;
          this.imgPlanta = this.imagePlanta(tPlanta)
          
        const {humcolor, tempcolor, humscolor} = this.compararDatos(sensorData);
        this.humcolor = humcolor
        this.tempcolor = tempcolor
        this.humscolor = humscolor
        
      } else{
        console.log("No es un objeto")
      } 
    },
    (error)=>{
      console.log(error)
    })
  } 
  //este metodo compara los datos del sensor con los de la tabla "tipo de planta"
  compararDatos(sensorData: GetSensor){
    const planta = sensorData.tipoPlanta;
    let humcolor: string= '';
    let tempcolor :string = '';
    let humscolor : string = '';
    if(planta){
      if(ValidarHumedad(sensorData.sHumedad, planta.sHumedadAmbiente)){
        this.humconclusion = "la humedad esta por dentro de lo establecido para el tipo de planta "
        humcolor = 'humedad-verde';
      }else {
        this.humconclusion = "la humedad esta por fuera de lo establecido para el tipo de planta "
        humcolor = 'humedad-rojo';
      }
      if(ValidarTemperatura(sensorData.sHumedad, planta.sTemperaturaAmbiente)){
        this.tempconclusion = "la temperatura esta por dentro de lo establecido para el tipo de planta "
        tempcolor = 'temperatura-verde'
      }
      else {
        this.tempconclusion = "la temperatura esta por fuera de lo establecido para el tipo de planta "
       tempcolor = 'temperatura-rojo'
      }
      if(ValidarHumedadS(sensorData.sHumedadS, planta.sHumedadSuelo)){
        this.humsconclusion = "la humedad del suelo esta por dentro de lo establecido para el tipo de planta "
        humscolor = 'humedad-verde';
      }else {
        this.humsconclusion = "la humedad del suelo esta por fuera de lo establecido para el tipo de planta "
        humscolor = 'humedad-rojo';
      }
    }
    return {humcolor, tempcolor, humscolor}
  }
  menuVisible(){
    this.seleccionPlanta = true
  }
  cancelarMenu(){
    this.seleccionPlanta= false;
  }
  //este metodo captura el id del tipo de planta para guardarlo junto con los datos que llegan del sensor 
  aceptarMenu(): void {
    if(this.plantaElejida !== undefined){
      this.serviceA.conexionArduino(this.plantaElejida).subscribe((res:any) =>{
        console.log(this.plantaElejida)
      },
      (error:any) => {
        console.log(error)
      }
      )
      this.seleccionPlanta = false;
    }
    else{
      alert("por favor seleccione una planta")
    }
  }
}
function ValidarTemperatura(valor:number, rango:string):boolean {
  const[min, max]=rango.split('-').map(parseFloat);
  return valor >= min && valor <=max;
}
function ValidarHumedad(valor:number, rango:string):boolean {
  const[min, max]=rango.split('-').map(parseFloat);
  return valor >= min && valor <=max;
}
function ValidarHumedadS(valor:number, rango:string):boolean{
  const[min, max]=rango.split('-').map(parseInt);
  return valor >= min && valor <=max;
}

  
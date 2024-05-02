import { Component, OnInit } from '@angular/core';
import { ServicePlantaService } from 'src/app/service/service-planta.service';
import { planta } from '../model/planta.interface';
import { ServiceArduinoService } from 'src/app/service/service-arduino.service';
import { GetSensor } from '../model/sensor.interface';
import { DatePipe } from '@angular/common';
import { usuario } from '../../usuario/model/usuario.interface';
import { jwtDecode } from 'jwt-decode';

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
    this.Usuario = decode
    //console.log(this.Usuario.id)
    //this.getU = this.serviceA.getUser()
    this.plantas()
    this.sensorPrimero()

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
    this.serviceA.getfirst(this.Usuario.id).subscribe((res:any)=>{
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
        this.humconclusion = "La humedad está dentro de los parámetros establecidos, "
        humcolor = 'humedad-verde';
      }else {
        this.humconclusion = "La humedad no está en el rango adecuado, "
        humcolor = 'humedad-rojo';
      }
      if(ValidarTemperatura(sensorData.sTemperaturaC, planta.sTemperaturaAmbiente)){
        this.tempconclusion = "La temperatura está dentro de los parámetros establecidos, "
        tempcolor = 'temperatura-verde'
      }
      else {
        this.tempconclusion = "La temperatura no está en el rango adecuado, "
       tempcolor = 'temperatura-rojo'
      }
      if(ValidarHumedadS(sensorData.sHumedadS, planta.sHumedadSuelo)){
        this.humsconclusion = "La humedad del suelo está dentro de los parámetros establecidos "
        humscolor = 'humedad-verde';
      }else {
        this.humsconclusion = "La humedad del suelo no está en el rango adecuado, "
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
      this.serviceA.conexionArduino(this.plantaElejida, this.Usuario.id).subscribe((res:any) =>{
        console.log(this.plantaElejida)
        this.sensorPrimero()
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

  
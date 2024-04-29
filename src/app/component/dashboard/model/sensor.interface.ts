export interface GetSensor{
    id: number,
    sHumedad: number,
    sTemperaturaC: number,
    sTemperaturaF:number,
    sHumedadS: number,
    fecha: Date,
    idtipoPlanta: number,
    tipoPlanta:{
        tipoPlanta: string
        sHumedadAmbiente:string
        sHumedadSuelo:string
        sTemperaturaAmbiente:string
    }
} 
export interface GetFiltro{
    fecha: string,
    idtipoPlanta: number 
}

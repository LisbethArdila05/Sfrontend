export interface GetSensor{
    id: number,
    sHumedad: number,
    sTemperaturaC: number,
    sTemperaturaF:number,
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

export interface promedio{
    sHumedadP: string,
    sTemperaturaCP: string,
    sTemperaturaFP:string
}
export interface ZonaInfo {
  id_zona: string
  zona: string
}

export interface Puesto {
  id_puesto: string
  puesto: string
}

export interface Mesa {
  numero: number
  escrutado: boolean
  digitalizado: number
  id_informacion_mesa_corporacion: string
  nombre_archivo: string
}

export interface Zona {
  zona: ZonaInfo
  puestos: {
    puesto: Puesto
    mesas: Mesa[]
  }[]
}

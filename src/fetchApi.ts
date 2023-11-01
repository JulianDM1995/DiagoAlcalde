import { Mesa, Puesto, ZonaInfo } from './types'

export async function fetchZonas(
  id_corporacion: string,
  id_departamento: string,
  id_municipio: string
): Promise<ZonaInfo[]> {
  const response = await fetch(
    `https://escrutinios-api-publicacion-nacional.registraduria.gov.co/esc/v1/actas-documentos/${id_corporacion}/${id_departamento}/${id_municipio}/zonas`
  )
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

export async function fetchPuestos(
  id_corporacion: string,
  id_departamento: string,
  id_municipio: string,
  id_zona: string
): Promise<Puesto[]> {
  const response = await fetch(
    `https://escrutinios-api-publicacion-nacional.registraduria.gov.co/esc/v1/actas-documentos/${id_corporacion}/${id_departamento}/${id_municipio}/${id_zona}/puestos`
  )
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

export async function fetchMesas(
  id_corporacion: string,
  id_departamento: string,
  id_municipio: string,
  id_zona: string,
  id_puesto: string
): Promise<Mesa[]> {
  const response = await fetch(
    `https://escrutinios-api-publicacion-nacional.registraduria.gov.co/esc/v1/actas-documentos/${id_corporacion}/${id_departamento}/${id_municipio}/${id_zona}/${id_puesto}/mesas`
  )
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

export interface Escrutinio {
  zona: ZonaInfo
  puestos: {
    puesto: Puesto
    mesas: Mesa[]
  }[]
}
export async function fetchMunicipio(
  id_corporacion: string,
  id_departamento: string,
  id_municipio: string
): Promise<Escrutinio[]> {
  const zonas = await fetchZonas(id_corporacion, id_departamento, id_municipio)
  const resultados = await Promise.all(
    zonas.map(async (zona) => {
      const puestos = await fetchPuestos(
        id_corporacion,
        id_departamento,
        id_municipio,
        zona.id_zona
      )
      const puestosConMesas = await Promise.all(
        puestos.map(async (puesto) => {
          const mesas = await fetchMesas(
            id_corporacion,
            id_departamento,
            id_municipio,
            zona.id_zona,
            puesto.id_puesto
          )
          return { puesto, mesas }
        })
      )
      return { zona, puestos: puestosConMesas }
    })
  )
  return resultados
}

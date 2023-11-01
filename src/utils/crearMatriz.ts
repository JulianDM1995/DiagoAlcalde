import { Zona } from '../types'

export function descargarCSV(zonas: Zona[]) {
  const matriz = crearMatriz(zonas)
  let csvContent = ''

  matriz.forEach((fila) => {
    const filaStr = fila.join(',')
    csvContent += filaStr + '\r\n'
  })

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'datos.csv'
  a.click()
}

export function crearMatriz(zonas: Zona[]): any[][] {
  const matriz = []

  for (const zona of zonas) {
    const idZona = zona.zona.id_zona

    for (const puesto of zona.puestos) {
      const idPuesto = puesto.puesto.id_puesto

      for (const mesa of puesto.mesas) {
        const fila = [
          idZona,
          idPuesto,
          mesa.numero,
          mesa.digitalizado, // Asumo que "diago" se refiere a "digitalizado"
          -1,
          -1,
        ]
        matriz.push(fila)
      }
    }
  }

  return matriz
}

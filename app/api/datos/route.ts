import {
  Descarga,
  descargarArchivosDeClaveros,
} from '@/src/descargarArchivosDeClaveros'
import { fetchMunicipio } from '@/src/fetchApi'
import { prisma } from '@/src/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const zonas = await fetchMunicipio('003', '11', '001')

  const zonasADescargar: Descarga[] = zonas.flatMap((zonaItem) =>
    zonaItem.puestos.flatMap((puestoItem) =>
      puestoItem.mesas
        .filter((mesaItem) => mesaItem.digitalizado === 1)
        .map((mesaItem) => ({
          pdfLink: mesaItem.nombre_archivo,
          nombre: `${zonaItem.zona.id_zona}-${puestoItem.puesto.id_puesto}-${mesaItem.numero}.pdf`,
        }))
    )
  )
  await descargarArchivosDeClaveros(zonasADescargar)

  const mesas = await prisma.mesaDB.findMany()

  return NextResponse.json({ zonas, mesas })
}

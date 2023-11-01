import { prisma } from '@/src/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export type DatosProps = {
  id_zona: string
  id_puesto: string
  numero_mesa: number
  diago: number
  hp: number
}

export type DatosResponse = { status: string }

export async function POST(request: NextRequest) {
  const { id_zona, id_puesto, numero_mesa, diago, hp } =
    (await request.json()) as DatosProps

  const mesa = await prisma.mesaDB.findFirst({
    where: { id_zona, id_puesto, numero_mesa },
  })

  if (!mesa) {
    console.log('Crear resultados de mesa', id_zona, id_puesto, numero_mesa)
    await prisma.mesaDB.create({
      data: {
        id_zona,
        id_puesto,
        numero_mesa,
        diago,
        hp,
      },
    })
  } else {
    console.log(
      'Modificar resultados de mesa',
      mesa.id,
      id_zona,
      id_puesto,
      numero_mesa
    )
    await prisma.mesaDB.update({
      where: {
        id: mesa.id,
      },
      data: {
        id_zona,
        id_puesto,
        numero_mesa,
        diago,
        hp,
      },
    })
  }

  return NextResponse.json({
    id_zona,
    id_puesto,
    numero_mesa,
    diago,
    hp,
  })
}

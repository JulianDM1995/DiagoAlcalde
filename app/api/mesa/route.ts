import { prisma } from '@/src/libs/prisma'
import { NextResponse } from 'next/server'

export type RouteProps = {}

export type RouteResponse = {}

export async function GET() {
  const mesas = await prisma.mesaDB.findMany()

  return NextResponse.json({ mesas })
}

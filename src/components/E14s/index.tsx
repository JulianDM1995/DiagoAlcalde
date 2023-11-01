'use client'
import { Box, Card, Flex, Loader, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useResults } from '../useResults'
import { Clavero } from './Clavero'
import { DatosMesa } from './Datos'

export const E14s = () => {
  const { setResultados, zonas, setZonas } = useResults()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/datos')
        const data = await response.json()
        setResultados(data.mesas)
        setZonas(data.zonas)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    fetchData()
  }, [])

  if (!zonas) {
    return <Loader />
  }

  return (
    <Box mt={100}>
      {zonas.map((zona, index) => (
        <div key={`zona-${index}`}>
          {zona.puestos.map((puesto, index) => (
            <div key={`puesto-${index}`}>
              {puesto.mesas &&
                puesto.mesas.map((mesa, index) => {
                  return (
                    <Card p={'lg'} shadow="xs" m={'lg'} key={`mesa-${index}`}>
                      <Flex justify={'space-between'}>
                        <Text>Zona: {zona.zona.id_zona}</Text>
                        <Text>
                          Puesto: {puesto.puesto.id_puesto} -{' '}
                          {puesto.puesto.puesto}
                        </Text>
                        <Text>
                          Mesa: {mesa.numero} / {puesto.mesas.length}
                        </Text>
                      </Flex>

                      {mesa.digitalizado ? (
                        <Flex bg={'gray.3'}>
                          <Clavero
                            id_zona={zona.zona.id_zona}
                            id_puesto={puesto.puesto.id_puesto}
                            mesa_numero={mesa.numero}
                          />
                        </Flex>
                      ) : (
                        <Flex p={'xl'} h={'50vh'} w={'100%'}>
                          <Flex
                            align={'center'}
                            justify={'center'}
                            w={'100%'}
                            bg={'gray.3'}
                            c={'dark'}
                          >
                            Claveros aún sin digitalizar todavía
                          </Flex>
                        </Flex>
                      )}
                      <DatosMesa
                        id_zona={zona.zona.id_zona}
                        id_puesto={puesto.puesto.id_puesto}
                        numero_mesa={mesa.numero}
                      />
                    </Card>
                  )
                })}
            </div>
          ))}
        </div>
      ))}
    </Box>
  )
}

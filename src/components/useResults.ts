import { DatosProps } from '@/app/api/mesa/set-valor/route'
import { notifications } from '@mantine/notifications'
import { create } from 'zustand'

export type Result = {
  id_zona: string
  id_puesto: string
  numero_mesa: number
  diago: number
  hp: number
}

type ResultProps = {
  loading: boolean
  resultados: Result[]
  enviarDatos: (data: DatosProps) => Promise<void>
  setResultados: (resultados: Result[]) => void
  getResults: (
    id_zona: string,
    id_puesto: string,
    numero_mesa: number
  ) => Result | undefined
}

export const useResults = create<ResultProps>((set, get) => ({
  loading: false,
  resultados: [],
  async enviarDatos(data) {
    set({ loading: true })
    try {
      const response = await fetch('api/mesa/set-valor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => response.json())

      if (response.error) {
        notifications.show({
          message: response.error,
          color: 'red',
        })
      } else {
        notifications.show({
          message: 'Guardado correctamente',
          color: 'green',
        })
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error)
    }
    set({ loading: false })
  },
  setResultados: (resultados) => {
    set({ resultados })
  },
  getResults: (id_zona: string, id_puesto: string, numero_mesa: number) => {
    const resultado = get().resultados.find(
      (res) =>
        res.id_zona === id_zona &&
        res.id_puesto === id_puesto &&
        res.numero_mesa === numero_mesa
    )
    return resultado
  },
}))

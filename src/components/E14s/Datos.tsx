import { Badge, Button, Flex, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useResults } from '../useResults'

type FormProps = {
  diago: number
  hp: number
}

export const DatosMesa = ({
  id_zona,
  id_puesto,
  numero_mesa,
}: {
  id_zona: string
  id_puesto: string
  numero_mesa: number
}) => {
  const { enviarDatos, loading, getResults, resultados } = useResults()

  const form = useForm<FormProps>({
    initialValues: {
      diago: 0,
      hp: 0,
    },
  })

  useEffect(() => {
    const results = getResults(id_zona, id_puesto, numero_mesa)
    if (resultados.length > 0 && results) {
      form.setValues({
        diago: results.diago,
        hp: results.hp,
      })
    }
  }, [resultados])

  const handleSubmit = async ({ diago, hp }: FormProps) => {
    enviarDatos({
      id_zona,
      id_puesto,
      numero_mesa,
      diago,
      hp,
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={'column'} gap={'xs'} align={'center'}>
        <Flex gap={'xs'}>
          <NumberInput label="Diago" {...form.getInputProps('diago')} />
          <NumberInput label="Muñoz" {...form.getInputProps('hp')} />
        </Flex>

        <>
          {form.getInputProps('diago').value === 0 &&
          form.getInputProps('hp').value === 0 ? (
            <Badge color="gray">{'NO REGISTRA'}</Badge>
          ) : form.getInputProps('diago').value >
            form.getInputProps('hp').value ? (
            <Badge color="green">{'GANA'}</Badge>
          ) : form.getInputProps('diago').value ===
            form.getInputProps('hp').value ? (
            <Badge color="yellow">{'IGUALES'}</Badge>
          ) : (
            <Badge color="red">{'PIERDE'}</Badge>
          )}
        </>
        <Button w={300} loading={loading} type="submit">
          {'Guardar'}
        </Button>
      </Flex>
    </form>
  )
}

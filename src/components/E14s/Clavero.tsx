import { Flex, Image, Loader, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useCropModal } from '../CropModal'
import { getCroppedAndRotatedImg } from './imageTools'

type ClaveroProps = {
  id_zona: string
  id_puesto: string
  mesa_numero: number
}
export const Clavero = ({ id_zona, id_puesto, mesa_numero }: ClaveroProps) => {
  const src = `/CLAVEROS/IMG/${id_zona}-${id_puesto}-${mesa_numero}.png`

  const [cortada, setCortada] = useState('')
  const [loading, setLoading] = useState(false)
  const { finalCroppedAreaPixels, open } = useCropModal()

  const cortarImagen = async () => {
    setLoading(true)
    try {
      setCortada(await getCroppedAndRotatedImg(src, finalCroppedAreaPixels))
    } catch (error) {}
    setLoading(false)
  }

  useEffect(() => {
    if (src != '') {
      cortarImagen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, finalCroppedAreaPixels])

  if (loading)
    return (
      <Flex h={'50vh'} gap={10} align={'center'} justify={'center'}>
        <Loader color="blue" type="dots" />
        <Text>Cortando imagen...</Text>
      </Flex>
    )
  return (
    <Flex p={'xs'} m={'lg'} direction={'column'} align={'center'}>
      <Image
        radius="md"
        onClick={() => open(src)}
        mah="50vh"
        fit="contain"
        src={cortada}
      />
      <Text>{'Claveros'}</Text>
    </Flex>
  )
}

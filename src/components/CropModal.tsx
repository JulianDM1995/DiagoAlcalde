import { Box, Button, Modal, Slider, Text } from '@mantine/core'
import Cropper, { Area } from 'react-easy-crop'
import { create } from 'zustand'

export type Crop = {
  x: number
  y: number
}

type CropModalProps = {
  opened: boolean
  open: (image: string) => void
  close: () => void

  image: string
  setImage: (image: string) => void
  crop: Crop
  setCrop: (crop: Crop) => void
  rotation: number
  setRotation: (rotation: number) => void
  zoom: number
  setZoom: (zoom: number) => void
  ratio: number
  setRatio: (ratio: number) => void
  croppedAreaPixels: Area
  setCroppedAreaPixels: (croppedAreaPixels: Area) => void
  finalCroppedAreaPixels: Area
  setFinalCroppedAreaPixels: () => void
}

export const useCropModal = create<CropModalProps>((set, get) => ({
  opened: false,
  open: (image) => set({ opened: true, image }),
  close: () => set({ opened: false }),

  setImage: (image) => set({ image }),
  setCrop: (crop) => set({ crop }),
  setRotation: (rotation) => set({ rotation }),
  setZoom: (zoom) => set({ zoom }),
  setCroppedAreaPixels: (croppedAreaPixels) => set({ croppedAreaPixels }),
  setFinalCroppedAreaPixels: () =>
    set({ finalCroppedAreaPixels: get().croppedAreaPixels }),
  image: '',
  crop: { x: 0, y: 0 },
  rotation: 0,
  zoom: 1,
  croppedAreaPixels: { x: 0, y: 0, width: 0, height: 0 },
  finalCroppedAreaPixels: { x: 0, y: 0, width: 0, height: 0 },
  ratio: 0.5,
  setRatio: (ratio) => set({ ratio }),
}))

export const CropModal = () => {
  const {
    image,
    opened,
    close,
    crop,
    setCrop,
    rotation,
    setRotation,
    zoom,
    setZoom,
    setFinalCroppedAreaPixels,
    setCroppedAreaPixels,
    ratio,
    setRatio,
  } = useCropModal()

  return (
    <Modal
      size="xl"
      centered
      overlayProps={{ blur: 3 }}
      opened={opened}
      onClose={close}
    >
      <Box
        mt="xs"
        style={{
          position: 'relative',
          width: '100%',
          height: '50vh',
          background: '#333',
        }}
      >
        <Cropper
          maxZoom={10}
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={10 * Math.pow(ratio, 3.3209)}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={(_croppedArea, croppedAreaPixels) =>
            setCroppedAreaPixels(croppedAreaPixels)
          }
          onZoomChange={setZoom}
          objectFit="contain"
        />
      </Box>

      <Box my="md">
        <Text size="sm">{'Relación de aspecto'}</Text>
        <Slider
          size="lg"
          step={0.01}
          value={ratio}
          onChange={setRatio}
          defaultValue={0.5}
          min={0}
          max={1}
        />
      </Box>
      <Button fullWidth onClick={setFinalCroppedAreaPixels}>
        {'Cortar imagen'}
      </Button>
    </Modal>
  )
}

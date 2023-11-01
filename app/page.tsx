'use client'
import { CropModal } from '@/src/components/CropModal'
import { E14s } from '@/src/components/E14s'
import { useResults } from '@/src/components/useResults'
import { descargarCSV } from '@/src/utils/crearMatriz'

import { AppShell, Button, Container } from '@mantine/core'

export default function Home() {
  const { zonas } = useResults()

  return (
    <AppShell bg={'gray.2'} padding="md">
      <AppShell.Header p={'lg'}>
        <Button
          onClick={() => {
            if (zonas) {
              descargarCSV(zonas)
            }
          }}
        >
          {'Descargar CSV'}
        </Button>
      </AppShell.Header>
      <AppShell.Main>
        <Container>
          <CropModal />
          <E14s />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

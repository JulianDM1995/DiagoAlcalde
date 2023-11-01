'use client'
import { CropModal } from '@/src/components/CropModal'
import { E14s } from '@/src/components/E14s'

import { AppShell, Container } from '@mantine/core'

export default function Home() {
  return (
    <AppShell bg={'gray.2'} padding="md">
      <AppShell.Main>
        <Container>
          <CropModal />
          <E14s />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

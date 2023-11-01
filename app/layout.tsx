import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export const metadata = {
  title: 'Diago Alcalde ',
  description: 'Analizador de formularios E-14 para ayudar al profe Diago',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Poppins, Geist_Mono, Dancing_Script, Playwrite_HU } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const playwriteHU = Playwrite_HU({
  variable: '--font-playwrite-hu',
  weight: ['100', '400'],
})

export const metadata: Metadata = {
  title: 'T0m4s1n portfolio',
  description: 'Portafolio personal de Tomasin: proyectos, experiencia y contacto.',
  icons: {
    icon: '/flower.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} ${dancingScript.variable} ${playwriteHU.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

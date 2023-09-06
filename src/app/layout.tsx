import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import * as React from 'react';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FoodEvide',
  description: 'Find Best Places Near You',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <head>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"/>

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

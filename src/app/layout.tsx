import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import * as React from 'react';
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FoodEvide',
  description: 'Find Best Places Near You',
  manifest: '/manifest.json',
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
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />

      </head>
      <body className={inter.className}>
      <NextTopLoader
        color="#DE6737"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
      />
        {children}</body>
     
    </html>
  )
}

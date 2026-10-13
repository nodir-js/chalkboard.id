import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://kiy24.uz'),
  other: {
    'sitemaps': '/sitemap.xml',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
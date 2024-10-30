import localFont from "next/font/local";
import "../styles/globals.scss";

import { draftMode } from "next/headers";
import { VisualEditing } from 'next-sanity'
import { SanityLive } from '@/sanity/client'
import { LiveErrorBoundary } from "./live-error-boundary";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <title>vaporvee's Website</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <LiveErrorBoundary>
          <SanityLive />
        </LiveErrorBoundary>
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}

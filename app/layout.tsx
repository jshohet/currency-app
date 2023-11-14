import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from './components/ThemeProvider'


export const metadata: Metadata = {
  title: "Exchange Global",
  description:
    "Exchange Global is a sleek, fast way to look up rates for almost any currency, including crypto.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

// Update the font configuration to properly specify weights
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cecilia Marçal | Frontend Developer",
  description: "Portfolio of Cecilia Marçal, Junior Frontend Developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen bg-background font-sans antialiased">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
        </ThemeProvider>
        <Analytics trackingId="G-3B78KWSP0R" />
      </body>
    </html>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-primary">
          CM
        </a>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-foreground/80 hover:text-primary transition-colors">
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

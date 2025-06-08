// Delete this entire file and replace with a simple navigation dots component

"use client"

import React, { useState, useEffect } from "react"

export function NavigationDots() {
  const [activeSection, setActiveSection] = useState("hero")

  const sections = React.useMemo(() => [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ], [])

  useEffect(() => {
    const handleScroll = () => {

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`w-3 h-3 rounded-full transition-all ${
            activeSection === section.id
              ? "bg-primary scale-125"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          }`}
          aria-label={`Go to ${section.label}`}
        />
      ))}
    </div>
  )
}

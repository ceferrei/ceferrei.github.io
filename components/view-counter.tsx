"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { motion } from "framer-motion"

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Função para incrementar visualizações
    const incrementViews = () => {
      try {
        // Verificar se já visitou hoje
        const lastVisit = localStorage.getItem("lastVisit")
        const today = new Date().toDateString()

        // Obter contagem atual
        let currentViews = Number(localStorage.getItem("portfolioViews") || "0")

        // Se for uma nova visita hoje, incrementar
        if (lastVisit !== today) {
          currentViews += 1
          localStorage.setItem("portfolioViews", currentViews.toString())
          localStorage.setItem("lastVisit", today)
        }

        setViews(currentViews)
      } catch (error) {
        console.error("Error with view counter:", error)
        setViews(0)
      } finally {
        setIsLoading(false)
      }
    }

    // Simular um pequeno atraso para mostrar o loading
    setTimeout(() => {
      incrementViews()
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <motion.div
      className="flex items-center gap-2 text-muted-foreground"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Eye className="h-4 w-4" />
      <span className="text-sm">{views?.toLocaleString() || "0"} views</span>
    </motion.div>
  )
}

"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface DepthCardProps {
  children: ReactNode
  className?: string
  depth?: number
  hoverScale?: number
}

export function DepthCard({ children, className = "", depth = 3, hoverScale = 1.02 }: DepthCardProps) {
  return (
    <motion.div
      className={`${className} transition-shadow duration-300`}
      whileHover={{
        scale: hoverScale,
        boxShadow: `0 ${depth * 5}px ${depth * 10}px rgba(0, 0, 0, 0.1)`,
        zIndex: 10,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}

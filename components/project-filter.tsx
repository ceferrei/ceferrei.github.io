"use client"

import type React from "react"
import { motion } from "framer-motion"

interface ProjectFilterProps {
  categories: string[]
  onFilterChange: (category: string) => void
  activeCategory: string
}

export function ProjectFilter({ categories, onFilterChange, activeCategory }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <FilterButton key={category} active={category === activeCategory} onClick={() => onFilterChange(category)}>
          {category}
        </FilterButton>
      ))}
    </div>
  )
}

interface FilterButtonProps {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}

function FilterButton({ children, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active ? "text-white" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {active && (
        <motion.span
          layoutId="activeFilter"
          className="absolute inset-0 bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LocationPreviewProps {
  children: React.ReactNode
  location: string
  imageSrc: string
}

export function LocationPreview({ children, location, imageSrc }: LocationPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="cursor-pointer hover:text-primary transition-colors underline decoration-dotted">
        {children}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-80">
              {/* Header */}
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{location}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">My current location</p>
              </div>

              {/* Image */}
              <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
                {!imageError ? (
                  <img
                    src={imageSrc || "https://via.placeholder.com/400x300"}
                    alt={`Map showing ${location}`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">🗺️</div>
                      <div className="text-sm font-medium">Braga, Portugal</div>
                      <div className="text-xs opacity-80">Northern Portugal</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-xs text-gray-600 dark:text-gray-300">📍 Northern Portugal, Europe</p>
              </div>

              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

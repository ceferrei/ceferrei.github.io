"use client"

import Image from "next/image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export function LocationTooltip() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer hover:text-primary underline decoration-dotted decoration-primary/50">
          Braga, Portugal
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h4 className="font-semibold text-lg">Braga, Portugal</h4>
          <p className="text-sm opacity-90">Northern Portugal, Europe</p>
        </div>

        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src="/images/braga-location.png"
            alt="Map showing Braga"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center p-2 text-sm text-gray-600">
          📍 My current location in Portugal 🇵🇹
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

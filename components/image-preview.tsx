"use client"

import Image from "next/image"

interface ImagePreviewProps {
  src: string
  title: string
  alt: string
}

export function ImagePreview({ src, alt }: ImagePreviewProps) {
  return (
    <div className="h-[250px] overflow-hidden relative group flex items-center justify-center bg-muted/10">
      <Image
        width={250}
        height={250}
        src={src || "/placeholder.svg"}
        alt={alt}
        className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
      />
    </div>
  )
}

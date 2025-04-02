"use client"

import { useState, useRef, useEffect } from "react"

interface VideoPreviewProps {
  src: string
}

export function VideoPreview({ src }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isHovering) {
      videoElement.play().catch((err) => console.error("Error playing video:", err))
    } else {
      videoElement.pause()
      if (videoElement.currentTime > 0) {
        videoElement.currentTime = 0
      }
    }

    return () => {
      if (videoElement) {
        videoElement.pause()
      }
    }
  }, [isHovering])

  return (
    <div className="video-container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <video ref={videoRef} src={src} muted loop playsInline className="w-full h-full object-cover" />
      {!isHovering && (
        <div className="video-overlay">
          <span className="text-sm font-medium bg-black/50 px-3 py-1 rounded-full">Hover to preview</span>
        </div>
      )}
    </div>
  )
}


"use client"

import { useState, useRef, useEffect } from "react"

interface VideoPreviewProps {
  src: string
}

export function VideoPreview({ src }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleError = () => {
      console.error("Error loading video:", src)
      setHasError(true)
    }

    videoElement.addEventListener("error", handleError)

    if (isHovering && !hasError) {
      videoElement.play().catch((err) => {
        console.error("Error playing video:", err)
        setHasError(true)
      })
    } else {
      videoElement.pause()
      if (videoElement.currentTime > 0) {
        videoElement.currentTime = 0
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("error", handleError)
        videoElement.pause()
      }
    }
  }, [isHovering, src, hasError])

  return (
    <div
      className="video-container group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
    >
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-muted/50">
          <p className="text-sm text-muted-foreground">Video preview unavailable</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />

          {!isHovering && (
            <div className="video-overlay">
              <span className="text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                <span className="hidden md:inline">Hover to preview</span>
                <span className="md:hidden">Tap to preview</span>
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

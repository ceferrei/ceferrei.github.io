"use client"

import { useEffect, useState } from "react"

interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenPhrases?: number
}

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1500,
}: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    const timeout = setTimeout(
      () => {
        // Typing
        if (!isDeleting && currentText !== currentPhrase) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1))
          return
        }

        // Delay after typing complete
        if (!isDeleting && currentText === currentPhrase) {
          setTimeout(() => {
            setIsDeleting(true)
          }, delayBetweenPhrases)
          return
        }

        // Deleting
        if (isDeleting && currentText !== "") {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1))
          return
        }

        // Move to next phrase
        if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases])

  return (
    <span className="typing-text">
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  )
}

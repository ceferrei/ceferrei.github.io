import { Button } from "@/components/ui/button"
import { ArrowDown, FileText } from "lucide-react"
import { TypingAnimation } from "./typing-animation"
import Image from "next/image"

export function Hero() {
  const typingPhrases = ["Frontend Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Cecilia Marçal</span>
              <br />
              <TypingAnimation phrases={typingPhrases} />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              I used to improve eyesight, now I&apos;m all about improving websites! Passionate about creating
              beautiful, responsive, and user-friendly web experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#projects">View My Work</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="cv-button">
                <a href="/cecilia-marcal-cv.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> Download CV
                </a>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl animate-float">
              <Image
                width={320}
                height={320}
                src="/profile-final.jpg"
                alt="Cecilia Marçal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="text-primary" size={32} />
          </a>
        </div>
      </div>
    </section>
  )
}

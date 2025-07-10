"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, FileText } from "lucide-react"
import { TypingAnimation } from "./typing-animation"
import Image from "next/image"
import { motion } from "framer-motion"

export function Hero() {
  const typingPhrases = ["Frontend Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-18 xl:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              <motion.span
                className="gradient-text"
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: "100% 0%" }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                style={{
                  backgroundSize: "200% 200%",
                  backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), #a855f7, hsl(var(--primary)))",
                }}
              >
                Cecilia Marçal
              </motion.span>
              <br />
              <TypingAnimation phrases={typingPhrases} />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              I used to improve eyesights, now I&apos;m all about improving websites! Passionate about creating
              beautiful, responsive, and user-friendly web experiences.
            </p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg">
                <a href="#projects">View My Work</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="cv-button">
                <a href="/CeciliaMarcal-JuniorFrontend.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Image
                width={320}
                height={320}
                src="/profile-final.jpg"
                alt="Cecilia Marçal"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="text-primary" size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

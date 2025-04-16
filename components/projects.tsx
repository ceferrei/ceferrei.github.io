"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, X } from "lucide-react"
import { VideoPreview } from "@/components/video-preview"
import { ImagePreview } from "@/components/image-preview"
import { ProjectFilter } from "@/components/project-filter"
import { motion, AnimatePresence } from "framer-motion"

// Define project categories
const categories = ["All", "Applications", "UI Components", "Tools"]

// Define project type
interface Project {
  title: string
  description: string
  video?: string
  image?: string
  tags: string[]
  github: string
  demo: string
  category: string
  complexity: number // 1-10 scale for sorting
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
const [isModalOpen, setIsModalOpen] = useState(false)


  // Define projects with categories and complexity
  const allProjects: Project[] = [
    {
      title: "Plant Care App",
      description:
        "An application to help users track and manage their plant care routines with watering schedules and care tips.",
      video: "/videos/PlantCare.mp4",
      tags: ["React", "State Management", "UI/UX"],
      github: "https://github.com/ceferrei/Plant-Care-react",
      demo: "https://plant-care-react-n3h8.vercel.app/",
      category: "Applications",
      complexity: 8,
    },
    {
      title: "Eat-N-Split",
      description:
        "An app for splitting bills and tracking expenses among friends, making it easy to manage shared costs.",
      video: "/videos/EatNSplit.mp4",
      tags: ["React", "Calculations", "State Management"],
      github: "https://github.com/ceferrei/eat--N-split-react",
      demo: "https://eat-n-split-react-lilac.vercel.app/",
      category: "Applications",
      complexity: 7,
    },
    {
      title: "Travel List",
      description:
        "An application for creating and managing a travel packing list with features like marking items as packed and sorting options.",
      video: "/videos/travelList.mp4",
      tags: ["React", "State Management", "Sorting"],
      github: "https://github.com/ceferrei/travel-list-react",
      demo: "https://travel-list-react-eight.vercel.app/",
      category: "Applications",
      complexity: 6,
    },
    {
      title: "Tip Calculator",
      description:
        "A calculator app that helps users determine appropriate tip amounts based on bill total and service quality.",
      video: "/videos/tip-calculator.mp4",
      tags: ["React", "Calculations", "Form Handling"],
      github: "https://github.com/ceferrei/tip-calculator-react",
      demo: "https://tip-calculator-react-ivory.vercel.app/",
      category: "Tools",
      complexity: 5,
    },
    {
      title: "Date Calculator",
      description:
        "An interactive date calculator that allows users to calculate dates in the past or future based on a reference date.",
      video: "/videos/dateCounterResult.mp4",
      tags: ["React", "Date Manipulation", "UI/UX"],
      github: "https://github.com/ceferrei/date-counter-react",
      demo: "https://date-counter-react.vercel.app/",
      category: "Tools",
      complexity: 5,
    },
    // {
    //   title: "Interactive Steps Component",
    //   description:
    //     "A UI component that guides users through a multi-step process with navigation buttons and progress indication.",
    //   video: "/videos/steps.mp4",
    //   tags: ["React", "useState", "Component Design"],
    //   github: "https://github.com/ceferrei/steps-component-react",
    //   demo: "https://github.com/user-attachments/assets/dcdc0696-a85e-4b48-89b7-7b80af0a9eb6",
    //   category: "UI Components",
    //   complexity: 4,
    // },
    {
      title: "React Accordion Component",
      description:
        "A reusable accordion component built with React that demonstrates state management and component composition.",
      video: "/videos/accordion.mp4",
      tags: ["React", "useState", "Component Design"],
      github: "https://github.com/ceferrei/accordion-component-react",
      demo: "https://accordion-component-react-gamma.vercel.app/",
      category: "UI Components",
      complexity: 4,
    },
    {
      title: "React Flashcards",
      description:
        "A flashcard application that displays questions and reveals answers when clicked, using React Hooks for state management.",
      video: "/videos/flashcards.mp4",
      tags: ["React", "useState", "CSS Grid"],
      github: "https://github.com/ceferrei/flashcards-react",
      demo: "https://flashcards-react-rho.vercel.app/",
      category: "UI Components",
      complexity: 3,
    },
    {
      title: "Bug-Free Pizza",
      description:
        "A React application that displays a menu for a fictional pizzeria with features like indicating sold-out items and showing opening hours.",
      image: "/pizza-menu.jpg",
      tags: ["React", "CSS"],
      github: "https://github.com/ceferrei/pizza-menu-react",
      demo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-menu-result.jpg-ArF8UC9BNW67AuXEvnC8tlFKNcWpg1.jpeg",
      category: "UI Components",
      complexity: 2,
    },
    {
      title: "React Profile Card",
      description:
        "An interactive profile card that displays personal information and skills with proficiency indicators.",
      image: "/profile-card-result.jpg",
      tags: ["React", "CSS", "Responsive Design"],
      github: "https://github.com/ceferrei/profile-card-react",
      demo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-card-result.jpg-xygq3KGU1mx0ftFRkKDMgzDH2iA8IQ.jpeg",
      category: "UI Components",
      complexity: 2,
    },
  ]

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All" ? allProjects : allProjects.filter((project) => project.category === activeCategory)

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-18 xl:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          My <span className="text-primary">Projects</span>
        </h2>

        <ProjectFilter categories={categories} activeCategory={activeCategory} onFilterChange={handleCategoryChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="project-card overflow-hidden flex flex-col h-full">
                  {project.video ? (
                    <div className="relative group">
                      <VideoPreview src={project.video} />
                      <button
                        onClick={() => {
  setSelectedVideo(project.video!)
  setIsModalOpen(true)
}}

                        className="absolute top-2 right-2 bg-muted p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </button>
                    </div>
                  ) : project.image ? (
                    <ImagePreview src={project.image || "/placeholder.svg"} title={project.title} alt={project.title} />
                  ) : null}

                  <CardHeader className="flex-grow">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={project.image ? "image-demo-link" : ""}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {isModalOpen && selectedVideo && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
    <div className="relative w-full max-w-5xl mx-auto p-4">
      {/* Botão de fechar com ícone */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsModalOpen(false)
          setSelectedVideo(null)
        }}
        className="absolute z-20 -top-8 right-4 text-black bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
        aria-label="Fechar modal"
      >
        <X className="w-5 h-5" />
      </button>
      <video
        src={selectedVideo}
        controls
        autoPlay
        className="w-full h-auto rounded-xl shadow-2xl"
      />
    </div>
  </div>
)}


    </section>
  )
}

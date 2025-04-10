import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { VideoPreview } from "./video-preview"
import Image from "next/image"


export function Projects() {
  const projects = [
    {
      title: "Interactive Steps Component",
      description:
        "A UI component that guides users through a multi-step process with navigation buttons and progress indication.",
      video: "/videos/steps.mp4",
      tags: ["React", "useState", "Component Design"],
      github: "https://github.com/ceferrei/steps-component-react",
      demo: "/videos/steps.mp4",
    },
    {
      title: "Bug-Free Pizza",
      description:
        "A React application that displays a menu for a fictional pizzeria with features like indicating sold-out items and showing opening hours.",
      image: "/pizza-menu.jpg",
      tags: ["React", "CSS"],
      github: "https://github.com/ceferrei/pizza-menu-react",
      demo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-menu-result.jpg-ArF8UC9BNW67AuXEvnC8tlFKNcWpg1.jpeg", // Direct link to the image blob URL
    },
    {
      title: "React Accordion Component",
      description:
        "A reusable accordion component built with React that demonstrates state management and component composition.",
      video: "/videos/accordion.mp4",
      tags: ["React", "useState", "Component Design"],
      github: "https://github.com/ceferrei/accordion-component-react",
      demo: "/videos/accordion.mp4",
    },
    {
      title: "Date Calculator",
      description:
        "An interactive date calculator that allows users to calculate dates in the past or future based on a reference date.",
      video: "/videos/dateCounter.mp4",
      tags: ["React", "Date Manipulation", "UI/UX"],
      github: "https://github.com/ceferrei/date-counter-react",
      demo: "/videos/dateCounterResult.mp4",
    },
    {
      title: "React Flashcards",
      description:
        "A flashcard application that displays questions and reveals answers when clicked, using React Hooks for state management.",
      video: "/videos/flashcards.mp4",
      tags: ["React", "useState", "CSS Grid"],
      github: "https://github.com/ceferrei/flashcards",
      demo: "/videos/flashcards.mp4",
    },
    {
      title: "React Profile Card",
      description:
        "An interactive profile card that displays personal information and skills with proficiency indicators.",
      image: "/profile-card-result.jpg",
      tags: ["React", "CSS", "Responsive Design"],
      github: "https://github.com/ceferrei/profile-card-react",
      demo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-card-result.jpg-xygq3KGU1mx0ftFRkKDMgzDH2iA8IQ.jpeg", // Direct link to the image blob URL
    },
    {
      title: "Travel List",
      description:
        "An application for creating and managing a travel packing list with features like marking items as packed and sorting options.",
      video: "/videos/travelList.mp4",
      tags: ["React", "State Management", "Sorting"],
      github: "https://github.com/ceferrei/travel-list-react",
      demo: "/videos/travelList.mp4",
    },
    {
      title: "Tip Calculator",
      description:
        "A tip calculator that allows users to calculate the amount of tip they should leave based on the total amount of the bill and the percentage of tip they want to leave",
      video: "/videos/tip-calculator.mp4",
      tags: ["React", "State Management", "Lifting State"],
      github: "https://github.com/ceferrei/tip-calculator-react",
      demo: "/videos/tip-calculator.mp4",
    },
    {
      title: "Eat-'N-Split",
      description:
        "A React application designed to help you easily split bills with friends and keep track of who owes whom.",
      video: "/videos/EatNSplit.mp4",
      tags: ["React", "State Management", "Lifting State"],
      github: "https://github.com/ceferrei/eat--N-split-react.git",
      demo: "/videos/EatNSplit.mp4",
    },
    {
      title: "Plant Care",
      description:
        "A React application to manage your houseplants, track watering schedules, and store care notes. Perfect for anyone looking to organize and streamline plant maintenance.",
      video: "/videos/PlantCare.mp4",
      tags: ["React", "State Management", "Lifting State"],
      github: "https://github.com/ceferrei/Plant-Care-react",
      demo: "/videos/PlantCare.mp4",
    },
  ]
  

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-primary">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="project-card overflow-hidden flex flex-col">
              {project.video ? (
                <VideoPreview src={project.demo} />
              ) : (
                <div className="h-[250px] overflow-hidden flex items-center justify-center bg-muted/10">
                  <Image width={250} height={250}
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain transition-transform hover:scale-105"
                  />
                </div>
              )}
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
          ))}
        </div>
      </div>
    </section>
  )
}


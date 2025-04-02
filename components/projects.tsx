import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { VideoPreview } from "./video-preview"

export function Projects() {
  const projects = [
    {
      title: "Interactive Steps Component",
      description:
        "A UI component that guides users through a multi-step process with navigation buttons and progress indication.",
      video: "/videos/steps.mp4",
      tags: ["React", "useState", "Component Design"],
      github: "https://github.com/ceferrei/steps-component-react",
      demo: "https://github-production-user-asset-6210df.s3.amazonaws.com/116651825/429585945-dcdc0696-a85e-4b48-89b7-7b80af0a9eb6.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250402T201802Z&X-Amz-Expires=300&X-Amz-Signature=27bcf91017e5bc725db4b19ff805640444741c56e6b397b51be34cb7fe488a74&X-Amz-SignedHeaders=host",
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
      demo: "https://github-production-user-asset-6210df.s3.amazonaws.com/116651825/429568851-1ebcf0da-97d7-40f5-95b6-9a453b73c62b.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250402T201923Z&X-Amz-Expires=300&X-Amz-Signature=c6eae33273b56ff18775eed307cacca208909b95e724b93a4102d821f2f91c54&X-Amz-SignedHeaders=host",
    },
    {
      title: "Date Calculator",
      description:
        "An interactive date calculator that allows users to calculate dates in the past or future based on a reference date.",
      video: "/videos/dateCounter.mp4",
      tags: ["React", "Date Manipulation", "UI/UX"],
      github: "https://github.com/ceferrei/date-counter-react",
      demo: "https://github-production-user-asset-6210df.s3.amazonaws.com/116651825/427713936-a78eea6f-a5fa-41d9-a0ef-720e9720ecab.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250402T201948Z&X-Amz-Expires=300&X-Amz-Signature=d15d1ef12c55eab6e700e5a46964558ac952785f50dbc5072193a5ee0f5946a9&X-Amz-SignedHeaders=host",
    },
    {
      title: "React Flashcards",
      description:
        "A flashcard application that displays questions and reveals answers when clicked, using React Hooks for state management.",
      video: "/videos/flashcards.mp4",
      tags: ["React", "useState", "CSS Grid"],
      github: "https://github.com/ceferrei/flashcards",
      demo: "https://github.com/user-attachments/assets/d7214f43-9ef2-40ff-b23f-b23b6182eda1",
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
      demo: "https://github-production-user-asset-6210df.s3.amazonaws.com/116651825/428784484-b47d1704-77a6-459b-83b2-5edc612292a8.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250402T202012Z&X-Amz-Expires=300&X-Amz-Signature=d136c390614f803eb39843be2a0612e4ef98e50503ebf41dce75ad35d8fa0947&X-Amz-SignedHeaders=host",
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
                <div className="h-[250px] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
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


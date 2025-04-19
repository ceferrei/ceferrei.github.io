import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { NavigationDots } from "@/components/custom-fullpage"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <NavigationDots />

      <section id="hero">
        <Hero />
      </section>

      <section id="about" >
        <About />
      </section>

      <section id="skills" >
        <Skills />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </main>
  )
}

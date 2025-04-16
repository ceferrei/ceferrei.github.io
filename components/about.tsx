import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-18 xl:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">My Story</h3>
            <p className="text-muted-foreground">
              I hold a Master&apos;s degree in Advanced Optometry and have transitioned to a career in programming. With
              a year and a half of professional experience, I am now focused on specializing as a Frontend Developer,
              with an emphasis on Javascript and React technologies.
            </p>
            <p className="text-muted-foreground">
              I&apos;m eager to explore new technologies and open to embracing fresh opportunities in the field. My
              background in optometry has given me a unique perspective on user experience and accessibility.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Briefcase className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Work Experience</h4>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h5 className="font-medium">Frontend Developer</h5>
                        <p className="text-sm text-muted-foreground">
                          Neadvance: Machine Vision for Industry 4.0 | Sep 2023 - Present
                        </p>
                        <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                          <li>Developed web applications with ReactJS, NextJS, and React Native</li>
                          <li>Created interfaces for AI-powered platforms</li>
                          <li>Implemented testing with Jest and Playwright</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <GraduationCap className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Education</h4>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h5 className="font-medium">42Porto - Programming Academy</h5>
                        <p className="text-sm text-muted-foreground">2022 - 2023</p>
                      </div>
                      <div>
                        <h5 className="font-medium">CESAE - Software Developer</h5>
                        <p className="text-sm text-muted-foreground">1000h - Mar 2023</p>
                      </div>
                      <div>
                        <h5 className="font-medium">The Web Developer Bootcamp 2024</h5>
                        <p className="text-sm text-muted-foreground">70h - 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


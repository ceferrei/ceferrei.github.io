"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, MapPin } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { DepthCard } from "./depth-card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function About() {
  return (
    <AnimatedSection id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-18 xl:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection direction="right" delay={0.2}>
            <div className="journey-container relative">
              {/* Journey Timeline */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="bg-gradient-to-r from-primary/20 to-purple-300/20 p-6">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <MapPin className="text-primary h-6 w-6" />
                    My Journey
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-8">
                    {/* Current */}
                    <div className="relative pl-8">
                      {/* Círculo */}
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary z-10"></div>

                      {/* Linha que começa no centro da bola e vai para baixo */}
                      <div className="absolute left-[-1px] top-4 w-0 h-[calc(100%+16px)] border-l-2 border-primary"></div>

                      <div className="mb-1 text-sm text-primary font-medium">Present</div>
                      <h4 className="text-lg font-medium">Frontend Developer</h4>
                      <p className="text-muted-foreground text-sm">
                        Specialized in React and Next.js, with experience in creating responsive interfaces and testing.
                        Open to explore any frontend technologies and frameworks.
                      </p>
                    </div>

                    {/* Learning */}
                    <div className="relative pl-8">
                      {/* Círculo */}
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary/60 z-10"></div>

                      {/* Linha que começa no centro da bola e vai para baixo */}
                      <div className="absolute left-[-1px] top-4 w-0 h-[calc(100%+16px)] border-l-2 border-primary/60"></div>

                      <div className="mb-1 text-sm text-primary/80 font-medium">2023 - Present</div>
                      <h4 className="text-lg font-medium">Continuous Learning</h4>
                      <p className="text-muted-foreground text-sm">
                        Enhancing my skills through &ldquo;The Ultimate React Course 2025&rdquo; and other resources.
                        Always exploring new technologies and opportunities.
                      </p>
                    </div>

                    {/* Career Start */}
                    <div className="relative pl-8">
                      {/* Círculo */}
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary/30 z-10"></div>

                      {/* Última linha não precisa continuar para baixo */}
                      <div className="absolute left-[-1px] top-4 w-0 h-[calc(100%-4px)] border-l-2 border-primary/30"></div>

                      <div className="mb-1 text-sm text-primary/60 font-medium">2022 - 2023</div>
                      <h4 className="text-lg font-medium">Career Transition</h4>
                      <p className="text-muted-foreground text-sm">
                        Completed programming courses and built a strong foundation in web development through intensive
                        training programs.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Current Focus
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript", "Tailwind CSS", "Jest", "Playwright"].map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-primary/5 hover:bg-primary/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection direction="left" delay={0.3}>
              <DepthCard>
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Briefcase className="text-primary h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-4">Work Experience</h4>
                        <div className="space-y-4">
                          <div className="border-l-2 border-primary/20 pl-4">
                            <h5 className="font-medium text-foreground">Frontend Developer</h5>
                            <p className="text-xs text-muted-foreground mb-2">Sep 2023 - Present</p>
                            <p className="text-xs text-muted-foreground mb-2">
                              Started as a 3-month intern and was hired full-time.
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• ReactJS, TypeScript,  NextJS, React Native development</li>
                              <li>• AI-powered platform interfaces</li>
                              <li>• WebSockets & FastAPI integration</li>
                              <li>• Jest & Playwright testing</li>
                              <li>• Tailwind CSS for styling and responsive design</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DepthCard>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.4}>
              <DepthCard>
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <GraduationCap className="text-primary h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-4">Education</h4>
                        <div className="space-y-3">
                          <div className="border-l-2 border-primary/20 pl-4">
                            <h5 className="font-medium">The Ultimate React Course 2025</h5>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                          </div>
                          <div className="border-l-2 border-primary/20 pl-4">
                            <h5 className="font-medium">The Web Developer Bootcamp 2024</h5>
                            <p className="text-sm text-muted-foreground">Completed</p>
                          </div>
                          <div className="border-l-2 border-primary/20 pl-4">
                            <h5 className="font-medium">CESAE - Software Developer</h5>
                            <p className="text-sm text-muted-foreground">1000h - Completed Mar 2023</p>
                            <p className="text-xs text-muted-foreground">
                              Web & Mobile Programming, C#, Android, iOS, HTML, CSS, JS
                            </p>
                          </div>
                          <div className="border-l-2 border-primary/20 pl-4">
                            <h5 className="font-medium">42Porto - Programming Academy</h5>
                            <p className="text-sm text-muted-foreground">2022 - 2023</p>
                            <p className="text-xs text-muted-foreground">Collaborative programming projects, C</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DepthCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

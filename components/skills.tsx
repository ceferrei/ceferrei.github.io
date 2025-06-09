"use client"

import { AnimatedSection } from "./animated-section"
import { motion } from "framer-motion"

export function Skills() {
  const skills = [
    { name: "JavaScript", level: "Advanced", color: "green" },
    { name: "ReactJS", level: "Advanced", color: "green" },
    { name: "HTML/CSS", level: "Advanced", color: "green" },
    { name: "NextJS", level: "Intermediate", color: "green" },
    { name: "TailwindCSS", level: "Advanced", color: "green" },
    { name: "React Native", level: "Intermediate", color: "blue" },
    { name: "C#", level: "Intermediate", color: "blue" },
    { name: "Playwright", level: "Intermediate", color: "blue" },
    { name: "Java", level: "Intermediate", color: "blue" },
    { name: "Jest", level: "Intermediate", color: "blue" },
    { name: "Python", level: "Beginner", color: "orange" },
    { name: "C/C++", level: "Intermediate", color: "orange" },
  ]

  const languages = [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "C2" },
    { name: "French", level: "B2" },
  ]

  interface Skill {
    name: string;
    color: string;
  }

  // Função para criar animação uniforme para todas as skills
  const createSkillAnimation = (skill: Skill, index: number) => (
    <motion.div
      key={skill.name}
      className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor:
          skill.color === "green"
            ? "rgba(52, 211, 153, 0.2)"
            : skill.color === "blue"
              ? "rgba(59, 130, 246, 0.2)"
              : "rgba(249, 115, 22, 0.2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 * index,
        duration: 0.2,
        hover: { duration: 0.15 },
      }}
    >
      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
      <div className={`w-2 h-2 rounded-full bg-${skill.color}-500`}></div>
    </motion.div>
  )

  return (
    <AnimatedSection id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-18 xl:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection direction="right" delay={0.2}>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>

            {/* Skills arranged in rows like the image */}
            <div className="space-y-3 mb-8">
              {/* Row 1 */}
              <div className="flex flex-wrap gap-3">
                {skills.slice(0, 4).map((skill, index) => createSkillAnimation(skill, index))}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap gap-3">
                {skills.slice(4, 8).map((skill, index) => createSkillAnimation(skill, index + 4))}
              </div>

              {/* Row 3 */}
              <div className="flex flex-wrap gap-3">
                {skills.slice(8).map((skill, index) => createSkillAnimation(skill, index + 8))}
              </div>
            </div>

            {/* Legend exactly like the model */}
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">Beginner</span>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.3}>
            <h3 className="text-2xl font-semibold mb-6">Languages</h3>
            <div className="space-y-4">
              {languages.map((language, index) => (
                <motion.div
                  key={language.name}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index + 0.3, duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(236, 72, 153, 0.05)",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                  }}
                >
                  <span className="font-medium">{language.name}</span>
                  <motion.span
                    className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    {language.level}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  )
}

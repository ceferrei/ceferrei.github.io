export function Skills() {
  const skills = [
    { name: "JavaScript", level: "Advanced", emoji: "👍" },
    { name: "ReactJS", level: "Advanced", emoji: "👍" },
    { name: "HTML/CSS", level: "Advanced", emoji: "🔥" },
    { name: "NextJS", level: "Intermediate", emoji: "😊" },
    { name: "React Native", level: "Intermediate", emoji: "🔥" },
    { name: "TailwindCSS", level: "Advanced", emoji: "👍" },
    { name: "C#", level: "Intermediate", emoji: "👍" },
    { name: "C/C++", level: "Intermediate", emoji: "👍" },
    { name: "Java", level: "Intermediate", emoji: "👍" },
    { name: "Python", level: "Beginner", emoji: "👍" },
    { name: "Jest", level: "Intermediate", emoji: "👍" },
    { name: "Playwright", level: "Intermediate", emoji: "👍" },
  ]

  const languages = [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "C2" },
    { name: "French", level: "B2" },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-badge bg-secondary text-secondary-foreground px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <span>{skill.name}</span>
                  <span>{skill.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Languages</h3>
            <div className="space-y-4">
              {languages.map((language) => (
                <div key={language.name} className="flex items-center justify-between">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{language.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


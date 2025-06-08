"use client"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Linkedin, Send, CheckCircle } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { DepthCard } from "./depth-card"
import { motion } from "framer-motion"

export function Contact() {
  const [state, handleSubmit] = useForm("mldnjewp")

  if (state.succeeded) {
    return (
      <AnimatedSection id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              className="max-w-md mx-auto bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 p-8 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
              <p>Your message has been sent successfully. I&apos;ll get back to you soon!</p>
              <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
                Send Another Message
              </Button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    )
  }

  return (
    <AnimatedSection id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-18 xl:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Have a question or want to work together? Reach out to me!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection direction="right" delay={0.2} className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <DepthCard>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">cecilia.marcal@outlook.com</p>
                    </div>
                  </CardContent>
                </Card>
              </DepthCard>

              <DepthCard>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Braga, Portugal</p>
                    </div>
                  </CardContent>
                </Card>
              </DepthCard>

              <DepthCard>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Linkedin className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/in/cecilia-marcal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        linkedin.com/in/cecilia-marcal
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </DepthCard>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.3}>
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            <DepthCard>
              <Card className="overflow-hidden border-none shadow-md">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="contact-input"
                        disabled={state.submitting}
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Your email"
                        className="contact-input"
                        disabled={state.submitting}
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Your message"
                        rows={5}
                        className="contact-input"
                        disabled={state.submitting}
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button type="submit" disabled={state.submitting} className="w-full rounded-full">
                        {state.submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {state.errors && Object.keys(state.errors).length > 0 && (
                      <div className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-md text-center">
                        Please check the form for errors and try again.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </DepthCard>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  )
}

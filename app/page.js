'use client'
import HeroSection from '../components/HeroSection'
import {
  FadeIn,
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  HoverLift,
  FloatingElement
} from '../components/AnimatedComponents'
import { motion } from 'framer-motion'

export default function Home() {
  const features = [
    {
      icon: "🏛️",
      title: "Government Integration",
      description: "Seamlessly connect with local government systems for faster issue resolution and real-time status updates."
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description: "Report issues on-the-go with our responsive design that works perfectly on all devices."
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Get instant updates when your reports are reviewed, assigned, or resolved by authorities."
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Track community issues with detailed analytics and insights for better civic engagement."
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Vote on issues, add supporting evidence, and collaborate with neighbors for stronger impact."
    },
    {
      icon: "🔒",
      title: "Privacy Protected",
      description: "Your data is secure with end-to-end encryption and privacy-first design principles."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with modern technology and user experience in mind,
                our platform makes civic engagement simple and effective.
              </p>
            </div>
          </RevealOnScroll>

          <StaggerContainer staggerDelay={0.15}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <HoverLift lift={10} scale={1.03}>
                    <div className="card card-hover text-center h-full">
                      <FloatingElement intensity={5} duration={4 + index}>
                        <div className="text-4xl mb-4">{feature.icon}</div>
                      </FloatingElement>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Making a Real Impact
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Join thousands of citizens who are already making their communities better
              </p>
            </div>
          </RevealOnScroll>

          <StaggerContainer staggerDelay={0.2}>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10,000+", label: "Issues Reported" },
                { number: "8,500+", label: "Issues Resolved" },
                { number: "50+", label: "Cities Connected" },
                { number: "95%", label: "User Satisfaction" }
              ].map((stat, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="glass-dark p-6 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join our community of engaged citizens and help build better,
                more responsive local government.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <HoverLift lift={8} scale={1.05}>
                  <motion.a
                    href="/register"
                    className="btn-primary text-lg px-8 py-4"
                    whileHover={{ boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  >
                    Start Reporting Issues
                  </motion.a>
                </HoverLift>

                <HoverLift lift={8} scale={1.05}>
                  <motion.a
                    href="/dashboard"
                    className="btn-outline text-lg px-8 py-4"
                    whileHover={{ boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)" }}
                  >
                    Explore Dashboard
                  </motion.a>
                </HoverLift>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}

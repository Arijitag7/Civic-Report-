'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FadeIn, 
  ScaleIn, 
  FloatingElement, 
  StaggerContainer, 
  StaggerItem, 
  TypewriterEffect,
  HoverLift 
} from './AnimatedComponents'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-accent-500 to-secondary-500 animate-gradient-xy"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement intensity={30} duration={8}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement intensity={25} duration={10}>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        </FloatingElement>
        <FloatingElement intensity={35} duration={12}>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/8 rounded-full blur-2xl"></div>
        </FloatingElement>
        <FloatingElement intensity={20} duration={9}>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/12 rounded-full blur-xl"></div>
        </FloatingElement>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <StaggerContainer staggerDelay={0.2}>
          {/* Main Title */}
          <StaggerItem>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <TypewriterEffect 
                text="Civic Issue Reporting" 
                speed={100}
                delay={500}
              />
            </motion.h1>
          </StaggerItem>
          
          {/* Subtitle */}
          <StaggerItem>
            <FadeIn delay={2.5} duration={0.8}>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed text-shadow">
                A modern, interactive platform for citizens to report civic issues 
                and track their resolution in real-time. Built with cutting-edge 
                technology for a seamless experience.
              </p>
            </FadeIn>
          </StaggerItem>
          
          {/* Feature Highlights */}
          <StaggerItem>
            <FadeIn delay={3.2} duration={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <ScaleIn delay={3.5}>
                  <div className="glass px-4 py-2 rounded-full text-white/90 text-sm font-medium">
                    ✨ Real-time Updates
                  </div>
                </ScaleIn>
                <ScaleIn delay={3.7}>
                  <div className="glass px-4 py-2 rounded-full text-white/90 text-sm font-medium">
                    🚀 Lightning Fast
                  </div>
                </ScaleIn>
                <ScaleIn delay={3.9}>
                  <div className="glass px-4 py-2 rounded-full text-white/90 text-sm font-medium">
                    🔒 Secure & Private
                  </div>
                </ScaleIn>
              </div>
            </FadeIn>
          </StaggerItem>
          
          {/* Action Buttons */}
          <StaggerItem>
            <FadeIn delay={4.1} duration={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <HoverLift lift={6} scale={1.05}>
                  <Link 
                    href="/register" 
                    className="group relative px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Started</span>
                  </Link>
                </HoverLift>
                
                <HoverLift lift={6} scale={1.05}>
                  <Link 
                    href="/login" 
                    className="px-8 py-4 glass border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </HoverLift>
                
                <HoverLift lift={6} scale={1.05}>
                  <Link 
                    href="/dashboard" 
                    className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold rounded-xl shadow-xl hover:shadow-glow transition-all duration-300"
                  >
                    View Dashboard
                  </Link>
                </HoverLift>
              </div>
            </FadeIn>
          </StaggerItem>
        </StaggerContainer>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

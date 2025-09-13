'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-secondary-200 border-t-secondary-600',
    white: 'border-white/30 border-t-white'
  }
  
  return (
    <div className={`inline-block ${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`} />
  )
}

// Loading Dots Component
export const LoadingDots = ({ color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    white: 'bg-white'
  }
  
  return (
    <div className="flex space-x-1">
      <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`}></div>
      <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
      <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
    </div>
  )
}

// Fade In Animation Component
export const FadeIn = ({ children, delay = 0, duration = 0.5, direction = 'up' }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Scale In Animation Component
export const ScaleIn = ({ children, delay = 0, duration = 0.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Hover Lift Component
export const HoverLift = ({ children, lift = 8, scale = 1.02 }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -lift, 
        scale: scale,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Floating Element Component
export const FloatingElement = ({ children, intensity = 20, duration = 6 }) => {
  return (
    <motion.div
      animate={{
        y: [-intensity/2, intensity/2, -intensity/2],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger Container Component
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger Item Component
export const StaggerItem = ({ children, direction = 'up' }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 }
  }
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: { 
          opacity: 1, 
          y: 0, 
          x: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Page Transition Component
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// Pulse Effect Component
export const PulseEffect = ({ children, scale = 1.05, duration = 2 }) => {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Typewriter Effect Component
export const TypewriterEffect = ({ text, speed = 50, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }
    }, currentIndex === 0 ? delay : speed)
    
    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, delay])
  
  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block"
      >
        |
      </motion.span>
    </span>
  )
}

// Gradient Background Component
export const GradientBackground = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-600',
    hero: 'bg-gradient-to-br from-primary-400 via-accent-500 to-secondary-500',
    mesh: 'bg-mesh-gradient'
  }
  
  return (
    <div className={`${variants[variant]} animate-gradient-xy`}>
      {children}
    </div>
  )
}

// Reveal on Scroll Component
export const RevealOnScroll = ({ children, threshold = 0.1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Mobile-Optimized Hover Component
export const MobileOptimizedHover = ({ children, lift = 4, scale = 1.02 }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{
        y: -lift,
        scale: scale,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Responsive Animation Component
export const ResponsiveAnimation = ({ children, mobileProps = {}, desktopProps = {} }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const props = isMobile ? { ...desktopProps, ...mobileProps } : desktopProps

  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  )
}

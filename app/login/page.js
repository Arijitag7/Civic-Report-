'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  FadeIn,
  ScaleIn,
  HoverLift,
  LoadingSpinner,
  FloatingElement
} from '../../components/AnimatedComponents'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if(!user){
      setError('Invalid credentials')
      setIsLoading(false)
      return
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden">
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
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <FadeIn delay={0.2} duration={0.8}>
          <motion.div
            className="glass rounded-2xl p-8 shadow-2xl border border-white/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <ScaleIn delay={0.4}>
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🔐
                </motion.div>
              </ScaleIn>
              <FadeIn delay={0.6}>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-white/80">Sign in to your account</p>
              </FadeIn>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-red-500/20 border border-red-500/30 text-red-100 p-4 rounded-lg mb-6 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <FadeIn delay={0.8}>
                <div className="relative">
                  <motion.input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                  <motion.div
                    className="absolute left-4 top-4 text-white/60"
                    animate={{
                      x: focusedField === 'email' || email ? -2 : 0,
                      y: focusedField === 'email' || email ? -28 : 0,
                      scale: focusedField === 'email' || email ? 0.8 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    📧
                  </motion.div>
                </div>
              </FadeIn>

              <FadeIn delay={1.0}>
                <div className="relative">
                  <motion.input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                  <motion.div
                    className="absolute left-4 top-4 text-white/60"
                    animate={{
                      x: focusedField === 'password' || password ? -2 : 0,
                      y: focusedField === 'password' || password ? -28 : 0,
                      scale: focusedField === 'password' || password ? 0.8 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    🔒
                  </motion.div>
                </div>
              </FadeIn>

              <FadeIn delay={1.2}>
                <HoverLift lift={4} scale={1.02}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-white text-primary-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <LoadingSpinner size="sm" color="primary" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>
                </HoverLift>
              </FadeIn>
            </form>

            {/* Footer */}
            <FadeIn delay={1.4}>
              <div className="mt-8 text-center">
                <p className="text-white/80 mb-4">Don't have an account?</p>
                <HoverLift lift={3} scale={1.05}>
                  <Link
                    href="/register"
                    className="inline-block px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Create Account
                  </Link>
                </HoverLift>
              </div>
            </FadeIn>
          </motion.div>
        </FadeIn>
      </div>
    </div>
  )
}

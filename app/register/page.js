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
  FloatingElement,
  StaggerContainer,
  StaggerItem
} from '../../components/AnimatedComponents'

export default function RegisterPage(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1200))

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if(users.find(u=>u.email === email)){
      setError('Email already registered')
      setIsLoading(false)
      return
    }

    const role = (email === 'admin@example.com') ? 'admin' : 'citizen'
    const user = { id: Date.now().toString(), name, email, password, role }
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(user))

    setSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 via-primary-500 to-accent-500 animate-gradient-xy"></div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement intensity={25} duration={9}>
          <div className="absolute top-16 right-10 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement intensity={30} duration={11}>
          <div className="absolute top-1/3 left-16 w-36 h-36 bg-white/8 rounded-full blur-2xl"></div>
        </FloatingElement>
        <FloatingElement intensity={20} duration={7}>
          <div className="absolute bottom-24 right-1/4 w-32 h-32 bg-white/12 rounded-full blur-lg"></div>
        </FloatingElement>
      </div>

      {/* Registration Form */}
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
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                >
                  🚀
                </motion.div>
              </ScaleIn>
              <FadeIn delay={0.6}>
                <h2 className="text-3xl font-bold text-white mb-2">Join Us Today</h2>
                <p className="text-white/80">Create your account to get started</p>
              </FadeIn>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-500/20 border border-green-500/30 text-green-100 p-4 rounded-lg mb-6 backdrop-blur-sm text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 1 }}
                    >
                      ✅
                    </motion.span>
                    <span>Account created successfully!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
            <form onSubmit={handleRegister}>
              <StaggerContainer staggerDelay={0.1}>
                <div className="space-y-6">
                  <StaggerItem>
                    <div className="relative">
                      <motion.input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        whileFocus={{ scale: 1.02 }}
                        required
                      />
                      <motion.div
                        className="absolute left-4 top-4 text-white/60"
                        animate={{
                          x: focusedField === 'name' || name ? -2 : 0,
                          y: focusedField === 'name' || name ? -28 : 0,
                          scale: focusedField === 'name' || name ? 0.8 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        👤
                      </motion.div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="relative">
                      <motion.input
                        type="email"
                        placeholder="Email Address"
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
                  </StaggerItem>

                  <StaggerItem>
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
                  </StaggerItem>

                  <StaggerItem>
                    <HoverLift lift={4} scale={1.02}>
                      <motion.button
                        type="submit"
                        disabled={isLoading || success}
                        className="w-full py-4 bg-white text-secondary-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <LoadingSpinner size="sm" color="secondary" />
                            <span>Creating Account...</span>
                          </div>
                        ) : success ? (
                          <div className="flex items-center justify-center space-x-2">
                            <span>✅</span>
                            <span>Account Created!</span>
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </motion.button>
                    </HoverLift>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </form>

            {/* Admin Tip */}
            <FadeIn delay={1.6}>
              <motion.div
                className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-white/80 text-sm text-center">
                  💡 <strong>Admin Access:</strong> Use{' '}
                  <code className="bg-white/20 px-2 py-1 rounded text-white">admin@example.com</code>
                  {' '}to register as an administrator
                </p>
              </motion.div>
            </FadeIn>

            {/* Footer */}
            <FadeIn delay={1.8}>
              <div className="mt-8 text-center">
                <p className="text-white/80 mb-4">Already have an account?</p>
                <HoverLift lift={3} scale={1.05}>
                  <Link
                    href="/login"
                    className="inline-block px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Sign In
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

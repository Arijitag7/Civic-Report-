'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FadeIn,
  ScaleIn,
  HoverLift,
  LoadingSpinner,
  FloatingElement,
  StaggerContainer,
  StaggerItem
} from '../../components/AnimatedComponents'

export default function ReportsPage(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mediaPreview, setMediaPreview] = useState(null)
  const [mediaData, setMediaData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const router = useRouter()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => {
      setMediaPreview(reader.result)
      setMediaData(reader.result) // store base64
    }
    reader.readAsDataURL(f)
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if(!user){
      alert('Login first')
      router.push('/login')
      return
    }

    // Simulate submission delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))

    const reports = JSON.parse(localStorage.getItem('reports') || '[]')
    const report = {
      id: Date.now().toString(),
      userId: user.id,
      title,
      description,
      media: mediaData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    reports.unshift(report)
    localStorage.setItem('reports', JSON.stringify(reports))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-primary-500 to-secondary-500 animate-gradient-xy"></div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement intensity={20} duration={8}>
          <div className="absolute top-24 left-12 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement intensity={25} duration={10}>
          <div className="absolute top-1/3 right-16 w-32 h-32 bg-white/8 rounded-full blur-2xl"></div>
        </FloatingElement>
        <FloatingElement intensity={15} duration={12}>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-white/12 rounded-full blur-lg"></div>
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0.2}>
            <motion.div
              className="glass rounded-2xl p-8 shadow-2xl border border-white/30"
              initial={{ scale: 0.95, opacity: 0 }}
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
                    📝
                  </motion.div>
                </ScaleIn>
                <FadeIn delay={0.6}>
                  <h2 className="text-3xl font-bold text-white mb-2">Report an Issue</h2>
                  <p className="text-white/80">Help make your community better by reporting civic issues</p>
                </FadeIn>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <StaggerContainer staggerDelay={0.1}>
                  <div className="space-y-6">
                    {/* Title Field */}
                    <StaggerItem>
                      <div className="relative">
                        <label className="block text-white/90 font-medium mb-2">
                          Issue Title *
                        </label>
                        <motion.input
                          type="text"
                          placeholder="Brief description of the issue"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          onFocus={() => setFocusedField('title')}
                          onBlur={() => setFocusedField('')}
                          className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                          whileFocus={{ scale: 1.02 }}
                          required
                        />
                      </div>
                    </StaggerItem>

                    {/* Description Field */}
                    <StaggerItem>
                      <div className="relative">
                        <label className="block text-white/90 font-medium mb-2">
                          Detailed Description *
                        </label>
                        <motion.textarea
                          placeholder="Provide detailed information about the issue, location, and any other relevant details"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          onFocus={() => setFocusedField('description')}
                          onBlur={() => setFocusedField('')}
                          rows={4}
                          className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                          whileFocus={{ scale: 1.01 }}
                          required
                        />
                      </div>
                    </StaggerItem>

                    {/* File Upload */}
                    <StaggerItem>
                      <div>
                        <label className="block text-white/90 font-medium mb-2">
                          Attach Evidence (Optional)
                        </label>
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.01 }}
                        >
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFile}
                            className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/30 file:text-white file:font-medium hover:file:bg-white/40 transition-all duration-300 backdrop-blur-sm"
                          />
                        </motion.div>
                      </div>
                    </StaggerItem>

                    {/* Media Preview */}
                    <AnimatePresence>
                      {mediaPreview && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20"
                        >
                          <p className="text-white/90 font-medium mb-3">Preview:</p>
                          <motion.img
                            src={mediaPreview}
                            alt="preview"
                            className="w-full max-h-48 object-cover rounded-lg shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <StaggerItem>
                      <HoverLift lift={4} scale={1.02}>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                          whileHover={{ boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <LoadingSpinner size="sm" color="secondary" />
                              <span>Submitting Report...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <span>📤</span>
                              <span>Submit Report</span>
                            </div>
                          )}
                        </motion.button>
                      </HoverLift>
                    </StaggerItem>
                  </div>
                </StaggerContainer>
              </form>

              {/* Help Text */}
              <FadeIn delay={1.8}>
                <motion.div
                  className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-white/80 text-sm text-center">
                    💡 <strong>Tip:</strong> Include specific location details and clear photos
                    to help authorities address your report more effectively.
                  </p>
                </motion.div>
              </FadeIn>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

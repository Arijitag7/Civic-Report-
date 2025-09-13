'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ReportCard from '../../components/ReportCard'
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLift,
  RevealOnScroll,
  ScaleIn,
  FloatingElement
} from '../../components/AnimatedComponents'

export default function DashboardPage(){
  const [user, setUser] = useState(null)
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, inProgress: 0 })

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setUser(u)
    const all = JSON.parse(localStorage.getItem('reports') || '[]')
    if(u){
      const userReports = all.filter(r=>r.userId === u.id)
      setReports(userReports)

      // Calculate stats
      const total = userReports.length
      const pending = userReports.filter(r => r.status === 'pending').length
      const resolved = userReports.filter(r => r.status === 'resolved').length
      const inProgress = userReports.filter(r => r.status === 'in-progress').length

      setStats({ total, pending, resolved, inProgress })
    }
  },[])

  if(!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <FadeIn>
          <motion.div
            className="card max-w-md mx-auto text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold gradient-text mb-4">Access Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your dashboard</p>
            <HoverLift lift={4} scale={1.05}>
              <Link
                href="/login"
                className="btn-primary inline-block"
              >
                Sign In
              </Link>
            </HoverLift>
          </motion.div>
        </FadeIn>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.total,
      icon: '📊',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: '⏳',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: '🔄',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: '✅',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingElement intensity={15} duration={10}>
          <div className="absolute top-32 right-10 w-24 h-24 bg-primary-200/30 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement intensity={20} duration={12}>
          <div className="absolute bottom-32 left-16 w-32 h-32 bg-secondary-200/20 rounded-full blur-2xl"></div>
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <motion.h1
                className="text-4xl font-bold gradient-text mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Welcome back, {user.name}! 👋
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Here's an overview of your civic reports
              </motion.p>
            </div>

            <div className="flex gap-3">
              <HoverLift lift={4} scale={1.05}>
                <Link
                  href="/reports"
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>📝</span>
                  <span>New Report</span>
                </Link>
              </HoverLift>

              {user.role === 'admin' && (
                <HoverLift lift={4} scale={1.05}>
                  <Link
                    href="/admin"
                    className="btn-outline flex items-center space-x-2"
                  >
                    <span>⚙️</span>
                    <span>Admin Panel</span>
                  </Link>
                </HoverLift>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Stats Cards */}
        <RevealOnScroll>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                  <StaggerItem key={stat.title}>
                    <HoverLift lift={8} scale={1.03}>
                      <motion.div
                        className={`card ${stat.bgColor} border-l-4 border-l-transparent hover:border-l-current transition-all duration-300`}
                        style={{ borderLeftColor: `var(--tw-gradient-from)` }}
                        whileHover={{
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm font-medium mb-1">
                              {stat.title}
                            </p>
                            <motion.p
                              className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              {stat.value}
                            </motion.p>
                          </div>
                          <motion.div
                            className="text-3xl opacity-80"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + index }}
                          >
                            {stat.icon}
                          </motion.div>
                        </div>
                      </motion.div>
                    </HoverLift>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </RevealOnScroll>

        {/* Reports Section */}
        <RevealOnScroll>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Reports</h2>
              {reports.length > 0 && (
                <motion.div
                  className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {reports.length} report{reports.length !== 1 ? 's' : ''}
                </motion.div>
              )}
            </div>

            {reports.length === 0 ? (
              <FadeIn delay={0.3}>
                <motion.div
                  className="card text-center py-12"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="text-6xl mb-4 opacity-50"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📝
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No reports yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start making a difference by reporting your first civic issue
                  </p>
                  <HoverLift lift={4} scale={1.05}>
                    <Link
                      href="/reports"
                      className="btn-primary inline-block"
                    >
                      Create Your First Report
                    </Link>
                  </HoverLift>
                </motion.div>
              </FadeIn>
            ) : (
              <StaggerContainer staggerDelay={0.1}>
                <div className="grid gap-6">
                  {reports.map((report, index) => (
                    <StaggerItem key={report.id}>
                      <ReportCard report={report} index={index} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}

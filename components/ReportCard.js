'use client'
import { motion } from 'framer-motion'
import { HoverLift } from './AnimatedComponents'

export default function ReportCard({ report, index = 0 }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: '⏳',
          gradient: 'from-yellow-400 to-orange-500'
        }
      case 'in-progress':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '🔄',
          gradient: 'from-blue-400 to-indigo-500'
        }
      case 'resolved':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '✅',
          gradient: 'from-green-400 to-emerald-500'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '📋',
          gradient: 'from-gray-400 to-gray-500'
        }
    }
  }

  const statusConfig = getStatusConfig(report.status)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <HoverLift lift={6} scale={1.02}>
      <motion.div
        className="card card-hover relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Status Indicator Line */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statusConfig.gradient}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
        />

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <motion.h3
              className="text-xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
            >
              {report.title}
            </motion.h3>
            <motion.p
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              {report.description}
            </motion.p>
          </div>

          <motion.div
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${statusConfig.color} font-medium text-sm`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <span>{statusConfig.icon}</span>
            <span className="capitalize">{report.status.replace('-', ' ')}</span>
          </motion.div>
        </div>

        {/* Media Section */}
        {report.media && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            <motion.img
              src={report.media}
              alt="Report media"
              className="w-full max-h-48 object-cover rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 + index }}
            >
              📅
            </motion.span>
            <span>{formatDate(report.createdAt)}</span>
          </div>

          {report.location && (
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 + index }}
              >
                📍
              </motion.span>
              <span>{report.location}</span>
            </div>
          )}
        </motion.div>

        {/* Priority Indicator */}
        {report.priority && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
          >
            <div className={`w-3 h-3 rounded-full ${
              report.priority === 'high' ? 'bg-red-500' :
              report.priority === 'medium' ? 'bg-yellow-500' :
              'bg-green-500'
            } shadow-lg`} />
          </motion.div>
        )}

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </HoverLift>
  )
}

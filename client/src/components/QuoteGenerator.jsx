import { useEffect, useState } from 'react'
import apiClient from '../config/api.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, RefreshCw, Sparkles } from 'lucide-react'

export default function QuoteGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quote, setQuote] = useState(null)

  const fetchQuote = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiClient.get('/api/quote')
      setQuote(res.data)
    } catch (e) {
      const msg = e?.response?.data?.error || 'Failed to fetch quote'
      setError(msg)
      setQuote(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-pink-500/10 border border-white/20 p-6 sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
              <Sparkles size={32} />
              Motivational Quotes
            </h2>
            <p className="text-slate-600">Get inspired with daily wisdom</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !quote && (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw size={32} className="text-pink-500" />
            </motion.div>
          </div>
        )}

        {/* Quote Card */}
        <AnimatePresence mode="wait">
          {quote && (
            <motion.div
              key={quote.content}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <Quote size={48} className="opacity-20 mb-6" />
                <blockquote className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed italic"
                  >
                    "{quote.content}"
                  </motion.p>
                  <motion.footer
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 pt-4 border-t border-white/20"
                  >
                    <div className="w-1 h-12 bg-white/30 rounded-full"></div>
                    <div>
                      <div className="text-sm opacity-90 mb-1">Author</div>
                      <div className="text-xl font-semibold">{quote.author}</div>
                    </div>
                  </motion.footer>
                </blockquote>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Quote Button */}
        <motion.button
          onClick={fetchQuote}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="mt-6 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-orange-600 text-white font-medium shadow-lg shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
        >
          <RefreshCw
            size={20}
            className={loading ? 'animate-spin' : ''}
          />
          {loading ? 'Loading Inspiration...' : 'New Quote'}
        </motion.button>
      </motion.div>
    </div>
  )
}

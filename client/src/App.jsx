import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, DollarSign, Quote } from 'lucide-react'
import WeatherModule from './components/WeatherModule.jsx'
import CurrencyConverter from './components/CurrencyConverter.jsx'
import QuoteGenerator from './components/QuoteGenerator.jsx'

const tabs = [
  { key: 'weather', label: 'Weather', icon: Cloud },
  { key: 'currency', label: 'Currency', icon: DollarSign },
  { key: 'quotes', label: 'Quotes', icon: Quote },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('weather')

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Glassmorphism Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg shadow-slate-900/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              InfoHub
            </motion.div>
            <nav className="flex gap-2">
              {tabs.map((t) => {
                const Icon = t.icon
                return (
                  <motion.button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === t.key
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'text-slate-700 hover:bg-white/50 backdrop-blur-sm'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{t.label}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'weather' && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WeatherModule />
            </motion.div>
          )}
          {activeTab === 'currency' && (
            <motion.div
              key="currency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrencyConverter />
            </motion.div>
          )}
          {activeTab === 'quotes' && (
            <motion.div
              key="quotes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuoteGenerator />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Gradient Footer */}
      <footer className="py-8 text-center border-t border-white/20 backdrop-blur-sm bg-white/30">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Built with React, Express, and Tailwind CSS
        </motion.p>
      </footer>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ArrowRightLeft, TrendingUp, DollarSign, Euro } from 'lucide-react'

const TARGETS = [
  { code: 'USD', label: 'US Dollar', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
  { code: 'EUR', label: 'Euro', icon: Euro, color: 'from-blue-500 to-cyan-600' },
]

export default function CurrencyConverter() {
  const [amountInr, setAmountInr] = useState('100')
  const [target, setTarget] = useState('USD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const parsedAmount = useMemo(() => Number(amountInr), [amountInr])
  const selectedTarget = TARGETS.find((t) => t.code === target) || TARGETS[0]

  const convert = async () => {
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setError('Enter a valid non-negative amount')
      setResult(null)
      return
    }
    if (parsedAmount === 0) {
      setResult(null)
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await axios.get('/api/convert', {
        params: { from: 'INR', to: target, amount: parsedAmount },
      })
      setResult(res.data)
    } catch (e) {
      const msg = e?.response?.data?.error || 'Failed to convert'
      setError(msg)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (parsedAmount > 0) {
      convert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 p-6 sm:p-8"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <ArrowRightLeft size={32} />
            Currency Converter
          </h2>
          <p className="text-slate-600">Convert Indian Rupees to USD or EUR</p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">Amount (INR)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amountInr}
              onChange={(e) => setAmountInr(e.target.value)}
              onBlur={convert}
              onKeyPress={(e) => {
                if (e.key === 'Enter') convert()
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-semibold text-lg"
              placeholder="Enter amount"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">Convert To</label>
            <div className="relative">
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none font-medium"
              >
                {TARGETS.map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.code} — {t.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {selectedTarget.icon && <selectedTarget.icon size={20} className="text-purple-600" />}
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <motion.button
              onClick={convert}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading || !parsedAmount || parsedAmount <= 0}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Converting...' : 'Convert'}
            </motion.button>
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

        {/* Result Card */}
        {result && parsedAmount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${selectedTarget.color} rounded-2xl p-6 sm:p-8 text-white shadow-xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {selectedTarget.icon && <selectedTarget.icon size={32} />}
                <div>
                  <div className="text-sm opacity-90">Exchange Rate</div>
                  <div className="text-2xl font-bold">
                    1 {result.from} = {result.rate.toFixed(4)} {result.to}
                  </div>
                </div>
              </div>
              <TrendingUp size={32} className="opacity-80" />
            </div>

            <div className="border-t border-white/20 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90 mb-1">You Convert</div>
                  <div className="text-3xl font-bold">
                    {result.amount.toLocaleString('en-IN', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    {result.from}
                  </div>
                </div>
                <div className="text-4xl opacity-50">→</div>
                <div className="text-right">
                  <div className="text-sm opacity-90 mb-1">You Get</div>
                  <div className="text-3xl font-bold">
                    {result.converted.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    {result.to}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

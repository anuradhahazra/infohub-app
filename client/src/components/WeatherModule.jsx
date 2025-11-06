import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Search, MapPin, Thermometer, Droplets, Wind, Sunrise, Sunset, Gauge, Eye } from 'lucide-react'

export default function WeatherModule() {
  const [city, setCity] = useState('Kolkata')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getWindDirection = (deg) => {
    if (!deg) return 'N/A'
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(deg / 45) % 8]
  }

  const fetchWeather = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`/api/weather`, { params: { city } })
      setData(res.data)
    } catch (e) {
      const msg = e?.response?.data?.error || 'Failed to fetch weather'
      setError(msg)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-500/10 border border-white/20 p-6 sm:p-8"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Weather Information
          </h2>
          <p className="text-slate-600">Get real-time weather data for any city</p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <motion.button
            onClick={fetchWeather}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search size={20} />
            {loading ? 'Loading...' : 'Search'}
          </motion.button>
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

        {/* Weather Data */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  {data.icon && (
                    <img
                      alt={data.description || 'weather icon'}
                      src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
                      className="w-24 h-24 sm:w-32 sm:h-32"
                    />
                  )}
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                      {data.city}
                      {data.country && (
                        <span className="text-lg opacity-90">, {data.country}</span>
                      )}
                    </div>
                    <div className="text-lg opacity-90 capitalize">{data.description}</div>
                    <div className="text-5xl sm:text-6xl font-bold mt-2">
                      {Math.round(data.temperature)}°C
                    </div>
                    <div className="text-lg opacity-90 mt-1">{data.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-lg">
                    <Thermometer size={20} />
                    <span>Feels like {Math.round(data.feelsLike)}°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 text-slate-600">
                  <Droplets size={20} className="text-blue-500" />
                  <span className="text-sm font-medium">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{data.humidity}%</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 text-slate-600">
                  <Wind size={20} className="text-cyan-500" />
                  <span className="text-sm font-medium">Wind</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {data.windSpeed?.toFixed(1)} m/s
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {getWindDirection(data.windDeg)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 text-slate-600">
                  <Sunrise size={20} className="text-orange-500" />
                  <span className="text-sm font-medium">Sunrise</span>
                </div>
                <div className="text-lg font-bold text-slate-800">{formatTime(data.sunrise)}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 text-slate-600">
                  <Sunset size={20} className="text-pink-500" />
                  <span className="text-sm font-medium">Sunset</span>
                </div>
                <div className="text-lg font-bold text-slate-800">{formatTime(data.sunset)}</div>
              </motion.div>

              {data.pressure && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2 text-slate-600">
                    <Gauge size={20} className="text-purple-500" />
                    <span className="text-sm font-medium">Pressure</span>
                  </div>
                  <div className="text-lg font-bold text-slate-800">{data.pressure} hPa</div>
                </motion.div>
              )}

              {data.visibility && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2 text-slate-600">
                    <Eye size={20} className="text-indigo-500" />
                    <span className="text-sm font-medium">Visibility</span>
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    {(data.visibility / 1000).toFixed(1)} km
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

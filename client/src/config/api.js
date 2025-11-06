import axios from 'axios'

// Use environment variable in production, or relative path in development
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient


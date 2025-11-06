import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/weather?city=Kolkata
app.get('/api/weather', async (req, res) => {
  try {
    const city = (req.query.city || '').toString().trim();
    if (!city) {
      return res.status(400).json({ error: 'Missing required query param: city' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server missing OpenWeather API key' });
    }

    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const { data } = await axios.get(url, {
      params: { q: city, appid: apiKey, units: 'metric' }
    });

    // Normalize response with detailed info
    const payload = {
      city: data.name,
      country: data.sys?.country,
      temperature: data.main?.temp,
      feelsLike: data.main?.feels_like,
      condition: data.weather?.[0]?.main,
      description: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon,
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      windDeg: data.wind?.deg,
      sunrise: data.sys?.sunrise,
      sunset: data.sys?.sunset,
      pressure: data.main?.pressure,
      visibility: data.visibility
    };
    res.json(payload);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status || 500;
      const message = err.response?.data?.message || 'Failed to fetch weather data';
      return res.status(status).json({ error: message });
    }
    res.status(500).json({ error: 'Unexpected server error' });
  }
});

// GET /api/convert?from=INR&to=USD&amount=100
app.get('/api/convert', async (req, res) => {
  try {
    const from = (req.query.from || '').toString().toUpperCase();
    const to = (req.query.to || '').toString().toUpperCase();
    const amountRaw = req.query.amount;

    if (!from || !to || amountRaw === undefined) {
      return res.status(400).json({ error: 'Missing required query params: from, to, amount' });
    }

    const amount = Number(amountRaw);
    if (!Number.isFinite(amount) || amount < 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Using Frankfurter.app
    const url = 'https://api.frankfurter.app/latest';
    const { data } = await axios.get(url, { params: { from, to } });
    const rate = data?.rates?.[to];
    if (!rate) {
      return res.status(400).json({ error: 'Unsupported currency pair' });
    }
    const converted = amount * rate;
    res.json({ from, to, rate, amount, converted });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status || 500;
      const message = err.response?.data?.error || err.response?.data?.message || 'Failed to convert currency';
      return res.status(status).json({ error: message });
    }
    res.status(500).json({ error: 'Unexpected server error' });
  }
});

// GET /api/quote
app.get('/api/quote', async (req, res) => {
  try {
    // Try Quotable.io first
    try {
      const { data } = await axios.get('https://api.quotable.io/random', { timeout: 5000 });
      return res.json({ content: data.content, author: data.author });
    } catch (quotableErr) {
      // Fallback to ZenQuotes.io
      try {
        const { data } = await axios.get('https://zenquotes.io/api/random', { timeout: 5000 });
        if (Array.isArray(data) && data.length > 0) {
          return res.json({ content: data[0].q, author: data[0].a });
        }
      } catch (zenErr) {
        // Final fallback - return a default quote
        return res.json({ 
          content: 'The only way to do great work is to love what you do.', 
          author: 'Steve Jobs' 
        });
      }
    }
  } catch (err) {
    // If all else fails, return a default quote
    res.json({ 
      content: 'The only way to do great work is to love what you do.', 
      author: 'Steve Jobs' 
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`InfoHub server running on port ${port}`);
});



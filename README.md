# InfoHub — Weather, Currency & Quotes App

A full-stack app built with React (Vite) + Tailwind on the frontend and Node.js + Express on the backend. Provides weather lookup, INR → USD/EUR conversion, and random motivational quotes.

## Features
- Weather info by city (OpenWeatherMap)
- Currency converter using Frankfurter.app
- Random quotes from Quotable.io
- Smooth transitions with Framer Motion
- Responsive, mobile-first UI via Tailwind

## Monorepo Structure
```
client/   # React + Vite frontend
server/   # Express + node.js backend
```

## Getting Started

### Prerequisites
- Node.js 18+

### Backend
1. Create `server/.env`:
```
OPENWEATHER_API_KEY=YOUR_KEY
PORT=5000
NODE_ENV=development

```
2. Install and run:
```
cd server
npm install
npm run dev
```

### Frontend
1. Install and run:
```
cd client
npm install
npm run dev
```

The frontend expects the backend on `http://localhost:5000` and uses relative `/api/*` calls.

## Deployment
- You can deploy the server to Render/Railway/Heroku and the client to Vercel/Netlify.
- Ensure environment variables are configured in the backend host.
- Update the client to use the deployed API base URL if serving from another origin, or configure a reverse proxy.

## API Endpoints
- `GET /api/weather?city=Kolkata`
- `GET /api/convert?from=INR&to=USD&amount=100`
- `GET /api/quote`

## License
MIT

# infohub-app
A full-stack web app combining real-time Weather Info, Currency Converter, and Motivational Quotes — built with React &amp; Node.js.

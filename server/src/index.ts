import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { config, validateConfig } from './config'
import moviesRoutes from './routes/movies.routes'
import { errorHandler } from './middleware/errorHandler'

// Validate environment variables on startup
validateConfig()

const app = express()

// Security: CORS - only allow localhost in development
const corsOptions = {
  origin:
    config.nodeEnv === 'production'
      ? process.env.ALLOWED_ORIGINS?.split(',') || []
      : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
})

app.use('/api', limiter)

// Routes
app.use('/api', moviesRoutes)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Error handling middleware (must be last)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}`)
  console.log(`[server] environment: ${config.nodeEnv}`)
})

import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: Number(process.env.PORT || 3001),
  tmdb: {
    bearerToken: process.env.TMDB_BEARER,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
} as const

// Validate required environment variables
export function validateConfig(): void {
  if (!config.tmdb.bearerToken) {
    throw new Error(
      'Missing required environment variable: TMDB_BEARER\n' +
      'Please add your TMDB API token to the .env file.\n' +
      'Get one at: https://www.themoviedb.org/settings/api'
    )
  }
}

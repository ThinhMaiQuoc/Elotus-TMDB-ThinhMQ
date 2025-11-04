import { AppError } from '../types'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const BEARER = process.env.TMDB_BEARER

export class TMDBService {
  private async fetch(path: string, init?: RequestInit): Promise<unknown> {
    if (!BEARER) {
      throw new AppError(500, 'TMDB API token not configured')
    }

    const response = await fetch(`${TMDB_BASE}${path}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${BEARER}`,
      },
    } as RequestInit)

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      throw new AppError(response.status, text || `TMDB API error: ${response.status}`)
    }

    return response.json()
  }

  async getNowPlaying(page = 1): Promise<unknown> {
    return this.fetch(`/movie/now_playing?language=en-US&page=${page}`)
  }

  async getTopRated(page = 1): Promise<unknown> {
    return this.fetch(`/movie/top_rated?language=en-US&page=${page}`)
  }

  async searchMovies(query: string, page = 1): Promise<unknown> {
    return this.fetch(
      `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
    )
  }

  async getMovieDetails(id: string): Promise<unknown> {
    return this.fetch(`/movie/${id}?language=en-US`)
  }
}

export const tmdbService = new TMDBService()

import { Request, Response, NextFunction } from 'express'
import { tmdbService } from '../services/tmdb.service'
import { AppError } from '../types'

export class MoviesController {
  async getNowPlaying(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1
      if (page < 1 || page > 500) {
        throw new AppError(400, 'Page must be between 1 and 500')
      }
      const data = await tmdbService.getNowPlaying(page)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async getTopRated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1
      if (page < 1 || page > 500) {
        throw new AppError(400, 'Page must be between 1 and 500')
      }
      const data = await tmdbService.getTopRated(page)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async searchMovies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = String(req.query.q || '').trim()

      if (!query) {
        res.json({ results: [] })
        return
      }

      if (query.length > 100) {
        throw new AppError(400, 'Search query too long (max 100 characters)')
      }

      const page = parseInt(req.query.page as string) || 1
      if (page < 1 || page > 500) {
        throw new AppError(400, 'Page must be between 1 and 500')
      }

      const data = await tmdbService.searchMovies(query, page)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async getMovieDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id

      if (!/^\d+$/.test(id)) {
        throw new AppError(400, 'Invalid movie ID')
      }

      const data = await tmdbService.getMovieDetails(id)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

export const moviesController = new MoviesController()

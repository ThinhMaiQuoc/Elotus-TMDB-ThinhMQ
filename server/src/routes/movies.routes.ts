import { Router } from 'express'
import { moviesController } from '../controllers/movies.controller'

const router = Router()

router.get('/now-playing', (req, res, next) => moviesController.getNowPlaying(req, res, next))
router.get('/top-rated', (req, res, next) => moviesController.getTopRated(req, res, next))
router.get('/search', (req, res, next) => moviesController.searchMovies(req, res, next))
router.get('/movie/:id', (req, res, next) => moviesController.getMovieDetails(req, res, next))

export default router

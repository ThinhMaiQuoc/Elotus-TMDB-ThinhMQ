import { useQuery } from '@tanstack/react-query'
import { apiGet } from './api'
import type { Paged, Movie, MovieDetails } from './types'
import { QUERY_STALE_TIME } from '../shared/constant'

export function useNowPlaying(page = 1) {
  return useQuery({
    queryKey: ['now-playing', page],
    queryFn: () => apiGet<Paged<Movie>>(`/api/now-playing?page=${page}`),
    staleTime: QUERY_STALE_TIME,
  })
}

export function useTopRated(page = 1) {
  return useQuery({
    queryKey: ['top-rated', page],
    queryFn: () => apiGet<Paged<Movie>>(`/api/top-rated?page=${page}`),
    staleTime: QUERY_STALE_TIME,
  })
}

export function useSearchMovies(q: string, page = 1) {
  return useQuery({
    queryKey: ['search', q, page],
    queryFn: () => apiGet<Paged<Movie>>(`/api/search?q=${encodeURIComponent(q)}&page=${page}`),
    enabled: q.trim().length > 0,
    staleTime: QUERY_STALE_TIME,
  })
}

export function useMovieDetails(id: string) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => apiGet<MovieDetails>(`/api/movie/${id}`),
    staleTime: QUERY_STALE_TIME,
  })
}

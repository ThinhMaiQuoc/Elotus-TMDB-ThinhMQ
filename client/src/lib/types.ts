export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path?: string | null
  release_date: string
  vote_average: number
}

export interface MovieDetails extends Movie {
  genres?: Array<{ id: number; name: string }>
  runtime?: number
  tagline?: string
  budget?: number
  revenue?: number
  status?: string
}

export interface Paged<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface APIError {
  error: string
}

export const ViewMode = {
  GRID: 'grid',
  LIST: 'list',
} as const
export type ViewMode = typeof ViewMode[keyof typeof ViewMode]

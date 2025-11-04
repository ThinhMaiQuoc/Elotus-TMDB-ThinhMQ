import { useParams } from 'react-router-dom'
import { useMovieDetails } from '../lib/queries'
import ErrorMessage from '../components/common/ErrorMessage/ErrorMessage'
import styles from './MovieDetails.module.scss'

export default function MovieDetails() {
  const { id = '' } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError, refetch } = useMovieDetails(id)

  if (isLoading) {
    return <div className={styles.skeleton} />
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Failed to load movie details. Please try again."
        onRetry={() => refetch()}
      />
    )
  }

  if (!movie) return null

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null

  const year = movie.release_date?.slice(0, 4) || 'N/A'
  const rating = movie.vote_average?.toFixed(1) || 'N/A'

  return (
    <article className={styles.container}>
      <div className={styles.content}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterPlaceholder}>
            <span>No Image</span>
          </div>
        )}

        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>

          {movie.tagline && (
            <p className={styles.tagline}>{movie.tagline}</p>
          )}

          <div className={styles.meta}>
            <span>{year}</span>
            <span>⭐ {rating}</span>
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className={styles.genres}>
              {movie.genres.map(genre => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className={styles.overview}>{movie.overview}</p>
        </div>
      </div>
    </article>
  )
}

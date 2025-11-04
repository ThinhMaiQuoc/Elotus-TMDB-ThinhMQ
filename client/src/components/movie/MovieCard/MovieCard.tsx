import { Link } from 'react-router-dom'
import type { Movie } from '../../../lib/types'
import styles from './MovieCard.module.scss'
import { useState } from 'react'

export default function MovieCard({ movie }: { movie: Movie }) {
  const [loaded, setLoaded] = useState(false)
  const img = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : ''
  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.posterWrap}>
        {img ? (
          <img
            src={img}
            alt={movie.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={loaded ? styles.loaded : ''}
          />
        ) : (
          <div className={`${styles.poster} skeleton`} />
        )}
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.sub}>
          <span>{(movie.release_date || '').slice(0,4)}</span>
          <span>•</span>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

import type { Movie } from '../../../lib/types'
import MovieCard from '../MovieCard/MovieCard'
import styles from './MovieGrid.module.scss'

export default function MovieGrid({ movies, view = 'grid' as 'grid' | 'list', title }: { movies: Movie[]; view?: 'grid'|'list'; title?: string }) {
  return (
    <section>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={view === 'grid' ? 'grid' : styles.list}>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  )
}

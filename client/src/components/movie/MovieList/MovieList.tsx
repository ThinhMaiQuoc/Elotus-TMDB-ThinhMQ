import type { Movie, ViewMode } from '../../../lib/types'
import MovieCard from '../MovieCard/MovieCard'
import styles from './MovieList.module.scss'
import { ViewMode as VM } from '../../../lib/types'

export default function MovieList({ movies, view = VM.GRID, title }: { movies: Movie[]; view?: ViewMode; title?: string }) {
  return (
    <section>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={view === VM.GRID ? styles.grid : styles.list}>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  )
}

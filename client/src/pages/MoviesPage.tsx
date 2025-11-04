import { useSearchParams } from 'react-router-dom'
import { useNowPlaying, useTopRated } from '../lib/queries'
import MovieGrid from '../components/movie/MovieGrid/MovieGrid'
import MovieCardSkeleton from '../components/movie/MovieCard/MovieCardSkeleton'
import ViewToggle from '../components/form/ViewToggle/ViewToggle'
import PageHeader from '../components/common/PageHeader/PageHeader'
import ErrorMessage from '../components/common/ErrorMessage/ErrorMessage'
import styles from './MoviesPage.module.scss'

type MoviePageType = 'now-playing' | 'top-rated'

interface MoviesPageProps {
  type: MoviePageType
  title: string
}

export default function MoviesPage({ type, title }: MoviesPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1')
  const view = (searchParams.get('view') || 'grid') as 'grid' | 'list'

  // Only call the query hook we actually need
  const { data, isLoading, isError, refetch } = type === 'now-playing'
    ? useNowPlaying(page)
    : useTopRated(page)

  const setView = (newView: 'grid' | 'list') => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('view', newView)
      return params
    })
  }

  const setPage = (newPage: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('page', String(newPage))
      return params
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) return <MovieCardSkeleton />

  if (isError) {
    return (
      <ErrorMessage
        message="Failed to load movies. Please check your connection and try again."
        onRetry={() => refetch()}
      />
    )
  }

  const hasMore = data && data.page < data.total_pages

  return (
    <section>
      <PageHeader
        title={title}
        actions={<ViewToggle value={view} onChange={setView} />}
      />

      <MovieGrid movies={data?.results ?? []} view={view} />

      {data && data.results.length > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={styles.paginationButton}
          >
            ← Previous
          </button>

          <span className={styles.pageInfo}>
            Page {page} of {data.total_pages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={!hasMore}
            className={styles.paginationButton}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  )
}

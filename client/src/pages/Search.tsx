import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMovies } from '../lib/queries'
import SearchInput from '../components/form/SearchInput/SearchInput'
import MovieGrid from '../components/movie/MovieGrid/MovieGrid'
import MovieCardSkeleton from '../components/movie/MovieCard/MovieCardSkeleton'
import ErrorMessage from '../components/common/ErrorMessage/ErrorMessage'
import EmptyState from '../components/common/EmptyState/EmptyState'
import styles from './Search.module.scss'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '')

  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const { data, isFetching, isError, refetch } = useSearchMovies(query, page)

  const handleQueryChange = useCallback((newQuery: string) => {
    setLocalQuery(newQuery)
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      if (newQuery.trim()) {
        params.set('q', newQuery)
        params.set('page', '1') // Reset to page 1 on new search
      } else {
        params.delete('q')
        params.delete('page')
      }
      return params
    })
  }, [setSearchParams])

  const setPage = (newPage: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('page', String(newPage))
      return params
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasMore = data && data.page < data.total_pages
  const showResults = query && data?.results

  return (
    <section>
      <div className={styles.searchContainer}>
        <SearchInput value={localQuery} onChange={handleQueryChange} />
      </div>

      {isFetching && <MovieCardSkeleton count={8} />}

      {isError && !isFetching && (
        <ErrorMessage
          message="Failed to search movies. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {!isFetching && query && data?.results.length === 0 && (
        <EmptyState
          title="No results found"
          message={`We couldn't find any movies matching "${query}"`}
        />
      )}

      {showResults && !isFetching && (
        <>
          <div className={styles.resultsHeader}>
            <h3>
              Results for <span className={styles.query}>"{query}"</span>
            </h3>
            <span className={styles.count}>
              {data.total_results} {data.total_results === 1 ? 'movie' : 'movies'}
            </span>
          </div>

          <MovieGrid movies={data.results} />

          {data.results.length > 0 && (
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
        </>
      )}
    </section>
  )
}

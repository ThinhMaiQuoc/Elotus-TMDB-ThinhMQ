import { createBrowserRouter } from 'react-router-dom'
import MoviesPage from './pages/MoviesPage'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MoviesPage type="now-playing" title="Now Playing" /> },
      { path: 'top-rated', element: <MoviesPage type="top-rated" title="Top Rated" /> },
      { path: 'search', element: <Search /> },
      { path: 'movie/:id', element: <MovieDetails /> },
    ],
  },
])

export default router

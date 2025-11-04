import { Link, Outlet, useLocation } from 'react-router-dom'
import styles from './styles/App.module.scss'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🎬 Movies</h1>
        <nav className={styles.tabs}>
          <Link className={pathname === '/' ? styles.active : ''} to='/'>Now Playing</Link>
          <Link className={pathname === '/top-rated' ? styles.active : ''} to='/top-rated'>Top Rated</Link>
          <Link className={pathname.startsWith('/search') ? styles.active : ''} to='/search'>Search</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

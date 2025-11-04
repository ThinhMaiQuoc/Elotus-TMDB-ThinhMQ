import { useEffect, useState } from 'react'
import styles from './SearchInput.module.scss'

export default function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [v, setV] = useState(value)
  useEffect(() => { setV(value) }, [value])
  useEffect(() => {
    const t = setTimeout(() => onChange(v), 300)
    return () => clearTimeout(t)
  }, [v, onChange])
  return (
    <input
      className={styles.input}
      placeholder="Search movies…"
      value={v}
      onChange={e => setV(e.target.value)}
    />
  )
}

import styles from './ViewToggle.module.scss'

export default function ViewToggle({ value, onChange }: { value: 'grid' | 'list'; onChange: (v: 'grid'|'list') => void }) {
  return (
    <div className={styles.wrap}>
      <button className={value === 'grid' ? styles.active : ''} onClick={() => onChange('grid')}>Grid</button>
      <button className={value === 'list' ? styles.active : ''} onClick={() => onChange('list')}>List</button>
    </div>
  )
}

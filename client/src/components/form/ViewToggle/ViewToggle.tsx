import type { ViewMode } from '../../../lib/types'
import { ViewMode as VM } from '../../../lib/types'
import styles from './ViewToggle.module.scss'

export default function ViewToggle({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className={styles.wrap}>
      <button className={value === VM.GRID ? styles.active : ''} onClick={() => onChange(VM.GRID)}>Grid</button>
      <button className={value === VM.LIST ? styles.active : ''} onClick={() => onChange(VM.LIST)}>List</button>
    </div>
  )
}

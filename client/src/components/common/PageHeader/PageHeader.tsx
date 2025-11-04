import { ReactNode } from 'react'
import styles from './PageHeader.module.scss'

interface PageHeaderProps {
  title: string
  actions?: ReactNode
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}

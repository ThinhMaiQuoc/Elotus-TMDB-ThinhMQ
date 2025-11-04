import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  title: string
  message?: string
  icon?: string
}

export default function EmptyState({ title, message, icon = '🔍' }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}

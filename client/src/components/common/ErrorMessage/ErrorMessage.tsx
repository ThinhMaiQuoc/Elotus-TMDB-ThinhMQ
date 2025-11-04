import styles from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h3 className={styles.title}>Something went wrong</h3>
      <p className={styles.message}>
        {message || 'Unable to load content. Please try again.'}
      </p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}

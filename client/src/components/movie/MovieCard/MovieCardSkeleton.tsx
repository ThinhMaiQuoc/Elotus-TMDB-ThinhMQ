export default function MovieCardSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 300 }} />
      ))}
    </div>
  )
}

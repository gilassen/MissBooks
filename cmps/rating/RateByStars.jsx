export function RateByStars({ val = 0, onSelected }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="rate-by-stars" role="group" aria-label="Rate by stars">
      {stars.map(n => (
        <button
          key={n}
          type="button"
          className={n <= val ? 'star on' : 'star'}
          onClick={() => onSelected && onSelected(n)}
          aria-pressed={n <= val}
          title={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

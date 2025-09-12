const { useId } = React

export function RateBySelect({ val = 1, onSelected }) {
  const id = (typeof useId === 'function' ? useId() : 'rate-select')

  function handleChange({ target }) {
    const v = target.value === '' ? '' : +target.value
    if (onSelected) onSelected(v)
  }

  return (
    <div className="rate-by-select">
      <label htmlFor={id}>Rating</label>
      <select id={id} value={val} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  )
}

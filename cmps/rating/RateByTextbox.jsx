export function RateByTextbox({ val = '', onSelected }) {
  function handleChange({ target }) {
    const v = target.value
    if (onSelected) onSelected(v === '' ? '' : +v)
  }

  return (
    <input
      type="number"
      min="1"
      max="5"
      step="1"
      value={val}
      onChange={handleChange}
      placeholder="1–5"
    />
  )
}

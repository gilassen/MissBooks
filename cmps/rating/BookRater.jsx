const { useState } = React
import { DynamicRating } from './DynamicRating.jsx'

export function BookRater({ value = 1, onChange }) {
  const [mode, setMode] = useState('select') 
  const [rating, setRating] = useState(+value || 1)

  function handleSelected(newVal) {
    const newRating = +newVal || 0
    setRating(newRating)
    if (onChange) onChange(newRating)
  }

  return (
    <div className="book-rater">
      <p className="label">Rating</p>

      <div className="rating-modes">
        <label>
          <input
            type="radio"
            name="rate-mode"
            value="select"
            checked={mode === 'select'}
            onChange={() => setMode('select')}
          />
          Select
        </label>

        <label>
          <input
            type="radio"
            name="rate-mode"
            value="textbox"
            checked={mode === 'textbox'}
            onChange={() => setMode('textbox')}
          />
          Textbox
        </label>

        <label>
          <input
            type="radio"
            name="rate-mode"
            value="stars"
            checked={mode === 'stars'}
            onChange={() => setMode('stars')}
          />
          Stars
        </label>
      </div>

      <DynamicRating type={mode} val={rating} onSelected={handleSelected} />
    </div>
  )
}

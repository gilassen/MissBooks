const { useState } = React
import { BookRater } from './rating/BookRater.jsx' 

export function AddReview({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ fullname: '', rating: 1, readAt: '' })

  function handleChange({ target }) {
    const { name, value } = target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleRate(val) {
    let v = +val || 0
    if (v < 1) v = 1
    if (v > 5) v = 5
    setForm(prev => ({ ...prev, rating: v }))
  }

  function submit(ev) {
    ev.preventDefault()
    const toSend = { ...form, rating: +form.rating || 0 }
    if (onSubmit) onSubmit(toSend)
  }

  return (
    <section className="add-review">
      <h3>Add a review</h3>

      <form onSubmit={submit}>
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname" name="fullname" type="text"
          value={form.fullname} onChange={handleChange} required
        />

        <BookRater value={form.rating} onChange={handleRate} />

        <label htmlFor="readAt">Read at</label>
        <input
          id="readAt" name="readAt" type="date"
          value={form.readAt} onChange={handleChange}
        />

        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

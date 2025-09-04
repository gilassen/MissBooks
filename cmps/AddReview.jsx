import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState } = React

export function AddReview({ bookId, onAdded, onCancel }) {
  const [form, setForm] = useState({ fullname: '', rating: 5, readAt: '' })

  function handleChange(ev) {
    const { name, value } = ev.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (!form.fullname || !form.rating || !form.readAt) {
      showErrorMsg('Please fill all fields')
      return
    }
    try {
      await bookService.addReview(bookId, form)
      showSuccessMsg('Review added')
      setForm({ fullname: '', rating: 5, readAt: '' })
      if (onAdded) onAdded()       
    } catch (err) {
      console.log('addReview failed:', err)
      showErrorMsg('Could not add review')
    }
  }

  return (
    <section className="add-review">
      <h3>Add a review</h3>
      <form onSubmit={onSubmit}>
        <label>Full name</label>
        <input name="fullname" value={form.fullname} onChange={handleChange} />

        <label>Rating</label>
        <select name="rating" value={form.rating} onChange={handleChange}>
          <option value={5}>5</option><option value={4}>4</option>
          <option value={3}>3</option><option value={2}>2</option><option value={1}>1</option>
        </select>

        <label>Read at</label>
        <input type="date" name="readAt" value={form.readAt} onChange={handleChange} />

        <div className="actions">
          <button type="submit">Save</button>
          {onCancel ? <button type="button" onClick={onCancel}>Cancel</button> : null}
        </div>
      </form>
    </section>
  )
}

const { useState } = React

export function AddReview({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ fullname: '', rating: 1, readAt: '' })

  function handleChange({ target }) {
    let { name, value, type } = target
    if (type === 'number') value = +value || 0
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function submit(ev) {
    ev.preventDefault()
    if (onSubmit) onSubmit(form)    
  }

  return (
    <section className="add-review">
      <h3>Add a review</h3>

      <form onSubmit={submit}>
        <label htmlFor="fullname">Full name</label>
        <input id="fullname" name="fullname" type="text"
               value={form.fullname} onChange={handleChange} required />

        <label htmlFor="rating">Rating</label>
        <select id="rating" name="rating" value={form.rating} onChange={handleChange}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <label htmlFor="readAt">Read at</label>
        <input id="readAt" name="readAt" type="date"
               value={form.readAt} onChange={handleChange} />

        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

// cmps/BookEdit.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookService } from '../services/book.service.js'

export function BookEdit() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', amount: 0 })

  function handleChange({ target }) {
    let { name, value, type } = target
    if (type === 'number') value = +value || 0
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function onSave(ev) {
    ev.preventDefault()

    const newBook = {
      title: form.title,
      listPrice: {
        amount: Number(form.amount),
        currencyCode: 'EUR',
        isOnSale: false,
      },
    }

    try {
      await bookService.save(newBook)
      navigate('/book')
    } catch (err) {
      console.log('Failed to save book:', err)
    }
  }

  return (
    <section className="book-edit">
      <h2>Add Book</h2>

      <form onSubmit={onSave}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="amount">Price</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/book')}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

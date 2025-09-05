const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const navigate = useNavigate()
  const { bookId } = useParams()

  const [bookForm, setBookForm] = useState(() => bookService.getEmptyBook())
  const [isLoading, setIsLoading] = useState(!!bookId)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!bookId) return
    setIsLoading(true)
    setError(null)
    bookService.get(bookId)
      .then(book => setBookForm(book))
      .catch(err => {
        const msg = (err && err.message) ? err.message : 'Book not found'
        setError(msg)
      })
      .finally(() => setIsLoading(false))
  }, [bookId])

  function handleChange({ target }) {
    let { name, value, type } = target
    if (type === 'number') value = +value || 0

    if (name === 'amount') {
      setBookForm(prev => ({
        ...prev,
        listPrice: Object.assign({}, (prev.listPrice || {}), { amount: value }),
      }))
    } else {
      setBookForm(prev => Object.assign({}, prev, { [name]: value }))
    }
  }

  async function onSave(ev) {
    ev.preventDefault()
    try {
      const toSave = Object.assign({}, bookForm)
      delete toSave.prevBookId
      delete toSave.nextBookId

      await bookService.save(toSave)
      showSuccessMsg(bookForm.id ? 'Book updated' : 'Book added')
      navigate('/book')
    } catch (err) {
      console.log('Failed to save book:', err)
      showErrorMsg('Could not save book')
    }
  }

  if (isLoading) return <section className="book-edit"><p>Loading...</p></section>
  if (error) return (
    <section className="book-edit">
      <p>{error}</p>
      <button type="button" onClick={() => navigate('/book')}>Back</button>
    </section>
  )

  return (
    <section className="book-edit">
      <h2>{bookForm.id ? 'Edit Book' : 'Add Book'}</h2>

      <form onSubmit={onSave}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={bookForm.title || ''}
          onChange={handleChange}
          required
        />

        <label htmlFor="amount">Price</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          value={(bookForm.listPrice && bookForm.listPrice.amount) || 0}
          onChange={handleChange}
          required
        />

        <div className="actions">
          <button type="submit">{bookForm.id ? 'Update' : 'Save'}</button>
          <button type="button" onClick={() => navigate('/book')}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

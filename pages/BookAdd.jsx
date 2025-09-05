const { useState } = React
import { googleBookService } from '../services/google-book.service.js'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
const { useNavigate } = ReactRouterDOM

export function BookAdd() {
  const navigate = useNavigate()
  const [txt, setTxt] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSearch(ev) {
    ev.preventDefault()
    if (!txt.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const books = await googleBookService.query(txt.trim())
      setResults(books)
    } catch (err) {
      console.log('google query failed:', err)
      setError('Could not fetch results')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  async function onAdd(googleBook) {
    try {
      await bookService.addGoogleBook(googleBook)
      showSuccessMsg('Book added')
    } catch (err) {
      console.log('addGoogleBook failed:', err)
      showErrorMsg(err && err.message ? err.message : 'Could not add book')
    }
  }

  return (
    <section className="book-add">
      <h2>Add from Google Books</h2>

      <form onSubmit={onSearch} className="add-form">
        <input
          type="text"
          placeholder="Search a title/author..."
          value={txt}
          onChange={ev => setTxt(ev.target.value)}
        />
        <button>Search</button>
        <button type="button" onClick={() => navigate('/book')}>Back</button>
      </form>

      {isLoading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      <ul className="results">
        {results.map(item => (
          <li key={item.id} className="result-row">
            <span className="title">
              {item.volumeInfo && item.volumeInfo.title ? item.volumeInfo.title : 'Untitled'}
            </span>
            <button onClick={() => onAdd(item)}>＋</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

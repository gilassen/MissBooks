import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { showSuccessMsg, showErrorMsg, eventBusService } from '../services/event-bus.service.js'

const { useNavigate, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookIndex() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilter = (bookService.getFilterFromSearchParams)
    ? bookService.getFilterFromSearchParams(searchParams)
    : bookService.getDefaultFilter()

  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState(defaultFilter)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const params = {}
    for (const key in filterBy) {
      const val = filterBy[key]
      if (val !== '' && val !== 0 && val !== false) params[key] = val
    }
    setSearchParams(params)

    loadBooks(filterBy)
  }, [filterBy])

  async function loadBooks(currFilter = filterBy) {
    eventBusService.emit('show-loader')
    try {
      const data = await bookService.query(currFilter)
      setBooks(data)
    } catch (err) {
      console.error('Failed to load books:', err)
      showErrorMsg('Could not load books')
    } finally {
      setIsLoaded(true)
      eventBusService.emit('hide-loader')
    }
  }

  async function onRemoveBook(bookId) {
    try {
      await bookService.remove(bookId)
      setBooks(prev => prev.filter(book => book.id !== bookId))
      showSuccessMsg('Book removed')
    } catch (err) {
      console.error('Failed to remove book:', err)
      showErrorMsg('Could not remove book')
    }
  }

  return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />

      <BookList books={books} onRemoveBook={onRemoveBook} isLoaded={isLoaded} />

      <div className="add-book-container">
        <button
          className="btn-add-book"
          onClick={() => navigate('/book/edit')}
          title="Add a book manually"
        >
          Add Manually
        </button>

        <button
          className="btn-add-google"
          onClick={() => navigate('/book/googleAdd')}
          title="Search & add from Google Books"
        >
          Add from Google
        </button>
      </div>
    </section>
  )
}

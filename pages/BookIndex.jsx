import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'   
import { BookList } from '../cmps/BookList.jsx'
import { showSuccessMsg, showErrorMsg, eventBusService } from '../services/event-bus.service.js'
const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function BookIndex() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [isLoaded, setIsLoaded] = useState(false) 

  useEffect(() => {
    loadBooks()
  }, [filterBy])
  
  async function loadBooks() {
    eventBusService.emit('show-loader') 
    try {
      const data = await bookService.query(filterBy)
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
          onClick={() => navigate('/book/add')}
          title="Search & add from Google Books"
        >
          Add from Google
        </button>
      </div>
    </section>
  )
}

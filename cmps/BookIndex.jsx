import { bookService } from '../services/book.service.js'
import { BookFilter } from './BookFilter.jsx'   
import { BookList } from './BookList.jsx'
const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React


export function BookIndex() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  async function loadBooks() {
    const data = await bookService.query(filterBy)
    setBooks(data)
  }

 return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <BookList books={books} />

      <div className="add-book-container">
        <button
          className="btn-add-book"
          onClick={() => navigate('/book/edit')}
        >
          Add Book
        </button>
      </div>
    </section>
  )
}

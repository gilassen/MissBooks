import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { bookService } from '../services/book.service.js' 

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [bookId])

  function loadBook() {
    setIsLoading(true)
    setError(null)
    bookService.get(bookId)
      .then(setBook)
      .catch(err => setError(err.message || 'Book not found'))
      .finally(() => setIsLoading(false))
  }

  if (isLoading) return <p>Loading...</p>

  if (error || !book) {
    return (
      <section className="book-details">
        <p>Book not found.</p>
        <Link to="/book">Back to list</Link>
      </section>
    )
  }

  return (
    <section className="book-details">
      <h2>{book.title}</h2>
      <p>Price: {book.listPrice?.amount} {book.listPrice?.currencyCode}</p>
      <button onClick={() => navigate('/book')}>Back</button>
    </section>
  )
}

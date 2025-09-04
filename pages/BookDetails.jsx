const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
const { Link, useParams, useNavigate } = ReactRouterDOM
import { AddReview } from '../cmps/AddReview.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

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

  function readingLevel(pageCount = 0) {
    if (pageCount > 500) return 'Serious Reading'
    if (pageCount > 200) return 'Descent Reading'
    if (pageCount < 100) return 'Light Reading'
    return ''
  }

  function publishTag(year) {
    if (!year) return ''
    const now = new Date()
    const currYear = now.getFullYear()
    if (currYear - year > 10) return 'Vintage'
    if (currYear - year === 0) return 'New'
    return ''
  }

  function priceClass(amount = 0) {
    if (amount > 150) return 'price-red'
    if (amount < 20) return 'price-green'
    return ''
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

  async function onRemoveReview(reviewId) {
  try {
    await bookService.removeReview(bookId, reviewId)
    showSuccessMsg('Review removed')
    loadBook() 
  } catch (err) {
    console.log('removeReview failed:', err)
    showErrorMsg('Could not remove review')
  }
}

  return (
  <section className="book-details">
    {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}

    <h2>{book.title}</h2>
    {book.subtitle && <h3>{book.subtitle}</h3>}
    {book.authors && book.authors.length ? <p>By: {book.authors.join(', ')}</p> : null}

    <p>
      Pages: {book.pageCount}
      {readingLevel(book.pageCount) && (
        <span className="badge"> {readingLevel(book.pageCount)}</span>
      )}
    </p>

    <p>
      Published: {book.publishedDate}
      {publishTag(book.publishedDate) && (
        <span className="badge"> {publishTag(book.publishedDate)}</span>
      )}
    </p>

    <p className={priceClass(book.listPrice && book.listPrice.amount)}>
      Price: {book.listPrice && book.listPrice.amount} {book.listPrice && book.listPrice.currencyCode}
      {book.listPrice && book.listPrice.isOnSale && <span className="sale-badge">On Sale</span>}
    </p>

    {book.description && <LongTxt txt={book.description} length={100} />}

    <hr />

    <button onClick={() => setIsAddOpen(open => !open)}>
      {isAddOpen ? 'Close review form' : 'Add review'}
    </button>

    {isAddOpen && (
      <AddReview
        bookId={bookId}
        onAdded={() => { setIsAddOpen(false); loadBook() }}
      />
    )}

    <h3>Reviews</h3>
    {book.reviews && book.reviews.length ? (
      <ul className="reviews">
        {book.reviews.map(r => (
          <li key={r.id} className="review-item">
            <div><strong>{r.fullname}</strong></div>
            <div>Rating: {r.rating}/5</div>
            <div>Read at: {r.readAt}</div>
            <button onClick={() => onRemoveReview(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No reviews yet.</p>
    )}

    <div className="details-actions">
      <button onClick={() => navigate('/book')}>Back</button>
      <button><Link to={`/book/${book.prevBookId}`}>Prev</Link></button>
      <button><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
    </div>
  </section>
)

}
const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books = [], onRemoveBook }) {
  if (!books.length) return <p>No books to show…</p>

  return (
    <ul className="book-list">
      {books.map(book => (
        <li key={book.id} className="book-item">
          <BookPreview book={book} />

          <section className="actions">
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            <Link to={`/book/${book.id}`}><button>Details</button></Link>
            <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
          </section>
        </li>
      ))}
    </ul>
  )
}

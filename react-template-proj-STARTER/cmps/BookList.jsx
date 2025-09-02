const { Link } = ReactRouterDOM   
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books = [] }) {
  if (!books.length) return <p>No books to show…</p>

  return (
    <ul className="book-list">
      {books.map(book => (
        <li key={book.id} className="book-item">
          <Link to={`/book/${book.id}`}>
            <BookPreview book={book} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

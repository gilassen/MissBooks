export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <h2 className="title">{book.title}</h2>
      <h4>By: {book.author}</h4>

      {book.thumbnail && (
        <img
          className="book-thumbnail"
          src={book.thumbnail}
          alt={book.title}
        />
      )}
    </article>
  )
}

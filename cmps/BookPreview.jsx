export function BookPreview({ book }) {
  const authorsText =
    (Array.isArray(book.authors) && book.authors.length)
      ? book.authors.join(', ')
      : (book.author || 'Unknown')  

  return (
    <article className="book-preview">
      <h2 className="title">{book.title}</h2>
      <h4>By: {authorsText}</h4>
      {book.thumbnail && (
        <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />
      )}
    </article>
  )
}


export function BookPreview({book}) {

    const { title, listPrice } = book

    return (
        <article className="book-preview">
            <h3>{title}</h3>
            <p>Price: {listPrice?.amount} {listPrice?.currencyCode}</p>
        </article>
    )
}
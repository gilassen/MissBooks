
export function BookPreview({book}) {

    const { title, listPrice } = book

    return (
        <article className="book-preview">
            <h3>{title}</h3>
            <p>Price: {listPrice && listPrice.amount} {listPrice && listPrice.currencyCode}</p>
        </article>
    )
}
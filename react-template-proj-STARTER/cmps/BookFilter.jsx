const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { name, value, type, checked } = target
    if (type === 'number' || type === 'range') value = +value
    if (type === 'checkbox') value = checked
    setFilterByToEdit(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const {
    txt = '',
    minPrice = 0,
    maxPrice = 0,
    onSale = false,
    publishedAfter = ''
  } = filterByToEdit

  return (
    <section className="book-filter">
      <form onSubmit={onSubmit}>
        <label htmlFor="txt">Title</label>
        <input
          id="txt" name="txt" type="text"
          value={txt} onChange={handleChange}
          placeholder="Search by title"
        />

        <label htmlFor="minPrice">Min price</label>
        <input
          id="minPrice" name="minPrice" type="number" min={0}
          value={minPrice} onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price</label>
        <input
          id="maxPrice" name="maxPrice" type="number" min={0}
          value={maxPrice} onChange={handleChange}
        />

        <label className="chk">
          <input
            type="checkbox"
            name="onSale"
            checked={onSale}
            onChange={handleChange}
          />
          On Sale only
        </label>

        <label htmlFor="publishedAfter">Published After</label>
        <input
          id="publishedAfter" name="publishedAfter" type="number"
          value={publishedAfter} onChange={handleChange}
          placeholder="e.g. 2015"
        />

        <button>Filter</button>
      </form>
    </section>
  )
}

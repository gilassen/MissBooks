const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    setFilterByToEdit({ ...filterBy })
  }, [filterBy])

  function handleChange({ target }) {
    let { name, value, type, checked } = target
    if (type === 'number' || type === 'range') value = +value || 0
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
      <form className="filters" dir="rtl" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="txt" className="label">Title</label>
          <input
            id="txt"
            name="txt"
            type="text"
            value={txt}
            onChange={handleChange}
            placeholder="Search by title"
          />
        </div>

        <div className="field">
          <label htmlFor="minPrice" className="label">Min price</label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            min={0}
            value={minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="maxPrice" className="label">Max price</label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            min={0}
            value={maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="field checkbox-row">
          <input
            id="onSale"
            type="checkbox"
            name="onSale"
            checked={onSale}
            onChange={handleChange}
          />
          <label htmlFor="onSale" className="label">On Sale only</label>
        </div>

        <div className="field">
          <label htmlFor="publishedAfter" className="label">Published After</label>
          <input
            id="publishedAfter"
            name="publishedAfter"
            type="number"
            value={publishedAfter}
            onChange={handleChange}
            placeholder="e.g. 2015"
          />
        </div>

        <button className="btn-filter">Filter</button>
      </form>
    </section>
  )
}

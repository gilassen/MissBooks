const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'
import { eventBusService, showErrorMsg } from '../services/event-bus.service.js'

export function BookDashboard() {
  const [rows, setRows] = useState([]) 
  const [total, setTotal] = useState(0)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    eventBusService.emit('show-loader')
    try {
      const books = await bookService.query()
      const counts = {}
      for (let i = 0; i < books.length; i++) {
        const b = books[i] || {}
        const cats = (b.categories && b.categories.length) ? b.categories : null
        const cat = cats ? cats[0] : 'Uncategorized'
        counts[cat] = (counts[cat] || 0) + 1
      }

      const totalBooks = Object.values(counts).reduce((s, n) => s + n, 0)
      const data = Object.keys(counts).map(cat => {
        const count = counts[cat]
        const percent = Math.round((count / totalBooks) * 100)
        return { category: cat, count, percent }
      }).sort((a, b) => b.count - a.count)

      setRows(data)
      setTotal(totalBooks)
    } catch (err) {
      console.log('dashboard load failed:', err)
      showErrorMsg('Failed to load dashboard data')
    } finally {
      eventBusService.emit('hide-loader')
    }
  }

  if (!rows.length) {
    return <section className="book-dashboard"><p>No data to show…</p></section>
  }

  return (
    <section className="book-dashboard" dir="rtl">
      <h2>Books per Category</h2>
      <p className="muted">Total books counted: {total}</p>

      <div className="bars">
        {rows.map(row => (
          <div key={row.category} className="bar-row">
            <div className="bar-label">
              <span className="cat">{row.category}</span>
              <span className="pct">{row.percent}%</span>
            </div>

            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: row.percent + '%' }}
                title={row.count + ' books'}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

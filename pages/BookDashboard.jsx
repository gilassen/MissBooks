const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'
import { eventBusService, showErrorMsg } from '../services/event-bus.service.js'
import { Chart } from '../cmps/Chart.jsx'

export function BookDashboard() {
  const [booksCount, setBooksCount] = useState(0)
  const [categoryStats, setCategoryStats] = useState([]) 
  
  useEffect(() => {
    eventBusService.emit('show-loader')
    Promise.all([bookService.query(), bookService.getCategoryStats()])
      .then(([books, stats]) => {
        setBooksCount(books.length)
        setCategoryStats(stats)
      })
      .catch(err => {
        console.log('dashboard load failed:', err)
        showErrorMsg('Failed to load dashboard data')
      })
      .finally(() => eventBusService.emit('hide-loader'))
  }, [])

  return (
    <section className="book-dashboard" dir="rtl">
      <h2 className="bd-title">Books per Category</h2>
      <p className="bd-subtitle">Total books counted: {booksCount}</p>

      {categoryStats.length ? (
        <Chart data={categoryStats} />
      ) : (
        <p className="muted">No data to show…</p>
      )}
    </section>
  )
}

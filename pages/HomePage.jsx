const { useNavigate } = ReactRouterDOM

export function HomePage() {
  const navigate = useNavigate()

  return (
    <section className="home">
      <div className="hero-content">
        <h1>Welcome to Miss Books 📚</h1>
        <p className="tagline">
          Your bookshelf, online. <br />
          Browse, add, and review books — and discover what others are reading.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/book')}
            aria-label="Browse all books"
          >
            Browse Books
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => navigate('/about')}
            aria-label="Go to About Us page"
          >
            About Us
          </button>
        </div>
      </div>
    </section>
  )
}

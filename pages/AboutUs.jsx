const { NavLink, Outlet } = ReactRouterDOM;

export function AboutUs() {
  return (
    <section className="about">
      <h2>About Us</h2>
      <p>
        Welcome to <strong>Miss Books 📚</strong> – your space to discover, filter,
        and explore a wide collection of books. Here you can add new titles
        manually or directly from Google Books, rate and review your favorites,
        and keep track of reading stats in your personal dashboard.  
      </p>
      <p>
        This project was created as part of the Coding Academy practice tasks,
        but it aims to give you a real sense of building a book community:
        browse all books, read more details, share opinions, and learn about
        what inspires us to keep reading.
      </p>

      <hr />

      <nav className="about-nav">
        <NavLink to="/about/team">Team</NavLink>
        <NavLink to="/about/goal">Goal</NavLink>
      </nav>

      <Outlet />
    </section>
  );
}

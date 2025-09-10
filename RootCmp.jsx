import { AppHeader }   from "./cmps/AppHeader.jsx"
import { AboutUs }     from "./pages/AboutUs.jsx"
import { HomePage }    from "./pages/HomePage.jsx"
import { BookIndex }   from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit }    from "./pages/BookEdit.jsx"
import { UserMsg }     from "./cmps/UserMsg.jsx" 
import { BookAdd } from './pages/BookAdd.jsx'
import { AboutTeam } from './cmps/AboutCmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutCmps/AboutGoal.jsx'
import { AppLoader } from "./cmps/AppLoader.jsx"
import { BookDashboard } from './pages/BookDashboard.jsx'


const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} >
                <Route path="team" element={<AboutTeam />} />
                <Route path="goal" element={<AboutGoal />} />
            </Route>
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
            <Route path="*" element={<h2>Not found</h2>} />
            <Route path="/book/add" element={<BookAdd />} />
            <Route path="/dashboard" element={<BookDashboard />} />
          </Routes>
        </main>
        <UserMsg />
        <AppLoader/>
      </section>
    </Router>
  )
}


import { AppHeader } from "./cmps/AppHeader.jsx"
import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage } from "./cmps/HomePage.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"


export function RootCmp() {
    return (
        <section className="app main-layout">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />}/>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit" element={<BookEdit />} />
                </Routes>
            </main>
        </section>
    )
}
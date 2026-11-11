import { useState } from "react"
import { Link } from "react-router-dom"
import BookCard from "../../components/BookCard/BookCard"
import useDocumentMeta from "../../hooks/useDocumentMeta"
import styles from "./MyBooksPage.module.css"

function MyBooksPage() {
    // Personal collection is stored in the visitor's browser, so there is nothing to index.
    useDocumentMeta({
        title: "My Books – Your Personal Book Library",
        description: "Your personal book collection in My Library.",
        path: "/my-books",
        noindex: true
    })

    const [books] = useState(() => {
        const savedBooks = localStorage.getItem("books")
        return JSON.parse(savedBooks) || []
    })

    return (
        <>
            <h1>My Personal Book Library</h1>
            {books.length === 0 && (
                <p>
                    Your book collection is empty. Open a book from the <Link to="/">book catalog</Link> and
                    choose "Add to My Library" to start organizing it here.
                </p>
            )}
            <div className={styles.booksList}>
                {books.map(book => (
                    <BookCard
                    book={book}
                    key={book.key}
                    />
                ))}
            </div>
        </>
    )
}

export default MyBooksPage
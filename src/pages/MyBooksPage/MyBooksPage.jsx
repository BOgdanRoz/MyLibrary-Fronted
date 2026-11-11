import { useState } from "react"
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
            <h1>My Books</h1>
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
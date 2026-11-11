
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDocumentMeta from "../../hooks/useDocumentMeta"
import styles from "./BookPage.module.css"

function BookPage() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [author, setAuthor] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)
    const [hasError, setHasError] = useState(false)

    const bookDescription = typeof book?.description === "string" ? book.description : book?.description?.value
    const summary = bookDescription?.replace(/\s+/g, " ").trim().slice(0, 120)
    const byAuthor = author?.name ? ` by ${author.name}` : ""

    // Loading and not-found states are noindex so they never become indexable placeholder pages.
    useDocumentMeta({
        title: book?.title ? `${book.title}${byAuthor}` : hasError ? "Book Not Found" : "Book Details",
        description: book?.title
            ? `Explore ${book.title}${byAuthor}${summary ? `: ${summary}...` : "."} Add it to your personal book library with My Library.`
            : "Explore book details and add books to your personal library with My Library.",
        path: `/books/${id}`,
        noindex: !book?.title
    })

    useEffect(() => {
        const loadBook = async () => {
            try {
            const response = await fetch(`https://openlibrary.org/works/${id}.json`)
            if (!response.ok) throw new Error("Book not found")
            const data = await response.json()

            const savedBooks = localStorage.getItem("books")
            const books = JSON.parse(savedBooks) || []

            const isBookFavorite = books.some(book => book.key === data.key)

            setIsFavorite(isBookFavorite)

            const authorKey = data.authors?.[0]?.author?.key
            if (authorKey) {
                const responseAuthor = await fetch(`https://openlibrary.org/authors/${authorKey.split("/")[2]}.json`)
                setAuthor(await responseAuthor.json())
            }

            setBook(data)
            } catch {
                setHasError(true)
            }
            setIsLoading(false)
        }
        loadBook()
    }, [id])

    function handleAddBook() {
        const savedBooks = localStorage.getItem("books")
        const books = JSON.parse(savedBooks) || []

        const bookToSave = {
            ...book,
            cover_i: book.covers?.[0],
            author_name: author ? [author.name] : []
        }

        books.push(bookToSave)

        localStorage.setItem("books", JSON.stringify(books))
        setIsFavorite(true)
    }

    function handleRemoveBook() {
        const savedBooks = localStorage.getItem("books")
        const books = JSON.parse(savedBooks) || []

        const filteredBooks = books.filter(savedBook => savedBook.key !== book.key)

        localStorage.setItem("books", JSON.stringify(filteredBooks))
        setIsFavorite(false)
    }
        
    return (
        <>
            {isLoading ? (

                <p className={styles.loading}>Loading...</p>

            ) : hasError ? (

                <p className={styles.loading}>Book not found.</p>

            ) : (
                <>
                    <article className={styles.bookPage}>
                    <img className={styles.cover} src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-M.jpg`} alt={book?.title ? `Cover of ${book.title}` : "Book cover"} />  
            
                    <div className={styles.details}>
                        <h1>{book?.title}</h1>

                        <p className={styles.author}>{author?.name}</p>

                        <p className={styles.description}>{bookDescription}</p>

                        <button className={styles.favoriteButton} onClick={isFavorite ? handleRemoveBook : handleAddBook}>
                            {isFavorite ? "Remove from My Books" : "Add to My Books"}
                        </button>
                    </div>
                    </article>
                </>
            )}
            
        </>
    )
}

export default BookPage
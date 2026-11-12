import BookCard from "../../components/BookCard/BookCard"
import SearchInput from "../../components/SearchInput/SearchInput"
import Filters from "../../components/Filters/Filters"
import styles from "./BooksPage.module.css"
import { useEffect, useState } from "react"
import useDocumentMeta from "../../hooks/useDocumentMeta"
import useHomeContent from "../../hooks/useHomeContent"

function BooksPage() {
    useDocumentMeta({
        title: "My Library – Book Tracker App to Organize Your Book Collection",
        description: "Track and organize your book collection with My Library. Discover books in the catalog, view book details, and save titles to your personal book library.",
        path: "/"
    })

    const content = useHomeContent()

    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState("")
    const [minYear, setMinYear] = useState("")
    const [maxYear, setMaxYear] = useState("")
    const [language, setLanguage] = useState("")

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=popular")
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setBooks(
                data.docs.filter(book => book.cover_i))})
    }, [])

    const handleImageError = (bookKey) => {
        setBooks(prevBooks => 
            prevBooks.filter(book => book.key !== bookKey)
        )
        console.log("IMAGE ERROR:", bookKey)
    }

    const handleSearch = () => {
        setIsLoading(true)
        if (search === "") {
            fetch("https://openlibrary.org/search.json?q=popular")
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setBooks(
                data.docs.filter(book => book.cover_i))})
        } else {
            fetch(`https://openlibrary.org/search.json?q=${search}`)
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setBooks(
                data.docs.filter(book => book.cover_i)
            )})
        }
        
    }

    const filteredBooks = books.filter(book => 
        (!minYear || book.first_publish_year >= minYear) && 
        (!maxYear || book.first_publish_year <= maxYear) &&
        (!language || book.language?.includes(language))
    )

    return (
        <>
            <h1
                className={styles.title}
                onClick={() => {
                    setIsLoading(true)
                    fetch("https://openlibrary.org/search.json?q=popular")
                        .then(response => response.json())
                        .then(data => {
                            setIsLoading(false)
                            setBooks(data.docs.filter(book => book.cover_i))
                        })
                }}
            >
                {content.heading}
            </h1>

            <p className={styles.intro}>
                {content.intro}
            </p>

            <SearchInput
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            />

            <Filters
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
            language={language}
            setLanguage={setLanguage}
            />

            <section aria-labelledby="book-catalog-heading">
                <h2 id="book-catalog-heading" className={styles.catalogTitle}>{content.catalogHeading}</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.booksList}>
                    {
                        filteredBooks.map((book) => (

                        <BookCard
                        book={book}
                        key={book.key}
                        onImageError={handleImageError}
                        />
                        ))
                    }
                </div>
                )}
            </section>
            
        </>
    )
}

export default BooksPage
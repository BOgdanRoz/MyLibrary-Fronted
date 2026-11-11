import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>
            <p className={styles.logo}><Link to="/">My Library</Link></p>
            
            <nav className={styles.links} aria-label="Main navigation">
                <Link to="/">Book Catalog</Link>
                <Link to="/my-books">My Books</Link>
            </nav>
        </header>
    )
}

export default Header
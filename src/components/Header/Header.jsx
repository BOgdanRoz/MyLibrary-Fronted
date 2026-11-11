import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>
            <p className={styles.logo}>My Library</p>
            
            <nav className={styles.links} aria-label="Main navigation">
                <Link to="/books">Library</Link>
                <Link to="/my-books">My Library</Link>
            </nav>
        </header>
    )
}

export default Header
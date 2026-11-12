# My Library

A modern book library application built with React.

Users can search for books, filter search results, view detailed information about books, and save books to their personal library.

## Live Demo

[My Library](https://my-library-reading-room.vercel.app/)

## Features

- Search books by title
- Filter books by publication year
- Filter books by language
- View detailed information about books
- Add books to "My Library"
- Remove books from "My Library"
- Save books using LocalStorage
- Responsive book grid
- Loading states
- Image error handling
- Client-side routing

## Technologies

- React
- JavaScript
- React Router
- CSS Modules
- Vite
- Open Library API
- LocalStorage

## API

This project uses the Open Library API to search for books and retrieve information about books and authors.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your computer.

### Installation

Clone the repository:

```bash
git clone https://github.com/BOgdanRoz/MyLibrary

Navigate to the project directory:

cd MyLibrary

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL provided by Vite in your browser.

Project Structure
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   │
│   ├── BookCard/
│   │   ├── BookCard.jsx
│   │   └── BookCard.module.css
│   │
│   ├── SearchInput/
│   │   ├── SearchInput.jsx
│   │   └── SearchInput.module.css
│   │
│   └── Filters/
│       ├── Filters.jsx
│       └── Filters.module.css
│
├── pages/
│   ├── BooksPage/
│   │   ├── BooksPage.jsx
│   │   └── BooksPage.module.css
│   │
│   ├── BookPage/
│   │   ├── BookPage.jsx
│   │   └── BookPage.module.css
│   │
│   └── MyBooksPage/
│       ├── MyBooksPage.jsx
│       └── MyBooksPage.module.css
│
├── App.jsx
├── main.jsx
└── index.css
How It Works

Books are fetched from the Open Library API and displayed as cards.

Users can:

Search for books by title.
Open the filters panel.
Filter books by publication year and language.
Open a book to view detailed information.
Add or remove books from their personal library.

Saved books are stored in the browser's LocalStorage, so no backend or account is required.

Routing

The application uses React Router for navigation between pages:

/ — Books library
/books — Books library
/books/:id — Book details
/my-books — Personal library

Author

Bogdan Rozl
```

## Sanity CMS (homepage text)

The homepage heading, intro paragraph and "Book Catalog" section heading can be edited in Sanity. Books and user collections are not stored in Sanity. If Sanity is not configured or unavailable, the site uses the built-in text in `src/content/homeFallback.js`.

**Frontend** – copy `.env.example` to `.env.local` and set the public identifiers `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` and `VITE_SANITY_API_VERSION`. Never put tokens in `VITE_` variables.

**Studio** (`studio/`):

```bash
cd studio
npm install
cp .env.example .env   # set SANITY_STUDIO_PROJECT_ID
npm run dev            # local Studio
npm run deploy         # host the Studio on sanity.studio
```

Create a single "Homepage" document (it uses the fixed ID `homePage`) and publish it. Add your site origins (production, `http://localhost:5173`, Preview domains) under CORS origins in the Sanity project settings.

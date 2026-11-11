const SITE_URL = "https://www.mylibrary.social"
const API_URL = "https://openlibrary.org"
const CONCURRENCY = 10
const REQUEST_TIMEOUT_MS = 8000

async function fetchJson(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
    if (!response.ok) throw new Error(`${response.status} ${url}`)
    return response.json()
}

// Same query and cover filter as the homepage catalog (BooksPage.jsx).
async function getCatalogBookIds() {
    const data = await fetchJson(`${API_URL}/search.json?q=popular`)
    const ids = data.docs
        .filter(book => book.cover_i && book.key?.startsWith("/works/"))
        .map(book => book.key.split("/")[2])
    return [...new Set(ids)]
}

// Keep only books whose detail page can actually load (mirrors BookPage.jsx).
async function filterRetrievable(ids) {
    const valid = []
    for (let i = 0; i < ids.length; i += CONCURRENCY) {
        const results = await Promise.allSettled(
            ids.slice(i, i + CONCURRENCY).map(id => fetchJson(`${API_URL}/works/${id}.json`).then(() => id))
        )
        results.forEach(result => {
            if (result.status === "fulfilled") valid.push(result.value)
        })
    }
    return valid
}

function buildSitemap(paths) {
    const urls = paths.map(path => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`).join("\n")
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export default async function handler(req, res) {
    let bookPaths = []
    let ok = true

    try {
        const ids = await getCatalogBookIds()
        bookPaths = (await filterRetrievable(ids)).map(id => `/books/${id}`)
    } catch {
        ok = false
    }

    // On API failure, serve the homepage only and cache briefly so it recovers quickly.
    res.setHeader("Content-Type", "application/xml; charset=utf-8")
    res.setHeader(
        "Cache-Control",
        ok ? "public, s-maxage=86400, stale-while-revalidate=604800" : "public, s-maxage=300"
    )
    res.status(200).send(buildSitemap(["/", ...bookPaths]))
}

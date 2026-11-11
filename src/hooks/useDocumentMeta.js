import { useEffect } from "react"

const SITE_URL = "https://www.mylibrary.social"
const SITE_NAME = "My Library"

function setMeta(selector, attribute, value, create) {
    let element = document.head.querySelector(selector)
    if (!element) {
        element = create()
        document.head.appendChild(element)
    }
    element.setAttribute(attribute, value)
}

function setNamedMeta(name, content) {
    setMeta(`meta[name="${name}"]`, "content", content, () => {
        const meta = document.createElement("meta")
        meta.setAttribute("name", name)
        return meta
    })
}

function setPropertyMeta(property, content) {
    setMeta(`meta[property="${property}"]`, "content", content, () => {
        const meta = document.createElement("meta")
        meta.setAttribute("property", property)
        return meta
    })
}

// Updates head tags for the current route (the app is a client-side SPA).
// `path` is the canonical path on the preferred domain, e.g. "/my-books".
function useDocumentMeta({ title, description, path, noindex = false }) {
    useEffect(() => {
        const url = `${SITE_URL}${path}`
        const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

        document.title = fullTitle
        setNamedMeta("description", description)
        setNamedMeta("robots", noindex ? "noindex, follow" : "index, follow")
        setMeta('link[rel="canonical"]', "href", url, () => {
            const link = document.createElement("link")
            link.setAttribute("rel", "canonical")
            return link
        })

        setPropertyMeta("og:title", fullTitle)
        setPropertyMeta("og:description", description)
        setPropertyMeta("og:url", url)
        setNamedMeta("twitter:title", fullTitle)
        setNamedMeta("twitter:description", description)
    }, [title, description, path, noindex])
}

export default useDocumentMeta

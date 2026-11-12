import { useEffect, useState } from "react"
import sanityClient from "../lib/sanityClient"
import homeFallback from "../content/homeFallback"

const HOME_QUERY = `*[_id == "homePage"][0]{heading, intro, catalogHeading}`

function isText(value) {
    return typeof value === "string" && value.trim() !== ""
}

// Returns homepage text. Starts with the fallback and replaces each field
// with the Sanity value only when that value is non-empty.
function useHomeContent() {
    const [content, setContent] = useState(homeFallback)

    useEffect(() => {
        if (!sanityClient) return

        let cancelled = false
        sanityClient
            .fetch(HOME_QUERY)
            .then(data => {
                if (cancelled || !data) return
                setContent({
                    heading: isText(data.heading) ? data.heading.trim() : homeFallback.heading,
                    intro: isText(data.intro) ? data.intro.trim() : homeFallback.intro,
                    catalogHeading: isText(data.catalogHeading) ? data.catalogHeading.trim() : homeFallback.catalogHeading
                })
            })
            .catch(() => {})

        return () => {
            cancelled = true
        }
    }, [])

    return content
}

export default useHomeContent

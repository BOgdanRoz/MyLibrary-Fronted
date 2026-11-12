import { createClient } from "@sanity/client"

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID

// Public, read-only client. Returns null when Sanity is not configured,
// so the site keeps working with fallback content.
const sanityClient = projectId
    ? createClient({
        projectId,
        dataset: import.meta.env.VITE_SANITY_DATASET || "production",
        apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2025-01-01",
        useCdn: true
    })
    : null

export default sanityClient

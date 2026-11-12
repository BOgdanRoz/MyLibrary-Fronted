import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./schemaTypes/index.js"

const SINGLETON_TYPES = ["homePage"]

export default defineConfig({
  name: "my-library",
  title: "My Library",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      // Open the homepage singleton directly (fixed ID "homePage").
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage").title("Homepage"))
          ])
    })
  ],
  schema: {
    types: schemaTypes,
    // Hide "new document" templates for singletons.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.includes(schemaType))
  },
  document: {
    // Singleton: no duplicate, delete or unpublish.
    actions: (input, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? input.filter(({ action }) => action && !["duplicate", "delete", "unpublish"].includes(action))
        : input
  }
})

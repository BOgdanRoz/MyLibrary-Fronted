import { defineField, defineType } from "sanity"

// Singleton document with the fixed ID "homePage".
export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading (H1)",
      type: "string",
      validation: (rule) => rule.required().max(80)
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      description: "Shown directly below the heading. Plain text.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(400)
    }),
    defineField({
      name: "catalogHeading",
      title: "Book catalog section heading",
      type: "string",
      validation: (rule) => rule.required().max(60)
    })
  ]
})

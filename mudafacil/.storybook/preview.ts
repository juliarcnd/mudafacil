import type { Preview } from "@storybook/nextjs-vite"
import "../app/globals.css"
import { tokens } from "../design-system/tokens"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "mudafacil",
      values: [
        { name: "mudafacil", value: tokens.colors.background },
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#1C1917" },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview

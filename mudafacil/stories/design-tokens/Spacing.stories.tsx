import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { tokens } from "../../design-system/tokens"

function SpacingScale() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Spacing Scale</h2>
      {Object.entries(tokens.spacing).map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <span className="w-12 text-xs font-mono text-muted-foreground">{key}</span>
          <span className="w-16 text-xs font-mono text-muted-foreground">{value}</span>
          <div
            className="bg-primary rounded"
            style={{ width: value, height: "24px" }}
          />
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: "Design Tokens/Spacing",
  component: SpacingScale,
}
export default meta

export const Scale: StoryObj = {
  render: () => <SpacingScale />,
}

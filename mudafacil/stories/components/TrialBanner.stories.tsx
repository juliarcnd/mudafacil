import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TrialBanner } from "../../components/layout/trial-banner"

const meta: Meta = {
  title: "Components/TrialBanner",
  component: TrialBanner,
}
export default meta

export const ManyDaysLeft: StoryObj = {
  render: () => <TrialBanner daysLeft={12} />,
}

export const FewDaysLeft: StoryObj = {
  render: () => <TrialBanner daysLeft={2} />,
}

export const LastDay: StoryObj = {
  render: () => <TrialBanner daysLeft={1} />,
}

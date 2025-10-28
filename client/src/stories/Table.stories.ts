import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { UserTable } from "@/app/components/user-table";

const meta = {
  title: "Components/User Table",
  component: UserTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

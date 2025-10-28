import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { UserTable } from "@/app/components/user-table";
import {
  mockUsers,
  UsersMockProvider,
} from "@/app/components/user-context/__mocks__/user-context.component.mock";

const meta = {
  title: "Components/User Table",
  component: UserTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <UsersMockProvider>
        <Story />
      </UsersMockProvider>
    ),
  ],
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    usersData: mockUsers,
  },
};

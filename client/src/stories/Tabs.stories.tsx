import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, Tab } from "@/app/components/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: [
      <Tab key="users" label="Users">
        <h1>Users</h1>
        <p>Users list</p>
        <p>Pagination</p>
      </Tab>,
      <Tab key="role" label="Role">
        <h1>Role</h1>
        <p>Roles list</p>
      </Tab>,
    ],
  },
};

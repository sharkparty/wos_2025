import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { UserTable } from "@/app/components/user-table";

const meta = {
  title: "Components/User Table",
  component: UserTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    usersData: [
      {
        id: "c7deb881-1939-4208-9a63-61a885f02d8f",
        createdAt: "2024-08-27T23:16:10.554Z",
        updatedAt: "2024-09-03T23:16:10.554Z",
        first: "Mark",
        last: "Tipton",
        roleId: "5237711f-7969-4923-aacc-a623a4e9dac1",
        photo: "https://i.pravatar.cc/400?img=51",
        role: {
          id: "5237711f-7969-4923-aacc-a623a4e9dac1",
          createdAt: "2024-08-27T23:16:10.554Z",
          updatedAt: "2024-08-27T23:16:10.554Z",
          name: "Design",
          isDefault: false,
          description:
            "Designers create the visual and interactive elements of our products and services.",
        },
      },
    ],
  },
};

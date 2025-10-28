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
        id: "c4b5cd99-ceff-4b1a-a00d-8492f6aff791",
        createdAt: "2024-03-15T23:16:10.554Z",
        updatedAt: "2024-08-27T23:16:10.554Z",
        first: "Xavier",
        last: "Fernandez",
        roleId: "6c0a71c0-a5bc-44f8-8634-60f44840d92a",
        role: "Design",
        photo: "https://i.pravatar.cc/400?img=48",
      },
      {
        id: "c7deb881-1939-4208-9a63-61a885f02d81",
        createdAt: "2024-03-12T23:16:10.554Z",
        updatedAt: "2024-08-27T23:16:10.554Z",
        first: "Whitney",
        last: "Morton",
        roleId: "5237711f-7969-4923-aacc-a623a4e9dac1",
        role: "Design",
        photo: "https://i.pravatar.cc/400?img=44",
      },
      {
        id: "0eb78443-4795-4db8-931f-a6efc171e7e9",
        createdAt: "2024-03-08T23:16:10.554Z",
        updatedAt: "2024-08-27T23:16:10.554Z",
        first: "Aaron",
        last: "Bowman",
        roleId: "1a235261-fa93-4845-ab48-ee23895998e6",
        role: "Engineering",
        photo: "https://i.pravatar.cc/400?img=69",
      },
      {
        id: "74a6bd4d-6b69-48e7-a87e-f98497f3ac71",
        createdAt: "2024-03-04T23:16:10.554Z",
        updatedAt: "2024-08-27T23:16:10.554Z",
        first: "Basil",
        last: "Rollins",
        roleId: "36c8de01-e30a-4682-b8cf-962593a8d3b6",
        role: "Design",
        photo: "https://i.pravatar.cc/400?img=6",
      },
      {
        id: "ca9b4d00-a7e3-45b8-b7da-3a39e70e8cbe",
        createdAt: "2024-02-19T23:16:10.554Z",
        updatedAt: "2024-08-27T23:16:10.554Z",
        first: "Julius",
        last: "Rivera",
        roleId: "1a235261-fa93-4845-ab48-ee23895998e6",
        role: "Engineering",
        photo: "https://i.pravatar.cc/400?img=68",
      },
      {
        id: "0d27a858-4136-4391-b29c-2342dec39ff1",
        createdAt: "2024-01-08T23:16:10.554Z",
        updatedAt: "2024-08-27T23:16:10.554Z",
        first: "Riley",
        last: "Baker",
        roleId: "1a235261-fa93-4845-ab48-ee23895998e6",
        role: "Developer Experience",
        photo: "https://i.pravatar.cc/400?img=50",
      },
    ],
  },
};

// .storybook/mocks/UsersMockProvider.tsx
import React, { ReactNode } from "react";
import { UsersContext, User, Role } from "../user-context.component";

export const mockRoles: Role[] = [
  {
    id: "1a235261-fa93-4845-ab48-ee23895998e6",
    name: "Engineering",
    description: "Engineers build and maintain software",
    isDefault: false,
  },
  {
    id: "2b2a1a61-ff99-4e31-8423-df6d4e729ee0",
    name: "Design",
    description: "Designers shape the user experience",
    isDefault: false,
  },
];

export const mockUsers: User[] = [
  {
    id: "c7deb881-1939-4208-9a63-61a885f02d8f",
    first: "Mark",
    last: "Tipton",
    createdAt: "2024-09-03T23:16:10.554Z",
    photo: "https://i.pravatar.cc/400?img=51",
    roleId: mockRoles[0].id,
    role: mockRoles[0],
  },
  {
    id: "b93c22c2-2035-49c7-b9c3-5a2b2a3c4d1f",
    first: "Jane",
    last: "Doe",
    createdAt: "2024-09-03T23:16:10.554Z",
    photo: "https://i.pravatar.cc/400?img=47",
    roleId: mockRoles[1].id,
    role: mockRoles[1],
  },
];

// A mock context value matching your real UsersContextValue shape
export const mockUsersContextValue = {
  users: mockUsers,
  roles: mockRoles,
  isLoading: false,
  page: 1,
  totalPages: 1,
  search: "",
  sort: "",
  setPage: () => console.log("setPage() called"),
  setSearch: () => console.log("setSearch() called"),
  setSort: () => console.log("setSort() called"),
  createUser: async () => {
    console.log("createUser() mock called");
    return mockUsers[0];
  },
  updateUser: async () => {
    console.log("updateUser() mock called");
    return mockUsers[0];
  },
  deleteUser: async (id: string) => {
    console.log(`deleteUser() mock called for ${id}`);
  },
  refresh: async () => console.log("refresh() mock called"),
};

// The provider component for Storybook
export const UsersMockProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: Partial<typeof mockUsersContextValue>;
}) => {
  return (
    <UsersContext.Provider value={{ ...mockUsersContextValue, ...value }}>
      {children}
    </UsersContext.Provider>
  );
};

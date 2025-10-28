import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import useSWR, { mutate as globalMutate } from "swr";
import { fetcher } from "./fetcher.util";

export type UUID = string;

export interface Role {
  id: UUID;
  name: string;
  description?: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: UUID;
  first: string;
  last: string;
  photo?: string;
  roleId: UUID;
  createdAt?: string;
  updatedAt?: string;
  // computed field for UI:
  role?: Role | null;
}

export interface PaginatedUsersResponse {
  data: User[];
  next: number | null;
  prev: number | null;
  pages: number;
}

export interface RolesResponse {
  data: Role[];
  next: null;
  prev: null;
  pages: number;
}

interface UsersContextValue {
  users: User[];
  roles: Role[] | undefined;
  isLoading: boolean;
  page: number;
  totalPages: number;
  search: string;
  sort: string;
  setPage: (p: number) => void;
  setSearch: (s: string) => void;
  setSort: (s: string) => void;
  createUser: (payload: Omit<User, "id" | "role">) => Promise<User>;
  updateUser: (id: UUID, changes: Partial<User>) => Promise<User>;
  deleteUser: (id: UUID) => Promise<void>;
  refresh: () => Promise<void>;
}

export const UsersContext = createContext<UsersContextValue | undefined>(
  undefined,
);
const ROLES_KEY = `/roles/`;

function reconcileRoles(users: User[], roles?: Role[]): User[] {
  if (!roles) return users.map((u) => ({ ...u, role: null }));
  const rmap = new Map(roles.map((r) => [r.id, r]));
  return users.map((u) => ({ ...u, role: rmap.get(u.roleId) ?? null }));
}

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // server determines actual sorting rules

  // Fetch roles (cached for 30min)
  const { data: rolesResp } = useSWR<RolesResponse>(
    ROLES_KEY,
    () => fetcher<RolesResponse>(ROLES_KEY),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30 * 60 * 1000,
    },
  );
  const roles = rolesResp?.data ?? [];

  // Build query for users
  const usersKey = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    return `/users?${params.toString()}`;
  }, [page, search, sort]);

  // Fetch users
  const {
    data: usersResp,
    mutate: mutateUsers,
    isValidating,
  } = useSWR<PaginatedUsersResponse>(
    usersKey,
    (url) => fetcher<PaginatedUsersResponse>(url),
    {
      revalidateOnFocus: true,
      dedupingInterval: 2000,
    },
  );

  const users = useMemo(
    () => reconcileRoles(usersResp?.data ?? [], roles),
    [usersResp?.data, roles],
  );

  const isLoading = !usersResp && !rolesResp;
  const totalPages = usersResp?.pages ?? 1;

  const refresh = useCallback(async () => {
    await Promise.all([globalMutate(ROLES_KEY), mutateUsers()]);
  }, [mutateUsers]);

  // CRUD operations
  const createUser = useCallback(
    async (payload: Omit<User, "id" | "role">) => {
      const res = await fetcher<{ data: User }>(`/users`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await mutateUsers();
      return res.data;
    },
    [mutateUsers],
  );

  const updateUser = useCallback(
    async (id: UUID, changes: Partial<User>) => {
      const res = await fetcher<{ data: User }>(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
      });
      await mutateUsers();
      return res.data;
    },
    [mutateUsers],
  );

  const deleteUser = useCallback(
    async (id: UUID) => {
      await fetcher(`/users/${id}`, { method: "DELETE" });
      await mutateUsers();
    },
    [mutateUsers],
  );

  const value: UsersContextValue = {
    users,
    roles,
    isLoading: isLoading || isValidating,
    page,
    totalPages,
    search,
    sort,
    setPage,
    setSearch,
    setSort,
    createUser,
    updateUser,
    deleteUser,
    refresh,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export function useUsersContext() {
  const ctx = useContext(UsersContext);
  if (!ctx)
    throw new Error("useUsersContext must be used within UsersProvider");
  return ctx;
}

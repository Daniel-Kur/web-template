import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./users.api";
import { toUserRow } from "./users.mapper";
import { useUsersStore } from "@/store/users.store";

export function useUsers() {
  const selectedUserId = useUsersStore((state) => state.selectedUserId);
  const isDetailsDialogOpen = useUsersStore((state) => state.isDetailsDialogOpen);
  const openDetailsDialog = useUsersStore((state) => state.openDetailsDialog);
  const closeDetailsDialog = useUsersStore((state) => state.closeDetailsDialog);

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers(signal),
  });

  const rows = useMemo(() => (usersQuery.data ?? []).map(toUserRow), [usersQuery.data]);

  const selectedUser = useMemo(
    () => rows.find((row) => row.id === selectedUserId) ?? null,
    [rows, selectedUserId],
  );

  return {
    usersQuery,
    rows,
    selectedUser,
    isDetailsDialogOpen,
    openDetailsDialog,
    closeDetailsDialog,
  };
}

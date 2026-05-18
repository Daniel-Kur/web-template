import { UsersDialog } from "./components/UsersDialog";
import { UsersTable } from "./components/UsersTable";
import { useUsers } from "./useUsers";

export function UsersPage() {
  const {
    usersQuery,
    rows,
    selectedUser,
    isDetailsDialogOpen,
    openDetailsDialog,
    closeDetailsDialog,
  } = useUsers();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Users</h2>
        <p className="text-sm text-muted-foreground">
          Feature slice using TanStack Query + mapper + UI-only Zustand state.
        </p>
      </div>
      <UsersTable
        rows={rows}
        isLoading={usersQuery.isLoading}
        isError={usersQuery.isError}
        onRetry={() => usersQuery.refetch()}
        onOpenDetails={openDetailsDialog}
      />
      <UsersDialog
        isOpen={isDetailsDialogOpen}
        user={selectedUser}
        onClose={closeDetailsDialog}
      />
    </section>
  );
}

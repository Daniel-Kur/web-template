import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserRow } from "../users.types";

const LOADING_ROW_IDS = [
  "loading-row-1",
  "loading-row-2",
  "loading-row-3",
  "loading-row-4",
  "loading-row-5",
  "loading-row-6",
] as const;

type UsersTableProps = {
  rows: UserRow[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onOpenDetails: (userId: string) => void;
};

export function UsersTable({
  rows,
  isLoading,
  isError,
  onRetry,
  onOpenDetails,
}: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {LOADING_ROW_IDS.map((rowId) => (
          <Skeleton key={rowId} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Failed to load users.</p>
        <Button className="mt-3" size="sm" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">No users found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b text-left">
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b last:border-b-0">
                <td className="px-3 py-2">{row.fullName}</td>
                <td className="px-3 py-2">{row.email}</td>
                <td className="px-3 py-2 capitalize">{row.roleLabel}</td>
                <td className="px-3 py-2 capitalize">{row.statusLabel}</td>
                <td className="px-3 py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenDetails(row.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

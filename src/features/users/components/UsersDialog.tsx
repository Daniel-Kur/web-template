import { Button } from "@/components/ui/button";
import type { UserRow } from "../users.types";

type UsersDialogProps = {
  isOpen: boolean;
  user: UserRow | null;
  onClose: () => void;
};

export function UsersDialog({ isOpen, user, onClose }: UsersDialogProps) {
  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-4 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-base font-semibold">User details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <dl className="grid grid-cols-[120px_1fr] gap-2 text-sm">
          <dt className="text-muted-foreground">Name</dt>
          <dd>{user.fullName}</dd>
          <dt className="text-muted-foreground">Email</dt>
          <dd>{user.email}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd className="capitalize">{user.roleLabel}</dd>
          <dt className="text-muted-foreground">Status</dt>
          <dd className="capitalize">{user.statusLabel}</dd>
        </dl>
      </div>
    </div>
  );
}

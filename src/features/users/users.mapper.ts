import type { UserDTO } from "./users.dto";
import type { UserRow } from "./users.types";

export const toUserRow = (dto: UserDTO): UserRow => ({
  id: dto.id,
  fullName: `${dto.first_name} ${dto.last_name}`,
  email: dto.email,
  roleLabel: dto.role,
  statusLabel: dto.status,
});

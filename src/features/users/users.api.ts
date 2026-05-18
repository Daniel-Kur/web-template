import { api } from "@/lib/api";
import type { UserDTO } from "./users.dto";

export const fetchUsers = (signal?: AbortSignal): Promise<UserDTO[]> =>
  api.get<UserDTO[]>("/users", { signal });

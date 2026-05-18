import { create } from "zustand";

type UsersUiState = {
  isDetailsDialogOpen: boolean;
  selectedUserId: string | null;
  openDetailsDialog: (userId: string) => void;
  closeDetailsDialog: () => void;
};

export const useUsersStore = create<UsersUiState>((set) => ({
  isDetailsDialogOpen: false,
  selectedUserId: null,
  openDetailsDialog: (userId) =>
    set({
      isDetailsDialogOpen: true,
      selectedUserId: userId,
    }),
  closeDetailsDialog: () =>
    set({
      isDetailsDialogOpen: false,
      selectedUserId: null,
    }),
}));

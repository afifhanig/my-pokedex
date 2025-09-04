import { useConnectivityStore } from "@/src/store/connectivity.store";
import { jsonStorage } from "@/src/utils/platformStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Favorite = { name: string; image: string };

type PendingOp = { type: "add" | "remove"; payload: Favorite };

type FavoritesState = {
  favorites: Favorite[];
  pending: PendingOp[]; // queued when offline
  isFavorite: (name: string) => boolean;
  addFavorite: (p: Favorite) => void;
  removeFavorite: (p: Favorite) => void;
  sync: () => Promise<void>;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      pending: [],
      isFavorite: (name) => get().favorites.some((f) => f.name === name),
      addFavorite: (p) => {
        const online = useConnectivityStore.getState().online;
        const exists = get().favorites.find((f) => f.name === p.name);
        if (!exists) set({ favorites: [...get().favorites, p] });
        if (!online)
          set({ pending: [...get().pending, { type: "add", payload: p }] });
      },
      removeFavorite: (p) => {
        const online = useConnectivityStore.getState().online;
        set({ favorites: get().favorites.filter((f) => f.name !== p.name) });
        if (!online)
          set({ pending: [...get().pending, { type: "remove", payload: p }] });
      },
      async sync() {
        const online = useConnectivityStore.getState().online;
        if (!online) return;
        const ops = get().pending;
        if (ops.length === 0) return;
        set({ pending: [] });
      },
    }),
    {
      name: "favorites",
      storage: jsonStorage,
      skipHydration: false,
      partialize: (state) => state,
    }
  )
);

// Auto-sync when connectivity changes to online
useConnectivityStore.subscribe((state, prev) => {
  if (!prev?.online && state.online) {
    useFavoritesStore.getState().sync();
  }
});

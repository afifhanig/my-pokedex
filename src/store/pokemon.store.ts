import {
  fetchPokemonDetail,
  fetchPokemonPage,
  PokemonDetail,
} from "@/src/services/pokemon.api";
import { create } from "zustand";

type ListState = {
  items: { name: string; id: number; image: string }[];
  nextOffset: number;
  hasMore: boolean;
};

type PokemonState = {
  list: ListState;
  loadingList: boolean;
  errorList?: string;
  loadingDetail: boolean;
  errorDetail?: string;
  details: Record<string, PokemonDetail>;
  fetchPage: () => Promise<void>;
  fetchDetail: (name: string) => Promise<void>;
  resetList: () => void;
};

export const usePokemonStore = create<PokemonState>((set, get) => ({
  list: { items: [], nextOffset: 0, hasMore: true },
  loadingList: false,
  loadingDetail: false,
  details: {},

  async fetchPage() {
    const { list, loadingList } = get();
    if (loadingList || !list.hasMore) return;
    set({ loadingList: true, errorList: undefined });
    try {
      const page = await fetchPokemonPage(list.nextOffset);
      set({
        list: {
          items: [...get().list.items, ...page.items],
          nextOffset: page.nextOffset,
          hasMore: page.hasMore,
        },
      });
    } catch (e: any) {
      set({ errorList: e?.message ?? "Failed to load Pokémon list." });
    } finally {
      set({ loadingList: false });
    }
  },

  async fetchDetail(name: string) {
    const cached = get().details[name];
    if (cached) return;
    set({ loadingDetail: true, errorDetail: undefined });
    try {
      const d = await fetchPokemonDetail(name);
      set({ details: { ...get().details, [name]: d } });
    } catch (e: any) {
      set({ errorDetail: e?.message ?? "Failed to load detail." });
    } finally {
      set({ loadingDetail: false });
    }
  },

  resetList() {
    set({ list: { items: [], nextOffset: 0, hasMore: true } });
  },
}));

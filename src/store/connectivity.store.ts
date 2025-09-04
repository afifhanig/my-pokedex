import { create } from "zustand";

type ConnectivityState = {
  online: boolean;
  setOnline: (v: boolean) => void;
};

export const useConnectivityStore = create<ConnectivityState>()((set) => ({
  online: true,
  setOnline: (v) => set({ online: v }),
}));

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { StateStorage, createJSONStorage } from "zustand/middleware";

// For web, Zustand persist via localStorage; otherwise AsyncStorage
export const persistStorage: StateStorage =
  Platform.OS === "web"
    ? {
        getItem: (name) =>
          Promise.resolve(window.localStorage.getItem(name) ?? null),
        setItem: (name, value) =>
          Promise.resolve(window.localStorage.setItem(name, value)),
        removeItem: (name) =>
          Promise.resolve(window.localStorage.removeItem(name)),
      }
    : {
        getItem: AsyncStorage.getItem,
        setItem: AsyncStorage.setItem,
        removeItem: AsyncStorage.removeItem,
      };

export const jsonStorage = createJSONStorage(() => persistStorage);

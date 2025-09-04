import { useConnectivityStore } from "@/src/store/connectivity.store";
import NetInfo from "@react-native-community/netinfo";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function RootLayout() {
  const setOnline = useConnectivityStore((s) => s.setOnline);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected && !!state.isInternetReachable);
    });

    if (Platform.OS === "web") {
      const update = () => setOnline(navigator.onLine);
      window.addEventListener("online", update);
      window.addEventListener("offline", update);
      update();
      return () => {
        window.removeEventListener("online", update);
        window.removeEventListener("offline", update);
        unsub();
      };
    }
    return () => unsub();
  }, [setOnline]);

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Pokédex" }} />
      <Stack.Screen name="pokemon/[name]" options={{ title: "Detail" }} />
      <Stack.Screen name="favorites" options={{ title: "Favorites" }} />
    </Stack>
  );
}

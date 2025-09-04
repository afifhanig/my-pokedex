/* eslint-disable react-hooks/exhaustive-deps */
import ErrorView from "@/src/components/ErrorView";
import Loader from "@/src/components/Loader";
import { useFavoritesStore } from "@/src/features/favorites/favorites.store";
import { usePokemonStore } from "@/src/store/pokemon.store";
import { theme } from "@/src/theme";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function PokemonDetail() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { details, fetchDetail, loadingDetail, errorDetail } =
    usePokemonStore();
  const detail = details[name!];
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  useEffect(() => {
    if (!detail && name) fetchDetail(name);
  }, [name]);

  if (loadingDetail && !detail) return <Loader />;
  if (errorDetail && !detail)
    return (
      <ErrorView message={errorDetail} onRetry={() => fetchDetail(name!)} />
    );
  if (!detail) return null;

  const fav = isFavorite(detail.name);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ alignItems: "center", gap: 12 }}>
          <Image
            source={{ uri: detail.image }}
            style={{ width: 220, height: 220 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              textTransform: "capitalize",
            }}
          >
            {detail.name}
          </Text>
          <Button
            title={fav ? "Remove from Favorites" : "Add to Favorites"}
            onPress={() => (fav ? removeFavorite(detail) : addFavorite(detail))}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Types</Text>
          <Text>{detail.types.join(", ")}</Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Abilities</Text>
          <Text>{detail.abilities.join(", ")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

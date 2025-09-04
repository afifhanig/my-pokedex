import { useFavoritesStore } from "@/src/features/favorites/favorites.store";
import { Link } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export type PokemonListNode = { name: string; id: number; image: string };

export function PokemonListItem({ item }: { item: PokemonListNode }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isFav = isFavorite(item.name);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite({ name: item.name, image: item.image });
    } else {
      addFavorite({ name: item.name, image: item.image });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 8,
      }}
    >
      {/* Clicking image/text navigates to detail */}
      <Link
        href={{ pathname: "/pokemon/[name]", params: { name: item.name } }}
        asChild
      >
        <Pressable
          style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 64, height: 64, borderRadius: 32 }}
          />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 12,
              textTransform: "capitalize",
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      </Link>

      {/* Favorite toggle button */}
      <TouchableOpacity onPress={toggleFavorite}>
        <Text style={{ fontSize: 20 }}>{isFav ? "★" : "☆"}</Text>
      </TouchableOpacity>
    </View>
  );
}

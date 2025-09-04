import { useFavoritesStore } from "@/src/features/favorites/favorites.store";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavoritesStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={favorites}
        keyExtractor={(it) => it.name}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 32 }}>
            No favorites yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              padding: 12,
              borderRadius: 12,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 56, height: 56 }}
            />
            <Text style={{ textTransform: "capitalize" }}>{item.name}</Text>
            <TouchableOpacity
              style={{ alignSelf: "center", marginLeft: "auto" }}
              onPress={() => {
                removeFavorite(item);
              }}
            >
              <Ionicons name="trash" size={32} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ padding: 12, gap: 8 }}
      />
    </SafeAreaView>
  );
}

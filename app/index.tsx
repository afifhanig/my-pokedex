/* eslint-disable react-hooks/exhaustive-deps */
import ErrorView from "@/src/components/ErrorView";
import Loader from "@/src/components/Loader";
import { PokemonListItem } from "@/src/components/PokemonListItem";
import { useFavoritesStore } from "@/src/features/favorites/favorites.store";
import { usePokemonStore } from "@/src/store/pokemon.store";
import { theme } from "@/src/theme";
import { Link } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const { list, fetchPage, loadingList, errorList, resetList } =
    usePokemonStore();
  const [refreshing, setRefreshing] = useState(false);
  const favorites = useFavoritesStore((s) => s.favorites);
  useEffect(() => {
    if (list.items.length === 0) fetchPage();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    resetList();
    await fetchPage();
    setRefreshing(false);
  }, [resetList, fetchPage]);

  const renderFooter = useMemo(() => {
    if (loadingList) return <Loader />;
    if (errorList)
      return <ErrorView message={errorList} onRetry={() => fetchPage()} />;
    return null;
  }, [loadingList, errorList, fetchPage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View
        style={{
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Pokédex</Text>
        <Link href={{ pathname: "/favorites" }} asChild>
          <Button title={`Favorites (${favorites.length})`} />
        </Link>
      </View>
      <FlatList
        data={list.items}
        keyExtractor={(it) => it.name}
        renderItem={({ item }) => <PokemonListItem item={item} />}
        onEndReached={() => fetchPage()}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 12, gap: 8 }}
      />
    </SafeAreaView>
  );
}

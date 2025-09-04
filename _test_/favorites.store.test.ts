import { act } from "@testing-library/react-native";
import { useFavoritesStore } from "../src/features/favorites/favorites.store";
import { useConnectivityStore } from "../src/store/connectivity.store";

describe("Favorites Store", () => {
  beforeEach(() => {
    // Reset Zustand store state between tests
    useFavoritesStore.setState({ favorites: [], pending: [] });
    useConnectivityStore.setState({ online: true });
  });

  it("should add a favorite when online", () => {
    const pokemon = { name: "pikachu", image: "url" };

    act(() => {
      useFavoritesStore.getState().addFavorite(pokemon);
    });

    expect(useFavoritesStore.getState().favorites).toContainEqual(pokemon);
    expect(useFavoritesStore.getState().pending).toHaveLength(0);
  });

  it("should queue a favorite when offline", () => {
    const pokemon = { name: "charmander", image: "url" };

    act(() => {
      useConnectivityStore.setState({ online: false });
      useFavoritesStore.getState().addFavorite(pokemon);
    });

    expect(useFavoritesStore.getState().favorites).toContainEqual(pokemon);
    expect(useFavoritesStore.getState().pending).toEqual([
      { type: "add", payload: pokemon },
    ]);
  });

  it("should remove a favorite when online", () => {
    const pokemon = { name: "bulbasaur", image: "url" };

    act(() => {
      useFavoritesStore.getState().addFavorite(pokemon);
      useFavoritesStore.getState().removeFavorite(pokemon);
    });

    expect(useFavoritesStore.getState().favorites).not.toContainEqual(pokemon);
    expect(useFavoritesStore.getState().pending).toHaveLength(0);
  });

  it("should queue remove operation when offline", () => {
    const pokemon = { name: "squirtle", image: "url" };

    act(() => {
      useFavoritesStore.getState().addFavorite(pokemon);
      useConnectivityStore.setState({ online: false });
      useFavoritesStore.getState().removeFavorite(pokemon);
    });

    expect(useFavoritesStore.getState().favorites).not.toContainEqual(pokemon);
    expect(useFavoritesStore.getState().pending).toEqual([
      { type: "remove", payload: pokemon },
    ]);
  });

  it("should clear pending ops on sync when online", async () => {
    const pokemon = { name: "eevee", image: "url" };

    act(() => {
      useConnectivityStore.setState({ online: false });
      useFavoritesStore.getState().addFavorite(pokemon);
    });

    expect(useFavoritesStore.getState().pending).toHaveLength(1);

    await act(async () => {
      useConnectivityStore.setState({ online: true });
      await useFavoritesStore.getState().sync();
    });

    expect(useFavoritesStore.getState().pending).toHaveLength(0);
  });
});

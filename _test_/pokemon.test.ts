// __tests__/pokemonApi.test.ts
import { toPokemonId } from "@/src/utils/toPokemonId";
import { api } from "../src/services/api";
import {
  fetchPokemonDetail,
  fetchPokemonPage,
} from "../src/services/pokemon.api";

jest.mock("../src/services/api", () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock("@/src/utils/toPokemonId", () => ({
  toPokemonId: jest.fn((url: string) => {
    // fallback stub: extract number from URL
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : 0;
  }),
  artworkUrl: jest.fn((id: number) => `https://pokeimg/${id}.png`),
}));

describe("Pokemon API utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchPokemonPage should return mapped items with pagination info", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
        next: "https://pokeapi.co/api/v2/pokemon?offset=24&limit=24",
      },
    });

    const result = await fetchPokemonPage(0, 24);

    expect(api.get).toHaveBeenCalledWith("/pokemon", {
      params: { offset: 0, limit: 24 },
    });
    expect(toPokemonId).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/1/"
    );
    expect(result.items[0]).toEqual({
      name: "bulbasaur",
      id: 1,
      image: "https://pokeimg/1.png",
    });
    expect(result.hasMore).toBe(true);
    expect(result.nextOffset).toBe(24);
  });

  it("fetchPokemonDetail should return transformed Pokemon detail", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 25,
        name: "pikachu",
        types: [{ type: { name: "electric" } }],
        abilities: [
          { ability: { name: "static" } },
          { ability: { name: "lightning-rod" } },
        ],
        sprites: {
          other: {
            "official-artwork": { front_default: "https://pokeimg/pika.png" },
          },
        },
      },
    });

    const result = await fetchPokemonDetail("pikachu");

    expect(api.get).toHaveBeenCalledWith("/pokemon/pikachu");
    expect(result).toEqual({
      name: "pikachu",
      types: ["electric"],
      abilities: ["static", "lightning-rod"],
      image: "https://pokeimg/pika.png",
    });
  });
});

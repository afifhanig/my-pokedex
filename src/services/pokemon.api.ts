import { artworkUrl, toPokemonId } from "@/src/utils/toPokemonId";
import { api } from "./api";

export type PokeListResponse = {
  results: { name: string; url: string }[];
  next: string | null;
};

export async function fetchPokemonPage(offset = 0, limit = 24) {
  console.log("Fetching Pokémon page at offset", offset);
  const { data } = await api.get<PokeListResponse>(`/pokemon`, {
    params: { offset, limit },
  });
  console.log("got the data", data);
  const items = data.results.map((r) => {
    const id = toPokemonId(r.url);
    return { name: r.name, id, image: artworkUrl(id) };
  });
  return { items, hasMore: !!data.next, nextOffset: offset + limit };
}

export type PokemonDetail = {
  name: string;
  types: string[];
  abilities: string[];
  image: string;
};

export async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  const { data } = await api.get(`/pokemon/${name}`);
  return {
    name: data.name,
    types: data.types.map((t: any) => t.type.name),
    abilities: data.abilities.map((a: any) => a.ability.name),
    image: data.sprites.other["official-artwork"].front_default,
  };
}

export const toPokemonId = (url: string) => {
  // PokeAPI URLs end with /pokemon/{id}/
  const parts = url.split("/").filter(Boolean);
  const id = Number(parts[parts.length - 1]);
  return id;
};

export const artworkUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

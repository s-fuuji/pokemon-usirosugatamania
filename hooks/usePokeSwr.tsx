
import useSWR from "swr";
import { fetcher, fetcherAll } from "../utils/fetcher";

export const usePokeSWR = () => {
  /*　ポケモンの名前と詳細ページのurlだけを取得したデータ*/
  const { data: pokemonListsData, error: pokemonListDataError } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=40",
    fetcher
  );

  const pokemonListDataUrl = pokemonListsData?.results.map((pd: any) => {
    return pd.url;
  });

  /* 上で取得したurlをもとに、ポケモンの詳細情報を取得したデータ */

  const { data: pokemonList, error: pokemonListError } = useSWR(
    pokemonListDataUrl ? pokemonListDataUrl : null,
    fetcherAll
  );



  return { pokemonList, pokemonListError };
};

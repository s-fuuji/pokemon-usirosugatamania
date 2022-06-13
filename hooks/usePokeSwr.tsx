
import useSWR from "swr";
import { fetcher, fetcherAll } from "../utils/fetcher";

export const usePokeSWR = () => {
  /*　ポケモンの名前と詳細ページのurlだけを取得したデータ*/
  const { data: pokesData, error: pokeDataError } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=40",
    fetcher
  );

  const pokeDataUrl = pokesData?.results.map((pd: any) => {
    return pd.url;
  });

  /* 上で取得したurlをもとに、ポケモンの詳細情報を取得したデータ */

  const { data: poke, error: pokeError } = useSWR(
    pokeDataUrl ? pokeDataUrl : null,
    fetcherAll
  );



  return { poke, pokeError };
};

import useSWR from "swr";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return await res.json();
};

const fetcherAll = (...urls) => {
  const f = (url) => fetch(url).then((r) => r.json());
  return Promise.all(urls.map(f));
};

export const usePokeSWR = () => {
  const { data: pokesData, error: pokeDataError } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=40",
    fetcher
  );

  const pokeDataUrl = pokesData?.results.map((pd) => {
    return pd.url;
  });

  const { data: poke, error: pokeError } = useSWR(
    pokeDataUrl ? pokeDataUrl : null,
    fetcherAll
  );

  return { poke, pokeError };
};

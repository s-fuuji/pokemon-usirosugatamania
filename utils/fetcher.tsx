export const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const fetcherAll = (...urls: string[]) => {
  return Promise.all(urls.map(fetcher));
};

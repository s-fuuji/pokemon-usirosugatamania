export const fetcher = async (...args) => {
  const res = await fetch(...args);
  return await res.json();
};

export const fetcherAll = (...urls) => {
  const f = (url) => fetch(url).then((r) => r.json());
  return Promise.all(urls.map(f));
};

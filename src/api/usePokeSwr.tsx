import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
export const fecher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const fetcherAll = (...urls: string[]) => {
  return Promise.all(
    urls.map(async (url: string) => {
      const res = await fetch(url)
      return res.json()
    })
  )
}

export const usePokeSWR = () => {
  const pokemonListDataUrl = [...Array(151)].map((noUse, index) => {
    return `https://pokeapi.co/api/v2/pokemon/${index + 1}/`
  })

  const { data: pokemonList, error: pokemonListError } = useSWRImmutable(
    pokemonListDataUrl,
    fetcherAll
  )

  const isLoading = !pokemonList && !pokemonListError
  const error = pokemonListError

  return { pokemonList, error, isLoading }
}

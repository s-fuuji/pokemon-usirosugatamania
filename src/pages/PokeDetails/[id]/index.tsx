import { GetStaticProps } from 'next'
import { SWRConfig } from 'swr'
import { PokeDetailPage } from '../../../components/model/Quiz/PokeDetail'

export const getStaticPaths = async () => {
  const paths = [...Array(151)].map((noUse, index) => {
    const trueIndex = index + 1
    return { params: { id: trueIndex.toString() } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { id } = context.params
  const pokemonListUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
  const pokeURL = await fetch(pokemonListUrl)
  const pokeList = await pokeURL.json()

  return {
    props: {
      fallback: {
        [pokemonListUrl]: pokeList,
      },
    },
  }
}

function PokeDetails(props: any) {
  const { fallback } = props
  return (
    <SWRConfig value={{ fallback }}>
      <PokeDetailPage />
    </SWRConfig>
  )
}

export default PokeDetails

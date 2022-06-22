import { PokeCard } from "../../../components/util/PokeCard";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next/types";
import { GetServerSideProps } from "next/types";
import React from 'react';
import { fetcherAll, usePokeSWR } from "../../../hooks/usePokeSwr";
import { SWRConfig } from "swr";


export const getStaticPaths = async () => {
  const paths = [...Array(40)].map((noUse, index) => {
    const trueIndex = index + 1;
    return { params: { id: trueIndex.toString() } }
  });
  return {
    paths,
    fallback: false,
  }
};



export const getStaticProps: GetStaticProps = async (context: any) => {

  const { id } = context.params;
  const pokemonListUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokeURL = await fetch(pokemonListUrl);
  const pokeList = await pokeURL.json();


  return {
    props: {
      fallback: {
        [pokemonListUrl]: pokeList,
      },
    },
  };
}




const PokeSingle: NextPage = function (props: any) {
  const { fallback } = props;
  console.log(fallback);

  const { pokemonList, error, isLoading } = usePokeSWR();
  const id = Number(useRouter().query.id) - 1;
  const pokemonListId = pokemonList ? pokemonList[id] : [];

  const indexId = Number(id) + 1;
  if (isLoading) {
    console.log("loading");

    return <div>loading</div>
  }

  return (
    <SWRConfig value={{ fallback }}>
      <div className="flex justify-center">
        <PokeCard
          imgUrl={pokemonListId.sprites.back_default}
          link="/"
          index={indexId}
        />
        {pokemonListId.sprites.back_female && (
          <PokeCard
            imgUrl={pokemonListId.sprites.back_female}
            link="/"
            index={indexId}
          />
        )}
      </div>
    </SWRConfig>
  );
};

export default PokeSingle;

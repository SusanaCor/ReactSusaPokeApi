import React, { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemons = async (limit = 21, offset = 0) => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const rest = await fetch(baseURL);
    const data = await rest.json();

    return data;
  };

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
 const sizePage= 20
  const fechPokemons = async () => {
    const response = await getAllPokemons(sizePage, sizePage * page);
    const lists = response.results.map(async (pokemones) => {
      const response = await fetch(pokemones.url);
      const lisPokemons = await response.json();
      return lisPokemons;
    });
    setAllPokemons(await Promise.all(lists));
    setTotal(Math.ceil(response.count / sizePage));
  };
  useEffect(() => {
    fechPokemons();
  }, [page]);

  const searchPokemons = async (pokemones) => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemones}`;
    const response = await fetch(baseUrl);
    const list = response.json();
    return list;
  };

  const getPokemonsByID = async (id) => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(baseURL);
    const list = await response.json();
    return list;
  };

  return (
    <PokemonContext.Provider
      value={{
        searchPokemons,
        allPokemons,
        getPokemonsByID,
        setPage,
        page,
        total,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

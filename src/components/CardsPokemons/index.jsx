import React from "react";
import { Link } from "react-router-dom";
import ".././CardsPokemons/styles.css";
const CardsPokemons = ({ pokemones }) => {
  return (
    <div className="cardT">
      <p className="">#{pokemones.id} </p>
      <p>{pokemones.name}</p>
      <Link to={`searchPokemon/${pokemones.id}`}>
        <div id="card-img">
          <img src={pokemones.sprites.back_default} alt="" id="prueba" />
        </div>
      </Link>

      <p className={pokemones.types?.[0]?.type.name}>
        {pokemones.types?.[0]?.type.name}
      </p>

      <p id="typeB" className={pokemones.types?.[1]?.type.name}>
        {pokemones.types?.[1]?.type.name}
      </p>
    </div>
  );
};

export default CardsPokemons;

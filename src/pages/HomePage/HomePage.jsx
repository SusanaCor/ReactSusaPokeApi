import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import "../HomePage/style.css";
import CardsPokemons from "../../components/CardsPokemons";
import { PokemonContext } from "../../components/Contexto/PokemonContext";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

export const HomePage = () => {
  const { allPokemons } = useContext(PokemonContext);
  const { searchPokemons, page, total, setPage } = useContext(PokemonContext);
  const [savePokemons, setSavePokemons] = useState("");
  const [pokemons, SetPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (savePokemons.trim() === "") {
      Swal.fire({
        text: "Add Pokemon name !!!",
        imageUrl:
          "https://www.bing.com/th?id=OIP.9L_lGQL-gjDf-qfm33eEdgHaJN&pid=3.1&cb=&w=300&h=300&p=0",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      const data = await searchPokemons(savePokemons);
      SetPokemons(data);
      setLoading(false);
    }
  };

  //Constantes mover paginas
  const btnVolver = () => {
    setLoading(true);
  };

  const back = () => {
    setPage(Math.max(page - 1, 0));
  };

  const next = () => {
    setPage(Math.min(page + 1, total));
  };

  const handleInput = (e) => {
    setSavePokemons(e.target.value);
  };

  return (
    <>
      <div className="logo">
        <h1>░P░O░K░E░D░E░X░ ░ ░S░U░S░A░N░A░</h1>
      </div>

      {loading ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              className="input"
              placeholder="Buscar tu Pokemon Favorito"
              type="text"
              id="inputV"
              onChange={handleInput}
            />
            <button className="btnBuscar">Buscar</button>
          </form>

          <div className="containerPokemons">
            {allPokemons.map((pokemones) => (
              <CardsPokemons pokemones={pokemones} />
            ))}
          </div>
          <div className="botones">
            <Navigation page={page} total={total} back={back} next={next} />
          </div>
        </>
      ) : (
        <>
        <h2>Name</h2>
         <p>{pokemons.name}</p>
         <h2>ID</h2>
              <p>{pokemons.id}</p>
              <p>
                <h2>Type</h2>
                <span>{pokemons.types?.[0]?.type?.name}</span>
                <span>{pokemons.types?.[1]?.type?.name}</span>
              </p>
          <h2>Altura</h2>
          <span>{pokemons.height}CM</span>
          <h2>Peso</h2>
          <span>{pokemons.weight}KG</span>

          <Link to={`searchPokemon/${pokemons.id}`}>
            <div>
             
              {pokemons.sprites && (
                <img
                  src={pokemons.sprites.other.home.front_default}
                  alt=""
                  id="imgPokemons"
                />
              )}
            </div>
          </Link>
          <button onClick={btnVolver}>volver</button>
        </>
      )}
    </>
  );
};

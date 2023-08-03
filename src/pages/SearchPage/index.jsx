import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../components/Contexto/PokemonContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../SearchPage/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PokemonPage = () => {
  const { getPokemonsByID } = useContext(PokemonContext);
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  const fechPokemonsById = async (id) => {
    const response = await getPokemonsByID(id);
    setPokemons(response);
  };
  //cambio de pagina
  useEffect(() => {
    fechPokemonsById(id);
  }, [id]);
  const onClick = () => {
    navigate("/");
  };
  // cargar Evolution 0
  const [evolution0, setEvolution0] = useState([]);
  const [evolution0Name, setEvolution0Name] = useState([]);
  const [evolutionId0, setEvolutionId0] = useState([]);

  // cargar Evolution 1
  const [evolution1, setEvolution1] = useState([]);
  const [evolution1Name, setEvolution1Name] = useState([]);
  const [evolutionId1, setEvolutionId1] = useState([]);

  // cargar Evolution 2
  const [evolution2, setEvolution2] = useState([]);
  const [evolution2Name, setEvolution2Name] = useState([]);
  const [evolutionId2, setEvolutionId2] = useState([]);

  ///funcion para extraer las evoluciones
  const fechPokemonsEvolutions = async (id) => {
    const response = await getPokemonsByID(id);
    const responseSpecie = await fetch(response.species?.url);
    const responseSpecieJson = await responseSpecie.json();

    const evolutions = await fetch(responseSpecieJson?.evolution_chain?.url);
    const evolutionsJson = await evolutions.json();

    const evolutions0 = evolutionsJson?.chain?.species?.name;
    setEvolution0Name(evolutions0);
    responseImg(evolutions0, setEvolution0, setEvolutionId0);

    const evolutions1 = evolutionsJson.chain.evolves_to[0]?.species?.name;
    setEvolution1Name(evolutions1);
    responseImg(evolutions1, setEvolution1, setEvolutionId1);

    const evolutions2 =
      evolutionsJson.chain.evolves_to[0]?.evolves_to[0]?.species?.name;
    setEvolution2Name(evolutions2);
    responseImg(evolutions2, setEvolution2, setEvolutionId2);
  };

  const responseImg = async (id, setImage, setIdPokemons) => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(baseUrl);
    const imgsEvolutions = await response.json();
    setIdPokemons(imgsEvolutions.id);
    setImage(imgsEvolutions.sprites.other.dream_world.front_default);
  };

  useEffect(() => {
    fechPokemonsEvolutions(id);
  }, []);

  return (
    <div>
      <button onClick={onClick}>Home</button> <br /> <br />
      <center>
      <div id="Search">
 
      <p className="ti">{pokemons.name}</p>
     
      </div>

   
  
      <div>
        {pokemons.sprites && (
          <img src={pokemons.sprites.other.home.front_default} alt="" id="imgSearch" />
        )}
      </div>

      </center>
     
      {/* Diseños de evoluciones y evluciones*/}
      <div className="container-stats">
        <h1 className="esta">Estadisticas </h1> <br />
        <p>
          hp:{" "}
          <ProgressBar
            variant="success"
            animated
            now={pokemons.stats?.[0]?.base_stat}
            label={`${pokemons.stats?.[0]?.base_stat}%`}
          />
        </p>
        <p>
          atack:{" "}
          <ProgressBar
            animated
            now={pokemons.stats?.[1]?.base_stat}
            label={`${pokemons.stats?.[1]?.base_stat}%`}
          />
        </p>
        <p>
          defense:{" "}
          <ProgressBar
            variant="warning"
            animated
            now={pokemons.stats?.[2]?.base_stat}
            label={`${pokemons.stats?.[2]?.base_stat}%`}
          />
        </p>
        <p>
          special-atack:{" "}
          <ProgressBar
            variant="dark"
            animated
            now={pokemons.stats?.[3]?.base_stat}
            label={`${pokemons.stats?.[3]?.base_stat}%`}
          />
        </p>
        <p>
          special-defense:{" "}
          <ProgressBar
            variant="info"
            animated
            now={pokemons.stats?.[4]?.base_stat}
            label={`${pokemons.stats?.[4]?.base_stat}%`}
          />{" "}
        </p>
        <p>
          speed:{" "}
          <ProgressBar
            variant="danger"
            animated
            now={pokemons.stats?.[5]?.base_stat}
            label={`${pokemons.stats?.[5]?.base_stat}%`}
          />{" "}
        </p>
      </div>
      <h1 className="tituEvo">Evoluciones</h1>
      <div className="containerEvolutions">
        <div>
          <Link to={`/searchPokemon/${evolutionId0}`}>
            <p>{evolution0Name}</p>
            <img src={evolution0} alt="" className="imgsEvolutions" />
          </Link>
        </div>
        <div>
          <Link to={`/searchPokemon/${evolutionId1}`}>
            <p>{evolution1Name}</p>
            <img src={evolution1} alt="" className="imgsEvolutions" />
          </Link>
        </div>
        <div>
          <Link to={`/searchPokemon/${evolutionId2}`}>
            <p>{evolution2Name}</p>
            <img src={evolution2} alt="" className="imgsEvolutions" />
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
};

export default PokemonPage;

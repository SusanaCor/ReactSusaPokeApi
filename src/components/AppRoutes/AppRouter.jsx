import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "../NavBar";
import { HomePage } from "../../pages/HomePage/HomePage";
import PokemonPage from "../../pages/SearchPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path="searchPokemon/:id" element={<PokemonPage />} />
      </Route>
    </Routes>
  );
};

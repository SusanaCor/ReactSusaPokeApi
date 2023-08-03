import React from "react";
import { AppRouter } from "./components/AppRoutes/AppRouter";
import { PokemonProvider } from "./components/Contexto/PokemonProvider";

const App = () => {
  return (
    <div className="App">
      <PokemonProvider>
        <AppRouter />
      </PokemonProvider>
    </div>
  );
};

export default App;

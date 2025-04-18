"use client";

import Pkmn from "public/data/pkmn.json";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPkmn = Pkmn.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex items-center justify-center sm:items-start">
      <div className="w-75 mt-3">
        <div className="flex mb-3">
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>window.location.href = `/`}>Menu Inicial</button>
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>window.location.href = `/pkmn/list`}>Cadastrados</button>
        </div>
        <div className="sticky top-0 bg-neutral-950 z-10">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
        </div>
        <div>
          {filteredPkmn.map((pokemon, index) => (
            <div key={index} className="flex items-center justify-between p-2 border-b">
            <button className="text-white capitalize bg-red-900  hover:bg-red-800 w-full cursor-pointer" onClick={()=>openPokemonPage(pokemon.id)} key={index}>{pokemon.name}</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function openPokemonPage(id) {
  window.location.href = `register/${id}`;
}

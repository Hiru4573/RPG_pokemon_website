"use client";

import Pkmn from "public/data/pkmn.json"; 
import { useParams } from 'next/navigation'
import { useState } from "react";

export default function Home() {
  const { id } = useParams();
  const selectedPkmn = Pkmn.find((pokemon) => pokemon.id === parseInt(id));
  let lastId = parseInt(id) - 1 == 0? 721 : parseInt(id) - 1;
  let nextId = parseInt(id) + 1 == 722? 1 : parseInt(id) + 1;

  return (
    <main className="flex items-center justify-center">
      <div>
      <button className="text-white capitalize bg-red-900 hover:bg-red-800 w-full cursor-pointer" onClick={()=>window.location.href = `/pkmn/new`}>retornar</button>
      <div>
          <div className="flex items-center justify-between p-2 border-b">
          <button className="text-white capitalize bg-red-500 w-5 cursor-pointer" onClick={()=>{openPokemonPage(lastId)}}>{'<'}</button>
          <span className="text-white text-center capitalize bg-red-900 w-full">{selectedPkmn.name}</span>
          <button className="text-white capitalize bg-red-500 w-5 cursor-pointer" onClick={()=>{openPokemonPage(nextId)}}>{'>'}</button>
          </div>
          <div>
            <img
              src={selectedPkmn.sprites.front_default}
              className="w-48 h-48 object-contain "
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function openPokemonPage(id) {
  window.location.href = `/pkmn/register/${id}`;
}

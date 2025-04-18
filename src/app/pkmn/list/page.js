"use client";

import Pkmn from "public/data/pkmn.json"; 
import { useParams } from 'next/navigation'
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <button className="text-white capitalize bg-red-900 hover:bg-red-800 w-full cursor-pointer" onClick={()=>window.location.href = `/`}>retornar</button>
      <div>
      </div>
    </main>
  );
}

function openPokemonPage(id) {
  window.location.href = `/pkmn/register/${id}`;
}

"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center p-10">
      <div className="w-100">
        <button
          className="text-white capitalize bg-red-900 hover:bg-red-800 w-full p-2 cursor-pointer"
          onClick={() => (window.location.href = `/pkmn/new`)}
        >
          Novo Pokémon 
        </button>
        <button
          className="text-white capitalize bg-red-900 hover:bg-red-800 w-full mt-4 p-2 cursor-pointer"
          onClick={() => (window.location.href = `/pkmn/list`)}
        >
          Listar Pokémons Cadastrados 
        </button>
      </div>
    </main>
  );
}

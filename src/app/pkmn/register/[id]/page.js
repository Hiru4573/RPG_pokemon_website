"use client";

import Pkmn from "public/data/pkmn.json"; 
import attacks from "public/data/attacks.json"; 
import { useParams } from 'next/navigation'
import { useState } from "react";

export default function Home() {
  const { id } = useParams();
  const selectedPkmn = Pkmn.find((pokemon) => pokemon.id === parseInt(id));

  let lastId = parseInt(id) - 1 == 0? 721 : parseInt(id) - 1;
  let nextId = parseInt(id) + 1 == 722? 1 : parseInt(id) + 1;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState(selectedPkmn.types);
  const [selectedAttacks, setSelectedAttacks] = useState([]);

  function handleTypeClick(attack) {
    setSelectedAttacks((prevSelectedAttacks) => [...prevSelectedAttacks, attack]);
    setDropdownOpen(false)
  }

  return (
    <main className="flex items-center justify-center">
      <div className="w-100 mt-3">
        <div className="flex mb-3">
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>window.location.href = `/pkmn/new`}>novo</button>
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>window.location.href = `/pkmn/list`}>Cadastrados</button>
        </div>
      <div>
        <div className="flex items-center justify-between p-2 border-b">
          <button className="text-white capitalize bg-red-500  hover:bg-red-600 w-5 cursor-pointer" onClick={()=>{openPokemonPage(lastId)}}>{'<'}</button>
          <span className="text-white text-center capitalize bg-red-900 w-full">{selectedPkmn.name}</span>
          <button className="text-white capitalize bg-red-500  hover:bg-red-600 w-5 cursor-pointer" onClick={()=>{openPokemonPage(nextId)}}>{'>'}</button>
        </div>
        <div className="flex items-center justify-center m-2">
          <img
            src={selectedPkmn.sprites.front_default}
            className="w-48 h-48 object-contain "
          />
        </div>
        <div className="w-full">
            <button
              className="text-white capitalize bg-red-900 hover:bg-red-800 w-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Escolher ataques
            </button>
            {dropdownOpen && (
              <div className="bg-neutral-950 border border-gray-300 mt-1 w-full z-10">
              <input
                type="text"
                placeholder="Search attacks..."
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => {
                  const newFilteredTypes = attacks.filter((type) =>
                    type.name.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setFilteredTypes(newFilteredTypes);
                }}
              />
                {filteredTypes.slice(0,10).map((type, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 hover:bg-neutral-800 capitalize"
                    onClick={() => handleTypeClick(type)}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            )}
        </div>
        <div className="p-2">
            <div className="mt-4"></div>
              <h3 className="text-white capitalize bg-red-900 p-2">Selected Attacks:</h3>
              <div className="bg-cream-white p-2">
                {selectedAttacks.map((attack, index) => (
                  <div key={index} className="flex flex-col items-center justify-between mb-2">
                    <img
                      src={`/attacks/${attack.img_name}.jpg`}
                      className=" object-contain"
                    />
                    <button
                      className="text-white bg-red-500 px-2 py-1 mt-2 rounded"
                      onClick={() => {
                        setSelectedAttacks((prevSelectedAttacks) =>
                          prevSelectedAttacks.filter((a) => a !== attack)
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}

function openPokemonPage(id) {
  window.location.href = `/pkmn/register/${id}`;
}

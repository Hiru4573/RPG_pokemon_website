"use client";

import Pkmn from "public/data/pkmn.json"; 
import attacks from "public/data/attacks.json"; 
import { useParams } from 'next/navigation'
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const { id } = useParams();
  const selectedPkmn = Pkmn.find((pokemon) => pokemon.id === parseInt(id));

  let lastId = parseInt(id) - 1 == 0 ? 721 : parseInt(id) - 1;
  let nextId = parseInt(id) + 1 == 722 ? 1 : parseInt(id) + 1;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredAttacks, setfilteredAttacks] = useState(selectedPkmn.types);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([
    { name: "STRENGTH", value: 0, color: "bg-blue-500"},
    { name: "DEXTERITY", value: 0, color: "bg-blue-500" },
    { name: "VITALITY", value: 0, color: "bg-blue-500" },
    { name: "SPECIAL", value: 0, color: "bg-blue-500" },
    { name: "INSIGHT", value: 0, color: "bg-blue-500" },
    
    { name: "TOUGH", value: 0, color: "bg-green-500" },
    { name: "COOL", value: 0, color: "bg-green-500" },
    { name: "BEAUTY", value: 0, color: "bg-green-500" },
    { name: "CUTE", value: 0, color: "bg-green-500" },
    { name: "CLEVER", value: 0, color: "bg-green-500" },

    { name: "BRAWL", value: 0, color: "bg-red-500" },
    { name: "CHANNEL", value: 0, color: "bg-red-500" },
    { name: "CLASH", value: 0, color: "bg-red-500" },
    { name: "EVASION", value: 0, color: "bg-red-500" },

    { name: "ALERT", value: 0, color: "bg-red-500" },
    { name: "ATHLETIC", value: 0, color: "bg-red-500" },
    { name: "NATURE", value: 0, color: "bg-red-500" },
    { name: "STEALTH", value: 0, color: "bg-red-500" },

    { name: "ALLURE", value: 0, color: "bg-red-500" },
    { name: "ETIQUETTE", value: 0, color: "bg-red-500" },
    { name: "INTIMIDATE", value: 0, color: "bg-red-500" },
    { name: "PERFORM", value: 0, color: "bg-red-500" },
    
    { name: "HAPPINESS", value: 0, color: "bg-fuchsia-700" },
    { name: "LOYALTY", value: 0, color: "bg-fuchsia-700" },
  ]);
  const [nickname, setNickname] = useState(selectedPkmn.name.charAt(0).toUpperCase() + selectedPkmn.name.slice(1));
  const [ability, setAbility] = useState("");

  function handleTypeClick(attack) {
    setSelectedAttacks((prevSelectedAttacks) => [...prevSelectedAttacks, attack]);
    setDropdownOpen(false);
  }

  function handleRangeChange(index, value) {
    setSelectedRanges((prevRanges) => {
      const newRanges = [...prevRanges];
      newRanges[index] = { ...newRanges[index], value: value };
      return newRanges;
    });
  }

  function handleSave() {
    const selectedAttackIds = selectedAttacks.map((attack) => attack.id);
    const data = { id_dex: parseInt(id), attacks: selectedAttackIds, trainer_id: 1, nickname: nickname, ranges: selectedRanges };
    console.log(JSON.stringify(data));
  }

  const rangesVal = [1, 2, 3, 4, 5]

  return (
    <main className="flex items-center justify-center">
      <div className="w-100 mt-3">
        <div className="flex mb-1">
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>window.location.href = `/pkmn/new`}>novo</button>
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>window.location.href = `/pkmn/list`}>Cadastrados</button>
        </div>
      <div>
        <div className="flex mb-1 items-center justify-between p-2 border-b">
          <button className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer" onClick={()=>handleSave()}>Salvar</button>
        </div>
        
        <div className="flex items-center justify-between"></div>
          <label htmlFor="nickname" className="mr-2">Nickname:</label>
          <input
            id="nickname"
            type="text"
            className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter nickname"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </div>

        
        <div className="flex items-center justify-between mt-2"></div>
          <label htmlFor="ability" className="mr-2">Ability:</label>
          <input
            id="ability"
            type="text"
            className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter ability"
            onChange={(e) => setAbility(e.target.value)}
            value={ability}
          />

        <div className="flex items-center justify-between p-2 mt-3 border-t">
          <button className="text-white capitalize bg-red-500  hover:bg-red-600 w-5 cursor-pointer" onClick={()=>{openPokemonPage(lastId)}}>{'<'}</button>
          <span className="text-white text-center capitalize bg-red-900 w-full">{selectedPkmn.name}</span>
          <button className="text-white capitalize bg-red-500  hover:bg-red-600 w-5 cursor-pointer" onClick={()=>{openPokemonPage(nextId)}}>{'>'}</button>
        </div>

        <div className="flex items-center justify-center m-2">
        <Image
          src={selectedPkmn.sprites.front_default}
          alt={`${selectedPkmn.name} sprite`}
          width={192} // Adjust width as needed
          height={192} // Adjust height as needed
          className="object-contain"
        />
        
        </div>

        
          <div className="flex flex-col w-full px-2">
          {selectedRanges.map((range, index) => (
            <div key={index} className={`flex ${range.color} items-center justify-between mb-2`}>
            <span className="text-white mr-2 ">{range.name}:</span>
            <div className="flex">
              <button
                key={0}
                className={`w-6 h-6 rounded-full mx-1 ${
                0 <= range.value ? 'bg-red-500' : 'bg-gray-500'
                } hover:bg-red-500 focus:outline-none`}
                onClick={() => handleRangeChange(index, 0)}
              >
              </button>
              {rangesVal.map((value) => (
              <button
                key={value}
                className={`w-6 h-6 rounded-full mx-1 ${
                value <= range.value ? 'bg-red-500' : 'bg-gray-500'
                } hover:bg-red-500 focus:outline-none`}
                onClick={() => handleRangeChange(index, value)}
              >
                {value}
              </button>
              ))}
            </div>
            </div>
          ))}
          </div>

          
        <div className="w-full">
            <button
              className="text-white capitalize bg-red-900 hover:bg-red-800 w-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Escolher ataques
            </button>
            {dropdownOpen && (
              <div className="border border-gray-300 mt-1 w-full z-10">
              <input
                type="text"
                placeholder="Search attacks..."
                className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => {
                  const newfilteredAttacks = attacks.filter((type) =>
                    type.name.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setfilteredAttacks(newfilteredAttacks);
                }}
              />
                {filteredAttacks.slice(0,10).map((type, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 dark:hover:bg-neutral-800 hover:bg-yellow-200 capitalize"
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
              <h3 className="text-white capitalize bg-red-900 p-2">Ataques Selecionados:</h3>
              <div className="bg-cream-white p-2">
                {selectedAttacks.map((attack, index) => (
                  <div key={index} className="flex flex-col items-center justify-between mb-2">
                    <Image
                      src={`/attacks/${attack.img_name}.jpg`}
                      alt={`attacks-${attack.img_name}`}
                      className="object-contain"
                      width={500}
                      height={0}
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
    </main>
  );
}

function openPokemonPage(id) {
  window.location.href = `/pkmn/register/${id}`;
}

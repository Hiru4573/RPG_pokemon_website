"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationButtons from "@/components/NavigationButtons";
import PokemonDetails from "@/components/PokemonDetails";
import RangeList from "@/components/RangeList";
import AttackSelector from "@/components/AttackSelector";

export default function PokemonDetailsPage() {
  const { id } = useParams(); // Get the Pokémon ID from the URL
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  // State for additional components
  const [nickname, setNickname] = useState("");
  const [ability, setAbility] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredAttacks, setfilteredAttacks] = useState([]);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([
    { name: "STRENGTH", value: 0, color: "bg-blue-500" },
    { name: "DEXTERITY", value: 0, color: "bg-blue-500" },
    { name: "VITALITY", value: 0, color: "bg-blue-500" },
  ]);
  const rangesVal = [1, 2, 3, 4, 5];

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(`/api/pkmn/get/${id}`); // Fetch data for the specific Pokémon
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPokemonData(result[0]); // Set the fetched Pokémon data
        setNickname(result[0]?.nickname || ""); // Set nickname from fetched data
        setSelectedAttacks(result[0]?.attacks || ""); // Set nickname from fetched data
        setSelectedRanges(result[0]?.ranges || []); // Set nickname from fetched data
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        setError("Failed to fetch Pokémon data");
      }
    }

    fetchPokemonData();
  }, [id]);

  function handleSave() {
    const selectedAttackIds = selectedAttacks.map((attack) => attack.id);
    const data = {
      id_dex: parseInt(id),
      attacks: selectedAttackIds,
      trainer_id: pokemonData?.trainer_id || 1,
      nickname,
      ranges: selectedRanges,
    };
  }

  function handleRangeChange(index, value) {
    setSelectedRanges((prevRanges) => {
      const newRanges = [...prevRanges];
      newRanges[index] = { ...newRanges[index], value };
      return newRanges;
    });
  }

  function handleTypeClick(attack) {
    setSelectedAttacks((prevSelectedAttacks) => [...prevSelectedAttacks, attack]);
    setDropdownOpen(false);
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  const lastId = parseInt(id) - 1 === 0 ? 721 : parseInt(id) - 1;
  const nextId = parseInt(id) + 1 === 722 ? 1 : parseInt(id) + 1;

  return (
    <main className="flex items-center justify-center">
      <div className="w-100">
        <NavigationButtons onSave={handleSave} />
        <PokemonDetails
          selectedPkmn={pokemonData.pkmnDetails}
          nickname={nickname}
          setNickname={setNickname}
          ability={ability}
          setAbility={setAbility}
          lastId={lastId}
          nextId={nextId}
        />
        <RangeList
          selectedRanges={selectedRanges}
          rangesVal={rangesVal}
          handleRangeChange={handleRangeChange}
        />
        <AttackSelector
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          filteredAttacks={filteredAttacks}
          setfilteredAttacks={setfilteredAttacks}
          selectedAttacks={selectedAttacks}
          setSelectedAttacks={setSelectedAttacks}
          attacks={pokemonData.attacks}
          handleTypeClick={handleTypeClick}
        />
      </div>
    </main>
  );
}
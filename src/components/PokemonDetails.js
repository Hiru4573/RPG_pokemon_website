import Image from "next/image";

export default function PokemonDetails({
  selectedPkmn,
  nickname,
  setNickname,
  ability,
  setAbility,
  HP,
  setHP,
  battlesWon,
  setBattlesWon,
  lastId,
  nextId,
}) {
  return (
    <div>
      <label htmlFor="nickname" className="mr-2">Nickname:</label>
      <input
        id="nickname"
        type="text"
        className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Apelido"
        onChange={(e) => setNickname(e.target.value)}
        value={nickname}
      />

      <label htmlFor="ability" className="mr-2 mt-2">Ability:</label>
      <input
        id="ability"
        type="text"
        className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Habilidades"
        onChange={(e) => setAbility(e.target.value)}
        value={ability}
      />

      <label htmlFor="hp" className="mr-2 mt-2">HP:</label>
      <input
        id="hp"
        type="number"
        className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="HP Total"
        onChange={(e) => setHP(Number(e.target.value))}
        value={HP}
      />

      <label htmlFor="battle" className="mr-2 mt-2">Batalhas Ganhas:</label>
      <input
        id="battle"
        type="number"
        className="w-full px-4 py-2 border border-white-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Batalhas Ganhas"
        onChange={(e) => setBattlesWon(Number(e.target.value))}
        value={battlesWon}
      />

      <div className="flex items-center justify-between p-2 mt-3 border-t">
        <button
          className="text-white capitalize bg-red-500 hover:bg-red-600 w-5 cursor-pointer"
          onClick={() => (window.location.href = `/pkmn/register/${lastId}`)}
        >
          {"<"}
        </button>
        <span className="text-white text-center capitalize bg-red-900 w-full">
          {selectedPkmn.name}
        </span>
        <button
          className="text-white capitalize bg-red-500 hover:bg-red-600 w-5 cursor-pointer"
          onClick={() => (window.location.href = `/pkmn/register/${nextId}`)}
        >
          {">"}
        </button>
      </div>

      <div className="flex items-center justify-center m-2">
        <Image
          src={selectedPkmn.sprites.front_default}
          alt={`${selectedPkmn.name} sprite`}
          width={192}
          height={192}
          className="object-contain"
        />
      </div>
    </div>
  );
}
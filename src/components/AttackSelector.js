import Image from "next/image";

export default function AttackSelector({
  dropdownOpen,
  setDropdownOpen,
  filteredAttacks,
  setfilteredAttacks,
  selectedAttacks,
  setSelectedAttacks,
  attacks,
  handleTypeClick,
}) {
  return (
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
          {filteredAttacks.slice(0, 10).map((type, index) => (
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
      <div className="p-2">
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
  );
}
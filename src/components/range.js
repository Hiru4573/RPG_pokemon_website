export default function Range({ range, index, rangesVal, handleRangeChange }) {
    return (
      <div key={index} className={`flex ${range.color} items-center justify-between mb-2`}>
        <span className="text-white mr-2 p-2">{range.name}:</span>
        <div className="flex">
          <button
            key={0}
            className={`w-6 h-6 rounded-full mx-1 text-white ${
              0 <= range.value ? 'bg-neutral-900' : 'bg-gray-400'
            } hover:bg-neutral-900 focus:outline-none`}
            onClick={() => handleRangeChange(index, 0)}
          ></button>
          {rangesVal.map((value) => (
            <button
              key={value}
              className={`w-6 h-6 rounded-full mx-1 text-white ${
                value <= range.value ? 'bg-neutral-900' : 'bg-gray-400'
              } hover:bg-neutral-900 focus:outline-none`}
              onClick={() => handleRangeChange(index, value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  }
import Range from "@/components/range";

export default function RangeList({ selectedRanges, rangesVal, handleRangeChange }) {
  return (
    <div className="flex flex-col w-full px-2">
      {selectedRanges.map((range, index) => (
        <Range
          key={index}
          range={range}
          index={index}
          rangesVal={rangesVal}
          handleRangeChange={handleRangeChange}
        />
      ))}
    </div>
  );
}
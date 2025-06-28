import type { CitySearch } from "../types/types";

function SearchCity({ value, onChange, onSearch }: CitySearch) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search City"
        value={value}
        onChange={onChange}
        className="border px-4 py-1 rounded-md"
      />
      <button
        onClick={onSearch}
        className="border px-4 py-1 rounded-md mx-3 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
}

export default SearchCity;

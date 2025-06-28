import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cities } from "../redux/City";
import type { RootState, AppDispatch } from "../redux/store";
import SearchCity from "../components/SearchCity";
import CityList from "../components/CityList";

function debounce(
  func: (...argument: unknown[]) => void,
  delay: number
): (...argument: unknown[]) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...argument: unknown[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, argument);
    }, delay);
  };
}

function Home() {
  const [city, setCity] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const searchResults = useSelector(
    (state: RootState) => state.city.searchResults
  );

  const debounced = useRef(
    debounce((...argument: unknown[]) => {
      const value = argument[0] as string;
      if (value.trim() !== "" && typeof value === "string") {
        dispatch(cities(value));
      }
    }, 500)
  ).current;

  useEffect(() => {
    debounced(city);
  }, [city, debounced]);

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(cities(city));
    }
  };

  return (
    <div className="flex flex-col items-center bg-[url('../../src/assets/images/bg.png')] bg-cover bg-no-repeat h-[100vh] text-white">
      <div>
        <h2 className="text-3xl font-semibold">
          <span className="text-black">Forecasts powered by</span>{" "}
          <span className="text-gray-600">tech. Accuracy</span> powered by you.
        </h2>
      </div>

      <div>
        <SearchCity
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      <div>
        <CityList cities={searchResults} />
      </div>
    </div>
  );
}

export default Home;

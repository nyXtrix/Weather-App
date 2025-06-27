import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cities } from "../redux/City";
import type { City } from "../redux/City";
import type { RootState,AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState('');
  const dispatch:AppDispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.city.searchResults);
  const navigate = useNavigate()

  const handleSearch = () => {
    if (city.trim() !== "") {
      dispatch(cities(city));
    }
  };

  return (
    <div className="flex flex-col items-center bg-[url('../../src/assets/images/bg.png')] bg-cover bg-no-repeat h-[100vh] text-white">
      <div>
        <h2 className="text-3xl font-semibold"><span className="text-black">Forecasts powered by</span> <span className="text-gray-600">tech. Accuracy</span> powered by you.</h2>
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Search City"
          className="border px-4 py-1 rounded-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="border px-4 py-1 rounded-md mx-3 cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="h-150 w-200">
        <h2 className="text-lg font-semibold mb-2 text-center">City Lists</h2>
        <div className=" grid grid-cols-4 grid-rows-4 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((city: City) => (
            <div key={city.id} className="border p-2 rounded-md my-2 cursor-pointer" onClick={()=>navigate(`/details`,{state:city})}>
              <p><strong>Name:</strong> {city.name}</p>
              <p><strong>Country:</strong> {city.country}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cities found</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default Home;

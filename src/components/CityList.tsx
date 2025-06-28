import type { ListOfCities } from "../types/types";
import { useNavigate } from "react-router-dom";

function CityList({ cities }: ListOfCities) {
  const navigate = useNavigate();
  return (
    <div className="h-150 w-200">
      <h2 className="text-lg font-semibold mb-2 text-center">City Lists</h2>
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {cities.length > 0 ? (
          cities.map((city) => (
            <div
              key={city.id}
              className="border p-2 rounded-md my-2 cursor-pointer"
              onClick={() => navigate(`/details`, { state: city })}
            >
              <p>
                Name: <strong>{city.name}</strong>
              </p>
              <p>
                Country: <strong>{city.country}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>No cities found</p>
        )}
      </div>
    </div>
  );
}

export default CityList;

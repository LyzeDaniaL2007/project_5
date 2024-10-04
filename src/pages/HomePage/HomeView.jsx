import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const BerandaView = ({ loading, filteredRestaurants }) => {
  return (
    <div className="beranda dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700 dark:text-white">
        Restaurant List
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          {/* Loading Spinner dari DaisyUI */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((data) => (
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:text-white shadow-xl"
                key={data.id}
              >
                <figure>
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      "https://restaurant-api.dicoding.dev/images/medium/" +
                      data.pictureId
                    }
                    alt={data.name}
                  />
                </figure>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {data.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                    City: {data.city}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                    Rating: ⭐ {data.rating}
                  </p>
                  <p className="line-clamp-2 text-gray-600 dark:text-gray-400 mb-4">
                    {data.description}
                  </p>
                  <div className="flex justify-end">
                    <Link
                      to={"/detail/" + data.id}
                      className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No Result found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BerandaView;

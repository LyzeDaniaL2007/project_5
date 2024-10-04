import React from "react";

const CountryView = ({ ubahCari, cariProduct, hasilFilter }) => {
  return (
    <div className="country-view dark:bg-black">
      <h1 className="text-3xl font-bold mb-8 text-center text-white-700">Country</h1>
      <p className="text-gray-800 dark:text-gray-300">
        Searching for: {cariProduct || "All Countries"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hasilFilter?.slice(0, 20).map((country) => (
          <div
            className="card bg-base-100 shadow-xl dark:bg-gray-800 dark:text-white"
            key={country.name}
          >
            <figure>
              <img
                src={country.flag}
                alt={`${country.name} Flag`}
                className="h-32 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{country.name}</h2>
              <p>Currency: {country.currency}</p>
              <p>Capital: {country.capital || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryView;

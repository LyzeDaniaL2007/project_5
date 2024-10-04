import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CountryView from "./CountryView";

const initialState = {
  data: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      throw new Error("Unexpected action");
  }
};

const Country = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || ""; // Get search term from navbar

  const fetchCountries = async () => {
    const response = await axios.get("https://freetestapi.com/api/v1/countries");
    dispatch({ type: "FETCH_SUCCESS", payload: response.data });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries based on the search term
  const filteredCountries = state.data.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(state)

  return (
    <CountryView
      cariProduct={searchTerm}
      hasilFilter={filteredCountries}
    />
  );
};

export default Country;

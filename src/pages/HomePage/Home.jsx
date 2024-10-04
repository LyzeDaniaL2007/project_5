import { useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import HomeView from "./HomeView";

const nilaiDefault = {
  data: [],
  filterData: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        filterData: action.payload,
        loading: false,
      };
    case "SET_FILTER":
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      throw new Error("Error di case");
  }
};

const Beranda = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);
  const [searchParams, setSearchParams] = useSearchParams(); // Mendapatkan search parameter dari URL
  const searchQuery = searchParams.get("search") || ""; // Mengambil nilai pencarian dari URL

  // Mengambil data restoran dari API
  const ambilRestaurant = async () => {
    try {
      const response = await axios.get("https://restaurant-api.dicoding.dev/list");
      const data = response.data.restaurants;
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    ambilRestaurant();
  }, []);

  // Fungsi untuk memfilter restoran menggunakan useCallback
  const ubahRestaurants = useCallback(() => {
    if (searchQuery) {
      const filtered = state.data.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch({ type: "SET_FILTER", payload: filtered });
    } else {
      dispatch({ type: "SET_FILTER", payload: state.data });
    }
  }, [state.data, searchQuery]);

  useEffect(() => {
    ubahRestaurants(); // Panggil fungsi ubahRestaurants setiap kali searchQuery berubah
  }, [ubahRestaurants]);

   const hasilFilter = searchQuery ? state.filterData : state.data;

console.log(state)

  return (
    <div>
      <HomeView 
        loading={state.loading} 
        filteredRestaurants={state.filterData} // Panggil filterData dari reducer
      />
    </div>
  );
};

export default Beranda;

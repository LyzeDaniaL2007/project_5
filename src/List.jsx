import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import HomeView from "./pages/HomePage/HomeView";

const Beranda = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const [searchParams] = useSearchParams(); // Mendapatkan search parameter dari URL
  const searchQuery = searchParams.get("search") || ""; // Mengambil nilai pencarian dari URL

  // Mengambil data restoran dari API
  const ambilRestaurant = async () => {
    setLoading(true); // Set loading ke true saat mengambil data
    const response = await axios.get("https://restaurant-api.dicoding.dev/list");
    const data = await response.data;
    setRestaurant(data.restaurants);
    setLoading(false); // Set loading ke false setelah data diambil
  };

  useEffect(() => {
    ambilRestaurant();
  }, []);

  // Filter restoran berdasarkan query params (nama restoran)
  const filteredRestaurants = restaurant.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <HomeView 
      loading={loading} 
      filteredRestaurants={filteredRestaurants}
      />
    </div>
  );
};

export default Beranda;

import { useEffect, useReducer } from "react";
import axios from "axios";
import ProductView from "./ProductView";
import { Link, useSearchParams } from "react-router-dom";

// Reducer function to manage product data
const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};

const Product = () => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loading: false,
    error: false,
  });

  const fetchProducts = async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter products based on the search query
  const filteredProducts = state.products.filter((data) =>
    data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductView
        loading={state.loading}
        products={filteredProducts} // Pass the filtered products to ProductView
        error={state.error}
      />
    </div>
  );
};

export default Product;

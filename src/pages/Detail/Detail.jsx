import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Detail.scss'; // Assuming we are using SASS for styling

const Detail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null); // State for restaurant data
  const [product, setProduct] = useState(null); // State for product data
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch restaurant data
  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      setRestaurant(response.data.restaurant);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // Fetch product data from Fakestore API
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchRestaurant(), fetchProduct()]);
      setLoading(false); // Set loading to false once both data fetches are done
    };

    loadData();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center">
          {/* Loading Spinner from DaisyUI */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Restaurant Section */}
          {restaurant && (
            <div className="detail-card">
              <figure className="detail-card__image-container">
                <img
                  src={
                    "https://restaurant-api.dicoding.dev/images/large/" +
                    restaurant.pictureId
                  }
                  className="detail-card__image"
                  alt={restaurant.name}
                />
                <figcaption className="detail-card__caption">
                  <h1 className="detail-card__title">{restaurant.name}</h1>
                </figcaption>
              </figure>
              <div className="detail-card__content">
                <p className="detail-card__description">{restaurant.description}</p>
                <div className="detail-card__info">
                  <span className="detail-card__info-item">
                    <strong>City:</strong> {restaurant.city}
                  </span>
                  <span className="detail-card__info-item">
                    <strong>Rating:</strong> ⭐ {restaurant.rating}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Product Section */}
          {product && (
            <div className="detail-card mt-12">
              <div className="md:flex">
                <figure className="md:w-1/2 detail-card__image-container">
                  <img
                    src={product.image}
                    className="detail-card__image"
                    alt={product.title}
                  />
                </figure>
                <div className="p-6 md:w-1/2 detail-card__content">
                  <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
                  <p className="mb-6">{product.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold">Price: ${product.price}</span>
                    <span className="text-xl font-bold">Rating: ⭐ {product.rating.rate}</span>
                  </div>
                  <button className="detail-card__button">Add to Cart</button>
                </div>
              </div>
            </div>
          )}

          

        </>
      )}
    </div>
  );
};

export default Detail;

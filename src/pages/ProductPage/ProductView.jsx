import { Link } from "react-router-dom";
import "./ProductView.scss"; // Import SASS file for additional styles

const ProductView = ({ loading, products, error }) => {
  return (
    <div className="product-view-container dark:bg-gray-900 p-8">
      <h1 className="product-title text-3xl font-bold mb-8 text-center text-gray-700 dark:text-white">
        Product List
      </h1>

      {loading ? (
        <div className="loading-spinner flex justify-center items-center">
          {/* DaisyUI Loading Spinner */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <p className="error-message text-center text-red-500">
          Failed to load products.
        </p>
      ) : (
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="product-card bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:text-white"
                key={product.id}
              >
                <img
                  className="product-image w-full h-48 object-cover"
                  src={product.image}
                  alt={product.title}
                />
                <div className="product-details p-4">
                  <h2 className="product-name text-xl font-semibold text-gray-800 dark:text-white">
                    {product.title}
                  </h2>
                  <p className="product-category text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                  <p className="product-price text-lg font-bold text-gray-900 dark:text-gray-300">
                    ${product.price}
                  </p>
                  <Link
                    to={"/detail/" + product.id}
                    className="btn btn-primary mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results text-center text-gray-500 dark:text-gray-400">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductView;

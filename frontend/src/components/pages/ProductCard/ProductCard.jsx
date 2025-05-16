// ProductCard.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ product, className = "" }) => {
  const optimizedImage = `${product.imageUrl.replace(
    '/upload/',
    '/upload/q_auto,f_auto,w_480,h_480,c_fill/'
  )}`;

  return (
    <div className={`group relative border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white ${className}`}>
      <Link 
        to={`/products/${product._id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        {/* Image container */}
        <div className="relative aspect-square bg-pink-50 overflow-hidden">
          <LazyLoadImage
            src={optimizedImage}
            alt={product.name}
            effect="blur"
            threshold={200}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-100"
            placeholderSrc="/placeholder-product.jpg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback-product.jpg';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 transition-colors duration-300 group-hover:text-pink-600">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center text-pink-500 text-sm font-medium group-hover:text-pink-600 transition-colors">
              View Details
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string
};

export default ProductCard;
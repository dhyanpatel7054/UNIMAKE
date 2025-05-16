import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ product, className = "" }) => {
  // Fallback mechanism for image URLs
  const getOptimizedImage = () => {
    try {
      if (!product.imageUrl) throw new Error('No image URL');
      
      // Cloudinary transformations for different device sizes
      const cloudinaryTransformations = [
        '(max-width: 640px) 480w',
        '(min-width: 641px) 640w'
      ].join(', ');

      return product.imageUrl.replace(
        '/upload/',
        '/upload/q_auto,f_auto,w_480,h_480,c_fill/'
      );
    } catch (error) {
      return '/fallback-product.jpg';
    }
  };

  return (
    <div className={`group relative border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white ${className}`}>
      <Link 
        to={`/products/${product._id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-pink-400"
        aria-label={`View details for ${product.name}`}
      >
        {/* Image container with aspect ratio */}
        <div className="relative aspect-square bg-pink-50 overflow-hidden">
          <LazyLoadImage
            src={getOptimizedImage()}
            alt={product.name}
            effect="blur"
            threshold={200}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-100"
            placeholderSrc="/placeholder-product.jpg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback-product.jpg';
            }}
            width="480"
            height="480"
            srcSet={`
              ${product.imageUrl?.replace('/upload/', '/upload/q_auto,f_auto,w_480,h_480,c_fill/')} 480w,
              ${product.imageUrl?.replace('/upload/', '/upload/q_auto,f_auto,w_640,h_640,c_fill/')} 640w
            `}
            sizes="(max-width: 640px) 480px, 640px"
          />
        </div>

        {/* Content with improved accessibility */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 transition-colors duration-300 group-hover:text-pink-600">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3" aria-label="Product description">
            {product.shortDescription}
          </p>

          {/* CTA with semantic markup */}
          <div className="mt-4 flex items-center justify-between">
            <span 
              className="inline-flex items-center text-pink-500 text-sm font-medium group-hover:text-pink-600 transition-colors"
              role="button"
              tabIndex="0"
            >
              View Details
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
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
    imageUrl: PropTypes.string,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string
};

ProductCard.defaultProps = {
  product: {
    imageUrl: '/fallback-product.jpg'
  }
};

export default ProductCard;

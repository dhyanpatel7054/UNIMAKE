import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, ChevronDown, ChevronUp, Star, Heart, ShoppingCart, ZoomIn } from 'lucide-react';

const cloudinaryOptimize = (url, width, height) => {
  if (!url) return `/api/placeholder/${width}/${height}`;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('cloudinary')) {
      return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
    }
    return url;
  } catch {
    return `/api/placeholder/${width}/${height}`;
  }
};

const ProductPage = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const images = product?.imageUrl || product?.image || [];
  const imageArray = Array.isArray(images) ? images : images ? [images] : [];
  const specs = product?.technicalSpecs || [];
  const models = product?.models || [];
  const description = product?.longDescription || product?.shortDescription || '';

  useEffect(() => {
    setActiveImageIndex(0);
    setShowFullDescription(false);
    setSelectedModel(null);
    setQuantity(1);

    imageArray.forEach((img) => {
      new Image().src = cloudinaryOptimize(img, 800, 600);
    });
  }, [product]);

  const handleAddToCart = () => {
    // Add cart functionality here
    console.log('Added to cart:', {
      product: product.name,
      model: selectedModel,
      quantity
    });
  };

  const ModelCard = ({ model }) => (
    <div 
      className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all ${
        selectedModel?.id === model.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => setSelectedModel(model)}
    >
      {Object.entries(model).map(([key, value]) => (
        !['id', '_id'].includes(key) && (
          <div key={key} className="flex justify-between mb-2 last:mb-0">
            <span className="font-medium text-gray-600">{key}:</span>
            <span className="text-gray-800">{value}</span>
          </div>
        )
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="text-sm md:text-base">Back to Home</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
              {imageArray.length > 0 ? (
                <div className="relative h-full w-full group">
                  <img
                    src={cloudinaryOptimize(imageArray[activeImageIndex], 800, 800)}
                    alt={`${product.name}`}
                    className="w-full h-full object-contain p-4"
                    loading="eager"
                  />
                  <button 
                    className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                    onClick={() => setZoomImage(imageArray[activeImageIndex])}
                  >
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <img
                    src="/api/placeholder/800/800"
                    alt="Product placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {imageArray.length > 1 && (
              <div className="mt-4 overflow-x-auto pb-4">
                <div className="flex gap-3 w-max">
                  {imageArray.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === activeImageIndex
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={cloudinaryOptimize(img, 100, 100)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(48 reviews)</span>
            </div>

            <div className="prose max-w-none text-gray-600">
              <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
                {description}
              </p>
              {description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2 flex items-center"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                  {showFullDescription ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              )}
            </div>

            {specs.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specs.map((spec, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1 mr-2" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {models.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Available Models</h2>
                <div className="lg:hidden space-y-3">
                  {models.map((model, i) => (
                    <ModelCard key={i} model={model} />
                  ))}
                </div>
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(models[0])
                          .filter(key => !['id', '_id'].includes(key))
                          .map((key, i) => (
                            <th key={i} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                              {key}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((model, i) => (
                        <tr 
                          key={i}
                          className={`cursor-pointer ${
                            selectedModel?.id === model.id 
                              ? 'bg-blue-50' 
                              : i % 2 === 0 
                                ? 'bg-white' 
                                : 'bg-gray-50'
                          }`}
                          onClick={() => setSelectedModel(model)}
                        >
                          {Object.entries(model).map(([key, value], j) => (
                            !['id', '_id'].includes(key) && (
                              <td key={j} className="px-4 py-3 text-sm text-gray-800">
                                {value}
                              </td>
                            )
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {zoomImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setZoomImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={cloudinaryOptimize(zoomImage, 2000, 2000)}
            alt="Zoomed product view"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

ProductPage.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    shortDescription: PropTypes.string,
    longDescription: PropTypes.string,
    technicalSpecs: PropTypes.arrayOf(PropTypes.string),
    models: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ProductPage;
// src/pages/Products.jsx
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-blue-800">
        {t('header.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(t('products', { returnObjects: true })).map((product) => (
          <div 
            key={product.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              {product.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
import React from 'react';
import ProductCard from '../pages/ProductCard/ProductCard';

const ProductSection = ({ products = [] }) => { // Default empty array
  return (
    <section className="container mx-auto px-4 pb-16">
      <h1 className="text-3xl mb-6 text-center font-semibold mt-16">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product._id} 
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
// ... other imports remain the same
import { 
  GiIceCreamCone, 
  GiSpoon,
  GiGearHammer, 
  GiFactory
} from 'react-icons/gi';
import { 
  FaCogs, 
  FaTools, 
  FaTruckMoving,
  FaShieldAlt 
} from "react-icons/fa";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSection from '../../ProductSection/productSection';
// Update image paths to Cloudinary URLs
const sliderImages = [
  '/slider-5.jpg',
  '/slider-6.jpg',
  '/slider-9.jpg',
  '/slider-11.jpg'
];

// ... sliderSettings remains the same
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: false,
  customPaging: function() {
    return (
      <div className="w-3 h-3 mx-1 rounded-full bg-pink-200 hover:bg-pink-400 transition-colors duration-300"></div>
    );
  }
};
const features = [
  {
    icon: <FaCogs className="w-full h-full" />,
    title: "Advanced Engineering",
    desc: "Our machines are built with cutting-edge technology, ensuring precision, high performance, and long-term durability."
  },
  {
    icon: <FaTools className="w-full h-full" />,
    title: "Customization Flexibility",
    desc: "We design solutions tailored to your specific production needs, from small-scale parlors to industrial plants."
  },
  {
    icon: <FaTruckMoving className="w-full h-full" />,
    title: "Reliable Delivery",
    desc: "We ensure timely delivery and professional installation to help you start or scale your production without delays."
  },
  {
    icon: <FaShieldAlt className="w-full h-full" />,
    title: "Global Quality Standards",
    desc: "Our machinery is manufactured following strict international standards for safety, hygiene, and operational excellence."
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  // ... loading and error states remain the same
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://unimake-rajs-projects-ed5d8702.vercel.app/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        // Map Cloudinary URLs to products
        const productsWithCloudinary = data.map(product => ({
          ...product,
          image: image: `https://res.cloudinary.com/unimake/image/upload/${product.imagePath}`
        }));
        setProducts(productsWithCloudinary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex-grow w-full pt-4 bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Updated Image Slider with Cloudinary URLs */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-md mx-4 sm:mx-6 lg:mx-8 border-4 border-pink-100">
        <Slider {...sliderSettings}>
          {sliderImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      {/* Updated About Us Section Image */}
      <section id="about-us" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
              <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">
                <div className="lg:w-[45%] xl:w-[500px] shrink-0 relative group">
                  <div className="absolute inset-0 bg-pink-100 rounded-2xl transform rotate-2 scale-95 group-hover:rotate-1 transition-all duration-300"></div>
                  <img 
                    src="/my_image.jpg" 
                    alt="Unimake Ice Cream Production" 
                    className="w-full h-auto rounded-2xl shadow-2xl relative transform transition-all duration-300 hover:scale-95"
                  />
                  <div className="absolute -top-6 -right-6 text-pink-400 text-4xl transform rotate-12">
                    <GiIceCreamCone />
                  </div>
                  <div className="absolute -bottom-6 -left-6 text-purple-300 text-4xl transform -rotate-12">
                    <GiIceCreamCone />
                  </div>
                </div>
      
                <div className="flex-1">
                  <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
                        ABOUT US
                      </span>
                    </h1>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-pink-600 mb-6 flex items-center gap-3">
                      <GiIceCreamCone className="text-pink-400" />
                      <span>WELCOME TO UNIMAKE</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                      Unimake is a premier manufacturer of ice cream production machinery, dedicated to crafting exceptional solutions for the frozen dessert industry.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                      With a focus on quality, innovation, and customer satisfaction, we ensure that our products meet the highest standards of performance, reliability, and food safety.
                    </p>
                    
                    <Link 
                      to="/about"
                      className="bg-gradient-to-r from-pink-400 to-purple-300 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-3 px-8 rounded-full 
                                transition-all duration-300 inline-block transform hover:scale-105 hover:shadow-lg"
                    >
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-16 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">
              Why Choose UNIMAKE?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the key advantages that make Unimake the trusted partner in world-class ice cream production machinery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 mb-6 bg-gradient-to-r from-pink-400 to-purple-300 rounded-full p-3 text-white mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-pink-600 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section with Individual Links */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* ... section header remains the same */}
          
          {loading ? (
            <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
            // ... loading state remains the same
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              Error loading products: {error}
            </div>
            // ... error state remains the same
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
  <ProductCard 
    key={product.id || product._id} // use a unique identifier
    product={product}
    className="hover:transform hover:scale-105 transition-all duration-300"
  />
))}
            </div>
          )}
        </div>
        <div className="absolute top-10 right-10 text-8xl text-pink-100 opacity-20">
                  <GiGearHammer />
                </div>
                <div className="absolute bottom-10 left-10 text-8xl text-purple-100 opacity-20">
                  <GiFactory />
                </div>
        {/* ... decorative elements remain the same */}
      </section>
    </main>
  );
};

export default Home;

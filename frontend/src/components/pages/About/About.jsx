import React from 'react';
import { GiIceCreamCone, GiHeartWings } from 'react-icons/gi';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
    <section className="relative bg-gradient-to-b from-pink-50 to-yellow-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header & Image Section */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">
          {/* Image */}
          <div className="lg:w-[45%] xl:w-[500px] shrink-0 relative group">
            <div className="absolute inset-0 bg-pink-100 rounded-2xl transform rotate-2 scale-95 group-hover:rotate-1 transition-all duration-300"></div>
            <img 
              src="src\assets\my_image.jpg" 
              alt="Unimake Ice Cream Production" 
              className="w-full h-auto rounded-2xl shadow-2xl relative transform transition-all duration-300 hover:scale-98"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-600">
                  ABOUT US
                </span>
              </h1>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-pink-800 mb-6 flex items-center gap-3">
                <GiIceCreamCone className="text-yellow-600" />
                <span>WELCOME TO UNIMAKE</span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4">
              Unimake is a premier manufacturer of ice cream production machinery, dedicated to crafting exceptional solutions for the frozen dessert industry. We combine traditional engineering principles with cutting-edge technology to build efficient, durable, and innovative machines that help businesses produce high-quality ice cream, gelato, and other frozen treats. Our commitment to excellence is reflected in every machine we deliver.</p>

              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              With a focus on quality, innovation, and customer satisfaction, we ensure that our products meet the highest standards of performance, reliability, and food safety, while staying aligned with global industry trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="mt-20 bg-gradient-to-r from-pink-100 via-white to-yellow-100 py-16 px-6 sm:px-10 md:px-20 rounded-[2rem] shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white/90 border border-pink-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl backdrop-blur-md transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <GiHeartWings className="text-4xl text-pink-600 animate-bounce" />
              <h3 className="text-2xl font-bold text-pink-700">Our Mission</h3>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed">
            To craft world-class ice cream manufacturing solutions that empower businesses to exceed expectations in quality, efficiency, and innovation. We are committed to engineering excellence, using cutting-edge technologies and sustainable practices to support our clients' success.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white/90 border border-yellow-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl backdrop-blur-md transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <GiIceCreamCone className="text-4xl text-yellow-600 animate-pulse" />
              <h3 className="text-2xl font-bold text-yellow-700">Our Vision</h3>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed">
            To be the global leader in innovative ice cream production technology, empowering businesses to create exceptional frozen desserts with unmatched efficiency, reliability, and creativity. We envision a world where our machines are the driving force behind every joyful scoop.
            </p>
          </div>
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default About;
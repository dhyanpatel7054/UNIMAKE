import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import MobileMenu from './mobilemenue';

const MobileHeader = ({
  groupedProducts,
  navLinks,
  isScrolled,
  logo,
  phoneNumbers,
  emailAddress,
  whatsappNumber,
}) => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowTopBar(currentScroll < 50);
      setScrollProgress(Math.min(currentScroll / 100, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Combined Top Contact Bar */}
      <div
        className="bg-gradient-to-r from-purple-600 to-pink-500 overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isScrolled ? "0px" : "40px",
          opacity: 1 - scrollProgress,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-4 text-white py-2 px-4">
          <div className="flex flex-wrap justify-center items-center w-full sm:w-auto gap-4">
            {phoneNumbers.map((phone, i) => (
              <a
                key={i}
                href={`tel:${phone}`}
                className="flex items-center hover:text-purple-200 transition-all hover:scale-105 text-sm sm:text-base"
              >
                <FaPhoneAlt className="mr-2 text-lg sm:text-xl" />
                {phone}
              </a>
            ))}
          </div>
          <div className="flex justify-center w-full sm:w-auto">
            <a
              href={`mailto:${emailAddress}`}
              className="flex items-center hover:text-purple-200 transition-all hover:scale-105 cursor-pointer text-sm sm:text-base"
            >
              <FaEnvelope className="mr-2 text-lg sm:text-xl" />
              {emailAddress}
            </a>
          </div>
        </div>
      </div>

      {/* Main Mobile Header */}
      <div
        className="bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out border-b"
        style={{
          boxShadow: isScrolled
            ? '0 4px 20px rgba(0, 0, 0, 0.05)'
            : '0 2px 10px rgba(0, 0, 0, 0.03)',
          padding: `${isScrolled ? '0.5rem' : '1rem'} 1rem`,
          background: 'rgba(255, 255, 255, 0.97)',
          borderBottomColor: 'rgba(147, 51, 234, 0.3)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Logo Section */}
          

          <MobileMenu groupedProducts={groupedProducts} navLinks={navLinks} logo={logo} />
        </div>
      </div>

      {/* Floating Action Button (FAB) for mobile - Fixed styling */}
      <div className="fixed bottom-4 left-4 z-[1000]">
        <div className="relative">
          <button
            onClick={() => setIsFabOpen(!isFabOpen)}
            className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-500 transition-all duration-300 flex items-center justify-center"
          >
            {isFabOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>

          <div className={`absolute bottom-full left-0 mb-2 flex flex-col space-y-2 transition-all duration-300 ${
            isFabOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            <a
              href={`tel:${phoneNumbers[0]}`}
              className="bg-purple-600 text-white p-3 rounded-full shadow-md hover:bg-purple-500 transition-transform duration-200 flex items-center justify-center"
              title="Call"
            >
              <FaPhoneAlt size={18} />
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-400 transition-transform duration-200 flex items-center justify-center"
              title="Email"
            >
              <FaEnvelope size={18} />
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-400 transition-transform duration-200 flex items-center justify-center"
              title="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
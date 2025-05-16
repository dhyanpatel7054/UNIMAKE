import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaChevronUp,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import PropTypes from 'prop-types';
import logo from "../../assets/logo.svg";

const Header = ({ products }) => {
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openCategory, setOpenCategory] = useState(null);
  const menuRef = useRef(null);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);
  const submenuTimeout = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setScrollProgress(Math.min(window.scrollY, 100) / 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // Contact information
  const phoneNumbers = ["+919408903793", "+918238283625"];
  const emailAddress = "unimake06@gmail.com";
  const whatsappNumber = "919408903793";

  // Navigation links
  const navLinks = [
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" },
    { path: "/brochure.pdf", text: "Brochure", isDownload: true },
  ];

  // Group products by category
  const groupProductsByCategory = (products) => 
    products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = acc[category] || [];
      acc[category].push(product);
      return acc;
    }, {});
  const groupedProducts = groupProductsByCategory(products);

  // Mobile dropdown component
  const renderMobileProducts = () => (
    <div 
      className={`fixed top-[84px] left-0 right-0 bottom-0 bg-white shadow-2xl lg:hidden z-50 
        transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      ref={menuRef}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <ul className="p-4 space-y-2">
            {Object.entries(groupedProducts).map(([category, products]) => (
              <li key={category} className="space-y-2">
                <button
                  className="w-full flex justify-between items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                  onClick={() => setOpenCategory(openCategory === category ? null : category)}
                >
                  <span className="font-medium text-purple-700">{category}</span>
                  <FaChevronRight className={`transform transition-transform ${openCategory === category ? 'rotate-90' : ''}`} />
                </button>

                {openCategory === category && (
                  <div className="ml-4 space-y-2 border-l-2 border-purple-100 pl-3">
                    {products.map((product) => (
                      <Link
                        key={product._id}
                        to={`/products/${product._id}`}
                        className="block p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}

            <li>
              <NavLink
                to="/"
                className="block p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className="block p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-purple-100">
          <button
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        {/* Top Contact Bar */}
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-500 overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isScrolled ? "0" : "40px",
            opacity: 1 - scrollProgress,
          }}
        >
          <div className="max-w-7xl mx-auto flex justify-center items-center space-x-6 text-white py-2 px-4">
            {phoneNumbers.map((phone, i) => (
              <a key={i} href={`tel:${phone}`} className="flex items-center hover:text-purple-200 transition-all hover:scale-105">
                <FaPhoneAlt className="mr-2 text-xl" />{phone}
              </a>
            ))}
            <a href={`mailto:${emailAddress}`} className="flex items-center hover:text-purple-200 transition-all hover:scale-105 cursor-pointer">
              <FaEnvelope className="mr-2 text-xl" />{emailAddress}
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div
          className="bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out border-b"
          style={{
            boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
            padding: `${isScrolled ? "0.5rem" : "1rem"} 1rem`,
            background: isScrolled ? "rgba(255, 255, 255, 0.97)" : "rgba(255, 255, 255, 0.90)",
            borderBottomColor: "rgba(147, 51, 234, 0.3)",
          }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex items-center group">
              <div className="relative mr-3 overflow-hidden rounded-full bg-white p-1 shadow-md">
                <img
                  src={logo}
                  alt="UNIMAKE Industries Logo"
                  className="object-contain transition-all duration-300"
                  style={{
                    height: isScrolled ? "46px" : "66px",
                    width: isScrolled ? "46px" : "66px",
                    transform: `scale(${isScrolled ? 0.9 : 0.95})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-cyan-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <span className="text-3xl font-black text-blue-900">UNIMAKE</span>
                <span className="block text-[10px] font-medium text-gray-500 mt-0 tracking-tighter">
                  VISION<span className="mx-0.5">AND</span>TECHNOLOGY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex space-x-8 font-medium text-purple-800 items-center">
                <li className="flex items-center mr-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) => `relative px-3 py-2 transition-all duration-300 rounded-md ${
                      isActive ? "text-purple-700 font-bold after:w-full after:bg-purple-500" 
                      : "hover:text-purple-600 hover:bg-purple-50 after:w-0 hover:after:w-full"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:transition-all after:duration-300`}
                  >
                    Home
                  </NavLink>
                </li>
                {/* Add your desktop products dropdown here */}
                
  {renderProductsDropdown()}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-purple-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
        {renderMobileProducts()}
      </header>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex lg:hidden gap-3">
        {/* Mobile floating buttons */}
      </div>
      
      <div className="w-full transition-all duration-300" style={{ height: isScrolled ? "64px" : "104px" }} />

      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed z-40 bottom-32 lg:bottom-24 right-4 bg-purple-100 backdrop-blur-sm hover:bg-purple-600 hover:text-white text-purple-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          style={{ opacity: scrollProgress, transform: `translateY(${scrollProgress < 0.5 ? "20px" : "0px"})` }}
        >
          <FaChevronUp />
        </button>
      )}
    </>
  );
};

Header.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Header;
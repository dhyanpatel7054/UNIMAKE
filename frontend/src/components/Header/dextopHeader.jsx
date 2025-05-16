import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const ProductsDropdown = ({ groupedProducts }) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const timeoutRef = useRef(null);

  const categoriesWithMultipleProducts = [];
  const categoriesWithSingleProduct = [];

  Object.entries(groupedProducts).forEach(([category, products]) => {
    products.length > 1
      ? categoriesWithMultipleProducts.push([category, products])
      : categoriesWithSingleProduct.push([category, products]);
  });

  const handleCategoryHover = (category) => {
    clearTimeout(timeoutRef.current);
    setActiveCategory(category);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLocalIsOpen(false);
      setActiveCategory(null);
    }, 300);
  };

  return (
    <li
      className="relative flex flex-col"
      onMouseEnter={() => {
        clearTimeout(timeoutRef.current);
        setLocalIsOpen(true);
      }}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-indigo-800 hover:text-purple-600 transition-all"
        aria-expanded={localIsOpen}
      >
        Products
        <FaChevronDown className={`mt-[2px] text-sm transition-transform duration-300 ${localIsOpen ? 'rotate-180' : ''}`} />
      </button>

      {localIsOpen && (
        <div
          className="absolute top-full left-0 bg-white rounded-xl shadow-2xl mt-2 border border-purple-200 z-50"
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="flex flex-col py-2 px-2 space-y-1">
            {categoriesWithMultipleProducts.map(([category, products]) => (
              <div
                key={category}
                className="relative group/subcat"
                onMouseEnter={() => handleCategoryHover(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="flex items-center justify-between px-4 py-1.5 text-sm font-medium text-gray-900 hover:bg-purple-100 rounded-md transition-all hover:text-purple-700 whitespace-nowrap">
                  <span>{category}</span>
                  <FaChevronRight className="text-xs ml-2" />
                </div>

                {activeCategory === category && (
                  <div className="absolute left-full top-0 ml-2 bg-white rounded-xl shadow-xl border border-purple-200 z-[60] animate-pop-in">
                    <div className="flex flex-col py-2 px-2 space-y-1 min-w-[250px] max-h-[60vh] overflow-y-auto">
                      {products.map((product) => (
                        <Link
                          key={product._id}
                          to={`/products/${product._id}`}
                          className="block px-4 py-1.5 text-sm font-medium text-gray-900 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all whitespace-nowrap"
                        >
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {categoriesWithSingleProduct.map(([category, products]) => (
              <Link
                key={category}
                to={`/products/${products[0]._id}`}
                className="block px-4 py-1.5 text-sm font-medium text-gray-900 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-all whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

const DesktopHeader = ({ groupedProducts, navLinks, isScrolled, logo, phoneNumbers, emailAddress, whatsappNumber }) => {
  const scrollProgress = Math.min(window.scrollY, 100) / 100;

  return (
    <>
      {/* Top Contact Bar */}
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

      {/* Main Desktop Header */}
      <div
        className="bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out border-b"
        style={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
          padding: `${isScrolled ? "0.5rem" : "1rem"} 1rem`,
          background: "rgba(255, 255, 255, 0.97)",
          borderBottomColor: "rgba(147, 51, 234, 0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="relative mr-3 overflow-hidden rounded-full bg-white p-1 shadow-md w-[66px] h-[66px] min-w-[66px]">
              <img
                src={logo}
                alt="UNIMAKE Industries Logo"
                className="object-contain w-full h-full p-2 transition-all duration-300"
              />
            </div>
            <div className="ml-2">
              <span className="text-4xl font-black text-indigo-900">UNIMAKE</span>
              <span className="block text-[10px] font-medium text-gray-300 mt-0 tracking-tighter">
                VISION<span className="mx-0.5">AND</span>TECHNOLOGY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center">
            <ul className="flex space-x-8 font-medium text-purple-800 items-center">
              <li className="flex items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative px-3 py-2 transition-all duration-300 rounded-md ${
                      isActive
                        ? "text-purple-700 font-bold after:w-full after:bg-purple-500"
                        : "hover:text-purple-600 hover:bg-purple-50 after:w-0 hover:after:w-full"
                    }
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:transition-all after:duration-300`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* Products Dropdown */}
              <ProductsDropdown groupedProducts={groupedProducts} />

              {navLinks.map((link) => (
                <li key={link.path} className="flex items-center">
                  {link.isDownload ? (
                    <a
                      href={link.path}
                      download
                      className="relative px-3 py-2 transition-all duration-300 rounded-md hover:text-purple-600 hover:bg-purple-50"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative px-3 py-2 transition-all duration-300 rounded-md ${
                          isActive
                            ? "text-purple-700 font-bold after:w-full after:bg-purple-500"
                            : "hover:text-purple-600 hover:bg-purple-50 after:w-0 hover:after:w-full"
                        }
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:transition-all after:duration-300`
                      }
                    >
                      {link.text}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className="fixed top-[calc(50%+52px)] left-0 z-40 -translate-y-1/2 hidden lg:flex flex-col space-y-3">
  <a
    href={`tel:${phoneNumbers[0]}`}
    className="relative bg-purple-600 text-white p-2.5 hover:bg-purple-500 transition-transform duration-300 flex items-center justify-center w-12 h-12 hover:scale-110 hover:rotate-6 shadow-md group"
    title="Call"
  >
    <FaPhoneAlt size={20} />
    <span className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
    <span className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
  </a>

  <a
    href={`mailto:${emailAddress}`}
    className="bg-pink-500 text-white p-2.5 hover:bg-pink-400 transition-transform duration-300 flex items-center justify-center w-12 h-12 hover:translate-x-1 hover:scale-105 shadow-md"
    title="Email"
  >
    <FaEnvelope size={20} />
  </a>

  <a
    href={`https://wa.me/${whatsappNumber}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white p-2.5 hover:bg-green-400 transition-transform duration-300 flex items-center justify-center w-12 h-12 hover:skew-y-2 shadow-md"
    title="WhatsApp"
  >
    <FaWhatsapp size={20} />
  </a>
</div>

    </>
  );
};

export default DesktopHeader;

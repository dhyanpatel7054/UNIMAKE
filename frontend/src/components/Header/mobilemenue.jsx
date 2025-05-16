import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaWhatsapp } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const MobileMenu = ({ groupedProducts, navLinks, logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="relative">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center justify-between px-4 py-3 lg:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="UNIMAKE Logo"
            className="w-10 h-10 object-contain rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-indigo-900 leading-none">UNIMAKE</h2>
            <p className="text-xs text-gray-300 font-medium">VISION AND TECHNOLOGY</p>
          </div>
        </div>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-purple-600 hover:text-purple-700 transition-colors hover:bg-purple-100 p-2 rounded-md"
          aria-label="Toggle Menu"
        >
          <div className="relative w-6 h-6">
            <FaBars
              size={24}
              className={`absolute transition-all duration-300 ${
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100"
              }`}
            />
            <FaTimes
              size={24}
              className={`absolute transition-all duration-300 ${
                isMenuOpen ? "opacity-100" : "opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-[70px] left-0 right-0 bg-white shadow-2xl lg:hidden z-40 transition-all duration-300 overflow-hidden`}
        style={{
          maxHeight: isMenuOpen ? "calc(100vh - 70px)" : "0",
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <ul className="flex-1 flex flex-col space-y-3 h-[calc(100vh-230px)] overflow-y-auto pb-4">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold shadow-md"
                      : "bg-white hover:bg-purple-100 text-purple-600 hover:text-purple-700"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>

            {/* Products */}
            <li className="flex flex-col">
  <button
    className="w-full text-left py-3 px-4 rounded-lg bg-white hover:bg-purple-100 text-purple-600 hover:text-purple-700 flex justify-between items-center"
    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
  >
    <span>Products</span>
    <FaChevronDown
      className={`transform transition-transform ${
        isMobileProductsOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  <div
    className={`pl-4 overflow-auto transition-all duration-300 ${
      isMobileProductsOpen ? "max-h-[50vh]" : "max-h-0"
    }`}
  >
    {/* Sort categories - multi-product first, single-product last */}
    {Object.entries(groupedProducts)
      .sort(([aCat, aProducts], [bCat, bProducts]) => {
        if (aProducts.length > 1 && bProducts.length === 1) return -1;
        if (aProducts.length === 1 && bProducts.length > 1) return 1;
        return 0;
      })
      .map(([category, products]) => (
        <div key={category} className="space-y-2 pt-2">
          {products.length === 1 ? (
            <Link
              key={products[0]._id}
              to={`/products/${products[0]._id}`}
              className="block py-2 px-4 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-600 ml-2 mb-1"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileProductsOpen(false);
              }}
            >
              {products[0].name}
            </Link>
          ) : (
            <>
              <button
                className="w-full text-left flex justify-between items-center p-2 rounded-lg hover:bg-purple-50"
                onClick={() => toggleCategory(category)}
              >
                <h4 className="text-sm font-semibold text-purple-700">
                  {category}
                </h4>
                <FaChevronDown
                  className={`text-purple-600 transform transition-transform ${
                    expandedCategories[category] ? "rotate-180" : ""
                  }`}
                  size={14}
                />
              </button>
              <div
                className={`overflow-auto transition-all duration-300 ${
                  expandedCategories[category] ? "max-h-[30vh]" : "max-h-0"
                }`}
              >
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="block py-2 px-4 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-600 ml-2 mb-1"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileProductsOpen(false);
                    }}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
  </div>
</li>

            {/* Other Nav Links */}
            {navLinks.map((link, index) =>
  link.isDownload ? (
    <a
      key={index}
      href={link.path}
      download
      className="block py-2 text-lg text-gray-800 hover:text-purple-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.text}
    </a>
  ) : (
    <Link
      key={index}
      to={link.path}
      className="block py-2 text-lg text-gray-800 hover:text-purple-600"
    >
      {link.text}
    </Link>
  )
)}

          </ul>

          {/* WhatsApp CTA */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

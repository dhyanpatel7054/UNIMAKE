import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useViewport from '../../hooks/useViewport';
import DesktopHeader from './dextopHeader';
import MobileHeader from './mobileheader';
import logo from "../../assets/logo.svg";
import { FaChevronUp , FaWhatsapp } from "react-icons/fa";


const Header = ({ products }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobile } = useViewport();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Contact information
  const phoneNumbers = ["+919408903793", "+919979925228"];
  const emailAddress = "unimake06@gmail.com";
  const whatsappNumber = "919408903793";

  // Navigation links
  const navLinks = [
    { path: "/brochure.pdf", text: "Brochure", isDownload: true },
    { path: "/contact", text: "Contact" },
    { path: "/about", text: "About" },
  ];

  // Group products by category
  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByCategory(products);

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        {!isMobile ? (
          <DesktopHeader
            groupedProducts={groupedProducts}
            navLinks={navLinks}
            isScrolled={isScrolled}
            logo={logo}
            phoneNumbers={phoneNumbers}
            emailAddress={emailAddress}
            whatsappNumber={whatsappNumber}
          />
        ) : (
          <MobileHeader
            groupedProducts={groupedProducts}
            navLinks={navLinks}
            isScrolled={isScrolled}
            logo={logo}
            phoneNumbers={phoneNumbers}
            emailAddress={emailAddress}
            whatsappNumber={whatsappNumber}
          />
        )}
      </header>
      {/* WhatsApp Floating Button */}
<a
  href="https://wa.me/919408903793"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed z-55 right-0 top-[calc(40%-120px)] bg-green-500 text-white p-3 shadow-lg hover:bg-green-600 transition-all duration-300"
>
  <FaWhatsapp size={24} />
</a>


      {/* Enquiry Now Fixed Button */}
      <a
  href="/contact"
  className="fixed z-50 bg-gray-800 text-white px-3 py-2 text-sm font-semibold tracking-wide shadow-md hover:bg-yellow-500 transition-all duration-300"
  style={{ 
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    right: "-2.5rem", // Adjust this value for horizontal position
    top: "calc(40% - 50px)", // Adjust this value for vertical position
    transform: "rotate(180deg)",
    transformOrigin: "left center"
  }}
>
  Enquiry Now
</a>


      {/* Spacer */}
      <div className="w-full transition-all duration-300" style={{
        height: isScrolled ? "64px" : "104px",
        position: "relative",
        zIndex: 10
      }}></div>

      {/* Scroll to Top Button */}
      {isScrolled && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed z-40 bottom-15 lg:bottom-18 right-4 bg-purple-100 backdrop-blur-sm hover:bg-purple-600 hover:text-white text-purple-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
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

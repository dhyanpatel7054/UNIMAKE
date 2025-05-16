import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaYoutube
} from 'react-icons/fa';
import logo from "../../../src/assets/logo2.jpg";
import indiamart from "../../../src/assets/indiamart.jpg"

const Footer = () => {
  const phoneNumbers = [
    { name: "RAJKUMAR PATEL", number: "+91 9408903793" },
    { name: "HARPALSINH CHAUHAN", number: "+91 8238283625" }
  ];
  const emailAddress = "unimake06@gmail.com";
  const socialLinks = [
  {
    Icon: FaInstagram,
    url: "https://www.instagram.com/unimakevisionandtechnology?igsh=MWNudXhwbnl5MWtzdg%3D%3D&utm_source=qr",
  },
  {
    Icon: FaFacebook,
    url: "https://www.facebook.com/share/1APFqzUq7T/?mibextid=wwXIfr",
  },
  {
    Icon: FaYoutube,
    url: "https://youtube.com/@unimakeicecreamplantahmedabad?si=ujbVf4cLS1yZPAdj",
  }
];

const indiamartLink = "https://www.indiamart.com/unimake-vision-and-technology/";


  return (
    <footer className="bg-gradient-to-br from-pink-200 via-yellow-50 to-blue-50 text-gray-700 mt-20 border-t-4 border-pink-300 shadow-lg">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:ml-45">  {/* Desktop margin-left */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-col items-center md:block mb-6">
              <div className="h-45 w-45 rounded-lg overflow-hidden bg-white shadow-md flex items-center justify-center border-2 border-white">
                <img 
                  src={logo} 
                  alt="UNIMAKE Logo" 
                  className="h-full w-full object-contain p-1"
                />
              </div>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-blue-900 mb-1">Manufacturers of</p>
              <ul className="list-none pl-0 space-y-1">
                <li>Ice Cream Plant</li>
                <li>Candy Plant</li>
                <li>Ice Cream Machineries</li>
              </ul>
            </div>

            <div className="flex justify-center md:justify-start space-x-4 mt-4">
  {socialLinks.map(({ Icon, url }, index) => (
    <div key={index} className="flex items-center space-x-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-yellow-600 transition-colors duration-300"
      >
        <Icon className="w-6 h-6" />
      </a>
    </div>
  ))}
  <div className="flex items-center space-x-1">
      <a
        href={indiamartLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform duration-300"
      >
        <img 
          src={indiamart} 
          alt="IndiaMart" 
          className="w-6 h-6 object-contain rounded-sm"
        />
      </a>
    </div>
</div>

          </div>

          {/* Address */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-pink-600 mb-4 flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-2 text-yellow-600" /> Postal Address
            </h3>
            <address className="text-gray-600 not-italic space-y-2">
              <p>Fourth Floor, Office-403<br />
                Grace Business Park<br />
                Opp. Sagar Sangheft-1, Near Saral Heights<br />
                Kargil Petrol Pump Road<br />
                Sola, Ahmedabad - 380060
              </p>
            </address>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-pink-600 mb-4 flex items-center justify-center md:justify-start">
              <FaClock className="mr-2 text-yellow-600" /> Contact Details
            </h3>
            <div className="space-y-4 text-gray-600">
              {phoneNumbers.map((phone, idx) => (
                <div key={idx} className="flex flex-col items-center md:block mb-1">
                  <div className="flex items-center">
                    <FaPhone className="text-yellow-600 mr-2" />
                    <div>
                      <div className="text-sm font-semibold text-gray-600">{phone.name}</div>
                      <a href={`tel:${phone.number}`} className="text-sm text-gray-600 hover:text-pink-600 transition">
                        {phone.number}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2 text-yellow-600" />
                <a href={`mailto:${emailAddress}`} className="hover:text-pink-600 transition">{emailAddress}</a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2 text-yellow-600" />
                <p>Ahmedabad ,Gujarat, India</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-pink-600 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[ { name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Contact', path: '/contact' } ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-600 hover:text-yellow-600 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t-2 border-yellow-200 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} UNIMAKE Industries. All rights reserved. |
            <Link to="/privacy" className="hover:text-pink-600 ml-1 mr-1">Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-yellow-600 ml-1">Terms</Link>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="bg-pink-100 px-3 py-1 rounded-full text-xs font-medium text-pink-700">
              ISO 9001:2015 Certified
            </span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium text-yellow-700">
              Make in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
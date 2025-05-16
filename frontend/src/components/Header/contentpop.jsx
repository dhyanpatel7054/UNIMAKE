import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaPlus } from 'react-icons/fa';

const HeaderContactButtons = ({ phoneNumbers, emailAddress, whatsappNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 lg:hidden">
      {/* Main toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-purple-600 text-white p-3 hover:bg-purple-500 
                 transition-all duration-300 flex items-center justify-center 
                 w-12 h-12 rounded-full shadow-lg"
        aria-label="Contact options"
      >
        <FaPlus 
          className={`transition-transform ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
          size={20}
        />
      </button>

      {/* Contact buttons with staggered animation */}
      <div className={`absolute right-0 flex flex-col gap-3 mt-3 
        ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <a
          href={`tel:${phoneNumbers[0]}`}
          className={`bg-purple-600 text-white p-3 transition-all duration-300 
            flex items-center justify-center w-12 h-12 rounded-full shadow-md
            hover:scale-110 ${isExpanded ? 'translate-y-0' : '-translate-y-5'}`}
          title="Call"
        >
          <FaPhoneAlt size={18} />
        </a>

        <a
          href={`mailto:${emailAddress}`}
          className={`bg-pink-500 text-white p-3 transition-all duration-300 
            flex items-center justify-center w-12 h-12 rounded-full shadow-md
            hover:scale-110 delay-75 ${isExpanded ? 'translate-y-0' : '-translate-y-5'}`}
          title="Email"
        >
          <FaEnvelope size={18} />
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-green-500 text-white p-3 transition-all duration-300 
            flex items-center justify-center w-12 h-12 rounded-full shadow-md
            hover:scale-110 delay-150 ${isExpanded ? 'translate-y-0' : '-translate-y-5'}`}
          title="WhatsApp"
        >
          <FaWhatsapp size={18} />
        </a>
      </div>
    </div>
  );
};

// Usage in your header component:
// <HeaderContactButtons
//   phoneNumbers={["+1234567890"]}
//   emailAddress="contact@example.com"
//   whatsappNumber="1234567890"
// />
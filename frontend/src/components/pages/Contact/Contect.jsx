import { useState, useRef } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const generateSecurityQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
  };
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    securityAnswer: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [securityQuestion, setSecurityQuestion] = useState(generateSecurityQuestion());
  const formRef = useRef(null);

  const phoneNumbers = [
    { name: "RAJKUMAR PATEL", number: "+91 9408903793" },
    { name: "HARPALSINH CHAUHAN", number: "+91 9979925228" }
  ];
  const emails = ["unimake06@gmail.com", "Unimakeengineering@gmail.com"];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    const userAnswer = parseInt(formData.securityAnswer);
    if (isNaN(userAnswer)) {
      newErrors.securityAnswer = 'Please enter a valid number';
    } else if (userAnswer !== securityQuestion.answer) {
      newErrors.securityAnswer = 'Wrong answer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const data = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_USER_ID,
        template_params: {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send email');

      setSubmitStatus('success');
      formRef.current.reset();
      setFormData({
        name: '',
        email: '',
        message: '',
        securityAnswer: ''
      });
      setSecurityQuestion(generateSecurityQuestion());
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-yellow-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-600">
            Get in Touch
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <InfoCard icon={<FiMapPin className="text-yellow-600 text-2xl" />} title="Our Headquarters">
              <address className="text-gray-600 not-italic space-y-2">
                <p>Fourth Floor, Office-403</p>
                <p>Grace Business Park</p>
                <p>Opp. Sagar Sangheft-1, Near Saral Heights</p>
                <p>Kargil Petrol Pump Road</p>
                <p>Sola, Ahmedabad - 380060</p>
              </address>
            </InfoCard>

            <InfoCard icon={<FiPhone className="text-pink-600 text-2xl" />} title="Direct Contact">
              <div className="space-y-2">
                {phoneNumbers.map(({ name, number }) => {
                  const whatsappNumber = number.replace(/[^\d]/g, '');
                  return (
                    <div key={number} className="flex items-center justify-between group">
                      <div>
                        <a
                          href={`tel:${number.replace(/\s+/g, '')}`}
                          className="text-gray-600 hover:text-yellow-600 transition-colors"
                        >
                          {number}
                        </a>
                        <span className="block text-sm text-pink-700 font-medium">{name}</span>
                      </div>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 ml-2"
                        aria-label="Chat on WhatsApp"
                      >
                        <FaWhatsapp className="text-2xl transition-transform hover:scale-110" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </InfoCard>

            <InfoCard icon={<FiMail className="text-yellow-600 text-2xl" />} title="Email Us">
              <div className="space-y-2">
                {emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="block text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </InfoCard>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              <FormField
                label="Your Name *"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
                placeholder="Enter your name"
              />

              <FormField
                label="Your Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isSubmitting}
                placeholder="Enter your email"
              />

              <FormField
                label="Your Message *"
                name="message"
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                disabled={isSubmitting}
                placeholder="Type your message here..."
              />

              <FormField
                label={`Security Check: ${securityQuestion.question} = ? *`}
                name="securityAnswer"
                type="text"
                value={formData.securityAnswer}
                onChange={handleChange}
                error={errors.securityAnswer}
                disabled={isSubmitting}
                placeholder="Enter the answer"
                inputMode="numeric"
              />

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-pink-600 to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-l hover:from-pink-700 hover:to-yellow-700'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-pink-50">
    <div className="flex items-start gap-4">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-pink-800 mb-3">{title}</h3>
        {children}
      </div>
    </div>
  </div>
);

const FormField = ({ label, name, type, value, onChange, error, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-pink-800 mb-2">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        rows="4"
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-pink-500 border-gray-300'
        } outline-none transition`}
        {...props}
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-pink-500 border-gray-300'
        } outline-none transition`}
        {...props}
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ContactSection;

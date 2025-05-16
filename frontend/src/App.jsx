import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import ProductPage from './components/pages/ProductPages/ProductPage';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contect';
import ScrollToTop from './components/scroleToTop/scrollToTop';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://unimake.vercel.app/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header products={products} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        {products.map((product) => (
          <Route 
            key={product._id} 
            path={`/products/${product._id}`}
            element={<ProductPage product={product} />}
          />
        ))}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

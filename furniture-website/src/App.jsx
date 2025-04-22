import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import productData from './data/products.json';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });

      return () => link.removeEventListener('click', () => {});
    });

    setProducts(productData);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full shadow z-50 flex justify-between items-center px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-xl font-bold">FurniCo</h1>
        <div className="space-x-6">
          <a href="#hero" className="hover:opacity-75">Home</a>
          <a href="#products" className="hover:opacity-75">Products</a>
          <a href="#about" className="hover:opacity-75">About</a>
          <a href="#newsletter" className="hover:opacity-75">Contact</a>
          <button onClick={() => setDarkMode(!darkMode)} className="ml-4 border px-2 py-1 rounded">
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center text-center p-10 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Modern Furniture</h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-xl mx-auto">
            Elevate your space with minimalist, handcrafted furniture designed for comfort and style.
          </p>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((item, i) => (
          <motion.div
            key={item.name}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="p-10 bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row items-center gap-10">
        <motion.img
          src="https://source.unsplash.com/400x300/?furniture"
          alt="About us"
          className="rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">About Our Craft</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-md">
            We blend modern aesthetics with time-honored craftsmanship to create stunning furniture pieces. Every item is a work of art.
          </p>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="p-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Subscribe to our newsletter for the latest arrivals and offers.</p>
          <input type="email" placeholder="Enter your email" className="border p-2 rounded-l-xl" />
          <button className="bg-black text-white px-4 py-2 rounded-r-xl">Subscribe</button>
        </motion.div>
      </section>
    </div>
  );
}
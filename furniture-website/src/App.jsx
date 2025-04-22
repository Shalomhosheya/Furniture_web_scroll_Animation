import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Import local images
import sofaImage from './assets/images/sofa.jpg';
import tableImage from './assets/images/diner-table-isolated-white-background-3d-illustration-cg-render_375001-16153.jpg';
import chairImage from './assets/images/chair.jpg'; // Make sure you have this image

// Product data with proper image references
const productData = [
  { 
    image: sofaImage,
    name: "Sofa", 
    description: "Premium quality sofa for your living space." 
  },
  { 
    image: chairImage,
    name: "Chair", 
    description: "Premium quality chair for your living space." 
  },
  { 
    image: tableImage,
    name: "Table", 
    description: "Premium quality table for your living space." 
  }
];
export default function App() {
   const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const appleRef = useRef(null);
  const parallaxRef = useRef(null);

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


  const { scrollYProgress } = useScroll({ target: appleRef, offset: ["start start", "end end"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["circle(100% at 50% 50%)", "circle(0% at 50% 50%)"]);

  // Parallax scroll effect
  const { scrollYProgress: parallaxScroll } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(parallaxScroll, [0, 1], ["0%", "50%"]);
  const yText = useTransform(parallaxScroll, [0, 1], ["0%", "100%"]);
  const yFurniture = useTransform(parallaxScroll, [0, 1], ["0%", "30%"]);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Apple Scroll Effect Overlay */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-40"
        style={{ clipPath, backgroundColor: darkMode ? '#111' : '#fff' }}
        ref={appleRef}
      />

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

      {/* Hero Section with Parallax */}
      <section 
        id="hero" 
        ref={parallaxRef}
        className="min-h-screen flex items-center justify-center text-center p-10 pt-32 overflow-hidden relative"
      >
        {/* Background layer (moves slowest) */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            y: yBg,
            background: darkMode 
              ? 'linear-gradient(to bottom, #1a202c, #2d3748)' 
              : 'linear-gradient(to bottom, #f7fafc, #edf2f7)'
          }}
        />
        
        {/* Furniture image layer (moves at medium speed) */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ y: yFurniture }}
        >
          <img 
            src={mainImage}
            alt="Modern furniture" 
            className="w-1/2 opacity-70"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://source.unsplash.com/800x600/?modern,furniture";
            }}
          />
        </motion.div>
        
        {/* Text content (moves fastest) */}
        <motion.div
          className="relative z-20"
          style={{ y: yText }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Modern Furniture</h1>
          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Elevate your space with minimalist, handcrafted furniture designed for comfort and style.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-lg font-medium"
          >
            Explore Collection
          </motion.button>
        </motion.div>
      </section>

      {/* Floating Product Cards */}
      <section id="products" className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
        {products.map((item, i) => (
          <motion.div
            key={item.name}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: i * 0.2, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              } 
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ 
              y: -10,
              boxShadow: darkMode 
                ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
              <motion.img 
                src={tableimage}
                alt={item.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://source.unsplash.com/400x300/?${item.name.replace(/\s+/g, '')}`;
                }}
              />
            </div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg"
            >
              View Details
            </motion.button>
          </motion.div>
        ))}
      </section>


      {/* About Section */}
      <section id="about" className="p-10 bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="relative w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="https://source.unsplash.com/600x400/?workshop"
            alt="Our workshop"
            className="rounded-2xl shadow-xl w-full"
            whileHover={{ scale: 1.02 }}
          />
          <motion.img
            src="https://source.unsplash.com/400x300/?wood,texture"
            alt="Wood texture"
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-xl shadow-lg border-4 border-white dark:border-gray-800"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold mb-4">About Our Craft</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We blend modern aesthetics with time-honored craftsmanship to create stunning furniture pieces. Every item is a work of art.
          </p>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-medium">Sustainable materials sourced ethically</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="p-10 text-center relative overflow-hidden">
        <motion.div 
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yellow-100 dark:bg-yellow-900 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Subscribe to our newsletter for the latest arrivals and offers.</p>
          <motion.div className="flex justify-center">
            <motion.input 
              type="email" 
              placeholder="Enter your email" 
              className="border p-3 rounded-l-xl w-64 md:w-96 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              whileFocus={{ 
                boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
                scale: 1.02
              }}
            />
            <motion.button 
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-r-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
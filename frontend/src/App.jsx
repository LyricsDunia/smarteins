import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedGadgets from "../components/FeaturedGadgets";
import BestDeals from "../components/BestDeals";
import TrendingItems from "../components/TrendingItems";
import PriceComparison from "../components/PriceComparison";
import FeatureComparison from "../components/FeatureComparison";
import PriceHistoryChart from "../components/PriceHistoryChart";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import BlogPost from "../components/BlogPost";
import BlogList from "../components/BlogList";  // ✅ Add this import

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://smarteins-backend.onrender.com/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          {/* Main Landing Page Route */}
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedGadgets />
              <BestDeals />
              <TrendingItems />
              <PriceComparison />
              <FeatureComparison />
              <PriceHistoryChart />
              
              {/* Product List Section */}
              <section className="product-list" style={{ padding: '20px' }}>
                {products.length === 0 ? (
                  <p>No products available.</p>
                ) : (
                  <ul>
                    {products.map(p => (
                      <li key={p._id}>{p.name}</li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          } />

          {/* ✅ Blog Routes - Show list at /blog, individual post at /blog/:slug */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
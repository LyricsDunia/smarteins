function Footer() {
  try {
    return (
      <footer className="bg-gray-900 text-white py-12" data-name="footer" data-file="components/Footer.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">Smarteins</h3>
              <p className="text-gray-400 mb-4">
                AI-powered recommendations for the best electronic gadgets. 
                Find your perfect tech companion with smart filtering and real-time price comparisons.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="icon-facebook text-xl"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="icon-twitter text-xl"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <div className="icon-instagram text-xl"></div>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Smartphones</a></li>
                <li><a href="#" className="hover:text-white">Laptops</a></li>
                <li><a href="#" className="hover:text-white">Headphones</a></li>
                <li><a href="#" className="hover:text-white">Tablets</a></li>
                <li><a href="#" className="hover:text-white">Smartwatches</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AI Search</a></li>
                <li><a href="#" className="hover:text-white">Price Comparison</a></li>
                <li><a href="#" className="hover:text-white">Voice Assistant</a></li>
                <li><a href="#" className="hover:text-white">Smart Filters</a></li>
                <li><a href="#" className="hover:text-white">Expert Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GadgetFinder. All rights reserved. Powered by AI technology.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}
export default Footer;
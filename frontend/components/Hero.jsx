function Hero({ searchQuery, setSearchQuery, isVoiceActive, setIsVoiceActive }) {
  try {
    const handleSearch = () => {
      if (searchQuery.trim()) {
        document.getElementById('ai-search')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleVoiceSearch = () => {
      setIsVoiceActive(!isVoiceActive);
      if (!isVoiceActive) {
        // Simulate voice recognition
        setTimeout(() => {
          setSearchQuery("Best smartphone under $800");
          setIsVoiceActive(false);
        }, 3000);
      }
    };

    return (
      <section id="home" className="gradient-bg text-white py-20" data-name="hero" data-file="components/Hero.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-[var(--accent-color)]">Electronic Gadget</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            AI-powered recommendations that cut through the noise. 
            Get personalized suggestions based on your needs, budget, and preferences.
          </p>

          <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Why Choose GadgetFinder?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <div className="icon-zap text-yellow-400 mr-2 mt-1"></div>
                <span>AI eliminates choice overload with personalized recommendations</span>
              </div>
              <div className="flex items-start">
                <div className="icon-shield-check text-green-400 mr-2 mt-1"></div>
                <span>Unbiased reviews from verified users and YouTube analysis</span>
              </div>
              <div className="flex items-start">
                <div className="icon-trending-down text-blue-400 mr-2 mt-1"></div>
                <span>Real-time price tracking across all major Indian retailers</span>
              </div>
              <div className="flex items-start">
                <div className="icon-cpu text-purple-400 mr-2 mt-1"></div>
                <span>Smart feature comparison highlights best specs automatically</span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white rounded-full p-2 shadow-lg">
              <input
                type="text"
                placeholder="Describe what you're looking for... (e.g., 'gaming laptop under $1500')"
                className="flex-1 px-4 py-3 text-[var(--text-primary)] bg-transparent border-none outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleVoiceSearch}
                className={`p-3 rounded-full mx-2 transition-colors duration-200 ${
                  isVoiceActive 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-[var(--primary-color)] hover:bg-gray-200'
                }`}
              >
                <div className="icon-mic text-xl"></div>
              </button>
              <button
                onClick={handleSearch}
                className="btn-primary rounded-full px-8"
              >
                <div className="icon-search text-lg"></div>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <div className="icon-zap text-sm mr-2 inline"></div>
              AI-Powered
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <div className="icon-shield-check text-sm mr-2 inline"></div>
              Trusted Reviews
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <div className="icon-trending-down text-sm mr-2 inline"></div>
              Best Prices
            </span>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}
export default Hero;

function AISearch({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, priceRange, setPriceRange }) {
  try {
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [filters, setFilters] = React.useState({
      brand: '',
      features: [],
      rating: 0
    });

    const categories = [
      { id: 'all', name: 'All Categories', icon: 'grid-3x3' },
      { id: 'smartphones', name: 'Smartphones', icon: 'smartphone' },
      { id: 'laptops', name: 'Laptops', icon: 'laptop' },
      { id: 'headphones', name: 'Headphones', icon: 'headphones' },
      { id: 'tablets', name: 'Tablets', icon: 'tablet' },
      { id: 'smartwatch', name: 'Smartwatches', icon: 'watch' }
    ];

    const performAISearch = async () => {
      if (!searchQuery.trim()) return;
      
      setIsLoading(true);
      try {
        // Simulate AI search with realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockResults = [
          {
            id: 1,
            name: "iPhone 15 Pro",
            category: "smartphones",
            price: 134900,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
            features: ["A17 Pro chip", "48MP camera", "Titanium design"],
            affiliate_link: "#"
          },
          {
            id: 2,
            name: "MacBook Air M2",
            category: "laptops", 
            price: 114900,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300",
            features: ["M2 chip", "18-hour battery", "Retina display"],
            affiliate_link: "#"
          },
          {
            id: 3,
            name: "Sony WH-1000XM5",
            category: "headphones",
            price: 29990,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
            features: ["Noise canceling", "30-hour battery", "Hi-Res audio"],
            affiliate_link: "#"
          }
        ];
        
        setSearchResults(mockResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    React.useEffect(() => {
      if (searchQuery) {
      performAISearch();
    }
  }, [searchQuery]);

  React.useEffect(() => {
    if (searchResults.length > 0) {
      applyFilters();
    }
  }, [selectedCategory, priceRange]);

  const applyFilters = () => {
    const mockResults = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        category: "smartphones",
        price: 134900,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
        features: ["A17 Pro chip", "48MP camera", "Titanium design"],
        affiliate_link: "#"
      },
      {
        id: 2,
        name: "MacBook Air M2",
        category: "laptops", 
        price: 114900,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300",
        features: ["M2 chip", "18-hour battery", "Retina display"],
        affiliate_link: "#"
      },
      {
        id: 3,
        name: "Sony WH-1000XM5",
        category: "headphones",
        price: 29990,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
        features: ["Noise canceling", "30-hour battery", "Hi-Res audio"],
        affiliate_link: "#"
      },
      {
        id: 4,
        name: "Samsung Galaxy Tab S9",
        category: "tablets",
        price: 54990,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
        features: ["S Pen included", "120Hz display", "Android 13"],
        affiliate_link: "#"
      },
      {
        id: 5,
        name: "Apple Watch Series 9",
        category: "smartwatch",
        price: 41900,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        features: ["Health monitoring", "GPS", "Water resistant"],
        affiliate_link: "#"
      }
    ];

    const filtered = mockResults.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
    
    setSearchResults(filtered);
  };

    return (
      <section id="ai-search" className="py-16 bg-gray-50" data-name="ai-search" data-file="components/AISearch.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Smart Search & Filtering
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our AI analyzes your requirements and finds the perfect match from thousands of products
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-lg border transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]'
                      : 'bg-white text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--primary-color)]'
                  }`}
                >
                  <div className={`icon-${category.icon} text-lg mr-2`}></div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-8 max-w-md mx-auto">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Price Range: ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Search Results */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
              <p className="text-[var(--text-secondary)]">AI is analyzing your request...</p>
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(product => (
                <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {product.rating} ({Math.floor(Math.random() * 500 + 100)} reviews)
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--primary-color)] mb-3">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <ul className="text-sm text-[var(--text-secondary)] mb-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-1">
                        <div className="icon-check text-[var(--success-color)] mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn-primary w-full">
                    View Best Deals
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('AISearch component error:', error);
    return null;
  }
}
export default AISearch;
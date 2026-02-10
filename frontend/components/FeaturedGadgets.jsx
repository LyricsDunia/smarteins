
import { youtubeAPI } from '../utils/youtubeAPI.jsx';

function FeaturedGadgets({ category, priceRange }) {
  try {
    const [featuredProducts, setFeaturedProducts] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [youtubeVideos, setYoutubeVideos] = React.useState([]);
    const [videoSummaries, setVideoSummaries] = React.useState({});
    const [isLoadingVideos, setIsLoadingVideos] = React.useState(false);

    const mockFeaturedProducts = [
      {
        id: 1,
        name: "Samsung Galaxy S24 Ultra",
        category: "smartphones",
        price: 1199,
        originalPrice: 1299,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        badge: "Editor's Choice",
        features: ["200MP camera", "S Pen included", "AI features"]
      },
      {
        id: 2,
        name: "Dell XPS 13",
        category: "laptops",
        price: 999,
        originalPrice: 1199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
        badge: "Best Value",
        features: ["Intel i7", "16GB RAM", "512GB SSD"]
      },
      {
        id: 3,
        name: "AirPods Pro 2",
        category: "headphones",
        price: 249,
        originalPrice: 279,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
        badge: "Trending",
        features: ["Active noise canceling", "Spatial audio", "MagSafe charging"]
      },
      {
        id: 4,
        name: "iPad Air",
        category: "tablets",
        price: 599,
        originalPrice: 649,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
        badge: "Popular",
        features: ["M1 chip", "10.9-inch display", "Apple Pencil support"]
      }
    ];

    React.useEffect(() => {
      const filtered = mockFeaturedProducts.filter(product => {
        const categoryMatch = category === 'all' || product.category === category;
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        return categoryMatch && priceMatch;
      });
      setFeaturedProducts(filtered);
    }, [category, priceRange]);

    const showProductDetails = async (product) => {
      setSelectedProduct(product);
      setIsLoadingVideos(true);
      
      try {
        // Fetch YouTube videos for the product
        const videoResponse = await youtubeAPI.searchProductReviews(product.name, 3);
        if (videoResponse.success) {
          setYoutubeVideos(videoResponse.videos);
          
          // Get AI summaries for each video
          const summaries = {};
          for (const video of videoResponse.videos) {
            const summaryResponse = await youtubeAPI.summarizeVideoContent(video.id, video.title);
            if (summaryResponse.success) {
              summaries[video.id] = summaryResponse.summary;
            }
          }
          setVideoSummaries(summaries);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    const closeProductDetails = () => {
      setSelectedProduct(null);
      setYoutubeVideos([]);
      setVideoSummaries({});
    };

    return (
      <section className="py-16 bg-white" data-name="featured-gadgets" data-file="components/FeaturedGadgets.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Featured Gadgets
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Hand-picked by our AI and expert reviewers for the best value and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <span className="absolute top-2 left-2 bg-[var(--accent-color)] text-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.badge}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  <span className="text-2xl font-bold text-[var(--primary-color)]">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-[var(--text-secondary)] line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <ul className="text-sm text-[var(--text-secondary)] mb-4 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="icon-check text-[var(--success-color)] mr-2 text-xs"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex space-x-2 mb-3">
                  <button 
                    onClick={() => showProductDetails(product)}
                    className="btn-primary flex-1 text-sm"
                  >
                    <div className="icon-play mr-2 inline text-xs"></div>
                    View Reviews
                  </button>
                  <button className="btn-secondary px-3">
                    <div className="icon-heart text-sm"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {featuredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="icon-search text-4xl text-[var(--text-secondary)] mb-4"></div>
              <p className="text-[var(--text-secondary)]">
                No products found in this category and price range. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Product Details Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                    <button 
                      onClick={closeProductDetails}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <div className="icon-x text-2xl"></div>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <div className="text-3xl font-bold text-[var(--primary-color)] mb-2">
                        ${selectedProduct.price}
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">
                          {'★'.repeat(Math.floor(selectedProduct.rating))}
                        </div>
                        <span>{selectedProduct.rating} rating</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">YouTube Reviews & Analysis</h3>
                      {isLoadingVideos ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto"></div>
                          <p className="mt-2 text-[var(--text-secondary)]">Loading video reviews...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {youtubeVideos.map(video => (
                            <div key={video.id} className="border border-[var(--border-color)] rounded-lg p-4">
                              <div className="flex items-start space-x-3">
                                <img 
                                  src={video.thumbnail} 
                                  alt={video.title}
                                  className="w-24 h-18 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm mb-1">{video.title}</h4>
                                  <p className="text-xs text-[var(--text-secondary)] mb-2">
                                    {video.channelTitle} • {video.viewCount} • {video.duration}
                                  </p>
                                  {videoSummaries[video.id] && (
                                    <div className="bg-blue-50 p-3 rounded text-sm">
                                      <h5 className="font-medium mb-1">AI Summary:</h5>
                                      <p className="text-[var(--text-secondary)]">
                                        {videoSummaries[video.id].substring(0, 150)}...
                                      </p>
                                    </div>
                                  )}
                                  <a 
                                    href={video.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center mt-2 text-[var(--primary-color)] text-sm hover:underline"
                                  >
                                    <div className="icon-play mr-1"></div>
                                    Watch Review
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeaturedGadgets component error:', error);
    return null;
  }
}

export default FeaturedGadgets;
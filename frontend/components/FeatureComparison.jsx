import React from 'react';
import { youtubeAPI } from '../utils/youtubeAPI.jsx';

//console.log("youtubeAPI:", youtubeAPI);
function FeatureComparison() {
  try {
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [allProducts, setAllProducts] = React.useState([]);
    const [comparisonVideos, setComparisonVideos] = React.useState({});
    const [videoSummaries, setVideoSummaries] = React.useState({});
    const [isLoadingVideos, setIsLoadingVideos] = React.useState(false);

    React.useEffect(() => {
      const fetchProducts = async () => {
        try {
          const mockProducts = [
            {
              objectId: '1',
              objectData: {
                name: 'iPhone 15 Pro',
                category: 'smartphones',
                price: '134900',
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
                specifications: JSON.stringify({
                  processor: 'A17 Pro',
                  camera: '48MP',
                  storage: '128GB'
                })
              }
            },
            {
              objectId: '2',
              objectData: {
                name: 'Samsung Galaxy S24 Ultra',
                category: 'smartphones', 
                price: '129900',
                rating: 4.7,
                image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
                specifications: JSON.stringify({
                  processor: 'Snapdragon 8 Gen 3',
                  camera: '200MP',
                  storage: '256GB'
                })
              }
            }
          ];
          
          setAllProducts(mockProducts);
          setSelectedProducts(mockProducts.slice(0, 3));
          
          // Fetch videos for selected products
          await fetchComparisonVideos(mockProducts.slice(0, 3));
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }, []);

    const fetchComparisonVideos = async (products) => {
      setIsLoadingVideos(true);
      const videos = {};
      const summaries = {};
      
      try {
        for (const product of products) {
          const videoResponse = await youtubeAPI.searchProductReviews(product.objectData.name, 2);
          if (videoResponse.success) {
            videos[product.objectId] = videoResponse.videos;
            
            // Get AI summary for the first video
            if (videoResponse.videos.length > 0) {
              const summaryResponse = await youtubeAPI.summarizeVideoContent(
                videoResponse.videos[0].id, 
                videoResponse.videos[0].title
              );
              if (summaryResponse.success) {
                summaries[product.objectId] = summaryResponse.summary;
              }
            }
          }
        }
        
        setComparisonVideos(videos);
        setVideoSummaries(summaries);
      } catch (error) {
        console.error('Error fetching comparison videos:', error);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    const getFeatureComparison = () => {
      if (selectedProducts.length === 0) return [];
      
      const allFeatures = new Set();
      selectedProducts.forEach(product => {
        if (product.objectData.specifications) {
          try {
            const specs = JSON.parse(product.objectData.specifications);
            Object.keys(specs).forEach(key => allFeatures.add(key));
          } catch (e) {
            console.error('Error parsing specifications:', e);
          }
        }
      });

      return Array.from(allFeatures).map(feature => {
        const comparison = {
          feature: feature.charAt(0).toUpperCase() + feature.slice(1),
          values: selectedProducts.map(product => {
            try {
              const specs = JSON.parse(product.objectData.specifications || '{}');
              return specs[feature] || 'N/A';
            } catch (e) {
              return 'N/A';
            }
          }),
          bestIndex: 0
        };
        
        // Simple logic to determine best feature
        comparison.bestIndex = comparison.values.findIndex(value => 
          value !== 'N/A' && value.length > 0
        );
        
        return comparison;
      });
    };

    return (
      <section className="py-16 bg-white" data-name="feature-comparison" data-file="components/FeatureComparison.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Feature Comparison
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Compare features side by side to make the best choice
            </p>
          </div>

          {selectedProducts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-[var(--border-color)]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {selectedProducts.map(product => (
                      <th key={product.objectId} className="text-center p-4 min-w-48">
                        <img
                          src={product.objectData.image}
                          alt={product.objectData.name}
                          className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                        />
                        <div className="font-semibold text-sm">{product.objectData.name}</div>
                        <div className="text-[var(--primary-color)] font-bold">
                          ₹{parseInt(product.objectData.price).toLocaleString('en-IN')}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getFeatureComparison().map((comparison, index) => (
                    <tr key={index} className="border-t border-[var(--border-color)]">
                      <td className="p-4 font-medium text-[var(--text-primary)]">
                        {comparison.feature}
                      </td>
                      {comparison.values.map((value, valueIndex) => (
                        <td key={valueIndex} className={`p-4 text-center ${
                          valueIndex === comparison.bestIndex && value !== 'N/A'
                            ? 'bg-green-50 text-green-800 font-semibold'
                            : 'text-[var(--text-secondary)]'
                        }`}>
                          {valueIndex === comparison.bestIndex && value !== 'N/A' && (
                            <div className="icon-crown text-yellow-500 text-sm mb-1"></div>
                          )}
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Video Reviews Section for Comparison */}
          {selectedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8">Video Reviews Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedProducts.map(product => (
                  <div key={product.objectId} className="card">
                    <h4 className="font-semibold mb-4">{product.objectData.name}</h4>
                    
                    {isLoadingVideos ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--primary-color)] mx-auto"></div>
                      </div>
                    ) : comparisonVideos[product.objectId] ? (
                      <div className="space-y-3">
                        {comparisonVideos[product.objectId].slice(0, 1).map(video => (
                          <div key={video.id} className="border border-[var(--border-color)] rounded p-3">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-32 object-cover rounded mb-2"
                            />
                            <h5 className="text-sm font-medium mb-1">{video.title}</h5>
                            <p className="text-xs text-[var(--text-secondary)] mb-2">
                              {video.channelTitle} • {video.viewCount}
                            </p>
                            
                            {videoSummaries[product.objectId] && (
                              <div className="bg-blue-50 p-2 rounded text-xs mb-2">
                                <h6 className="font-medium mb-1">AI Summary:</h6>
                                <p className="text-[var(--text-secondary)]">
                                  {videoSummaries[product.objectId].substring(0, 100)}...
                                </p>
                              </div>
                            )}
                            
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[var(--primary-color)] text-xs hover:underline"
                            >
                              <div className="icon-play mr-1"></div>
                              Watch Review
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[var(--text-secondary)] text-sm">No reviews available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeatureComparison component error:', error);
    return null;
  }
}

export default FeatureComparison;
import React from 'react';

function TrendingItems() {
  try {
    const [trendingProducts, setTrendingProducts] = React.useState([]);

    React.useEffect(() => {
      const fetchTrending = async () => {
        try {
          const response = await mongoAPI.getProducts({ trending: true });
          if (response.success) {
            const trending = response.data.slice(0, 5).map(product => ({
              objectId: product._id,
              objectData: {
                name: product.name,
                price: product.price.toString(),
                rating: product.rating,
                image: product.image,
                trending: product.trending
              }
            }));
            setTrendingProducts(trending);
          }
        } catch (error) {
          console.error('Error fetching trending products:', error);
        }
      };
      fetchTrending();
    }, []);

    return (
      <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50" data-name="trending-items" data-file="components/TrendingItems.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              <div className="icon-trending-up text-3xl text-red-500 mr-3 inline"></div>
              Trending Now
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Most popular gadgets everyone is talking about
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingProducts.slice(0, 5).map((product, index) => (
              <div key={product.objectId} className="card hover:shadow-lg transition-all duration-200 relative">
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  #{index + 1}
                </div>
                <img
                  src={product.objectData.image}
                  alt={product.objectData.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 line-clamp-2">
                  {product.objectData.name}
                </h3>
                <p className="text-lg font-bold text-[var(--primary-color)]">
                  ₹{parseInt(product.objectData.price).toLocaleString('en-IN')}
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-1">
                    {'★'.repeat(Math.floor(product.objectData.rating))}
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {product.objectData.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('TrendingItems component error:', error);
    return null;
  }
}

export default TrendingItems;
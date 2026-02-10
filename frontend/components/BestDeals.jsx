import React from 'react';
function BestDeals() {
  try {
    const [bestDeals, setBestDeals] = React.useState([]);

    React.useEffect(() => {
      const fetchBestDeals = async () => {
        try {
          const response = await mongoAPI.getProducts({ bestDeal: true });
          if (response.success) {
            const deals = response.data.slice(0, 5).map(product => ({
              objectId: product._id,
              objectData: {
                name: product.name,
                price: product.price.toString(),
                originalPrice: product.originalPrice?.toString() || product.price.toString(),
                rating: product.rating,
                image: product.image,
                bestDeal: product.bestDeal
              }
            }));
            setBestDeals(deals);
          }
        } catch (error) {
          console.error('Error fetching best deals:', error);
        }
      };
      fetchBestDeals();
    }, []);

    return (
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50" data-name="best-deals" data-file="components/BestDeals.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              <div className="icon-zap text-3xl text-yellow-500 mr-3 inline"></div>
              Best Deals Today
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Limited time offers you don't want to miss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestDeals.slice(0, 5).map(product => {
              const savings = parseInt(product.objectData.originalPrice) - parseInt(product.objectData.price);
              const discountPercent = Math.round((savings / parseInt(product.objectData.originalPrice)) * 100);
              
              return (
                <div key={product.objectId} className="card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    {discountPercent}% OFF
                  </div>
                  <img
                    src={product.objectData.image}
                    alt={product.objectData.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {product.objectData.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <span className="text-xl font-bold text-[var(--primary-color)]">
                      ₹{parseInt(product.objectData.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] line-through ml-2">
                      ₹{parseInt(product.objectData.originalPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-sm text-green-600 font-medium mb-3">
                    You save ₹{savings.toLocaleString('en-IN')}
                  </div>
                  <button className="btn-primary w-full text-sm">
                    <div className="icon-shopping-cart mr-2 inline"></div>
                    Grab Deal Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('BestDeals component error:', error);
    return null;
  }
}
export default BestDeals;
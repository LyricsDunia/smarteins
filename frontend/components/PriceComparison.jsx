import React from 'react';
function PriceComparison() {
  try {
    const [comparisonData, setComparisonData] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const mockComparisonData = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200",
        stores: [
          { name: "Amazon India", price: 134900, shipping: "Free", rating: 4.8, link: "#" },
          { name: "Flipkart", price: 136900, shipping: "Free", rating: 4.6, link: "#" },
          { name: "Reliance Digital", price: 139900, shipping: "₹99", rating: 4.5, link: "#" },
          { name: "Croma", price: 137900, shipping: "Free", rating: 4.4, link: "#" }
        ]
      },
      {
        id: 2,
        name: "MacBook Air M2",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200",
        stores: [
          { name: "Amazon India", price: 114900, shipping: "Free", rating: 4.7, link: "#" },
          { name: "Flipkart", price: 116900, shipping: "Free", rating: 4.5, link: "#" },
          { name: "Reliance Digital", price: 119900, shipping: "₹149", rating: 4.3, link: "#" },
          { name: "Croma", price: 117900, shipping: "Free", rating: 4.2, link: "#" }
        ]
      }
    ];

    React.useEffect(() => {
      setComparisonData(mockComparisonData);
      setSelectedProduct(mockComparisonData[0]);
    }, []);

    return (
      <section id="compare" className="py-16 bg-white" data-name="price-comparison" data-file="components/PriceComparison.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Real-time Price Comparison
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Compare prices across multiple retailers to find the best deals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Product</h3>
              <div className="space-y-3">
                {comparisonData.map(product => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedProduct?.id === product.id
                        ? 'border-[var(--primary-color)] bg-blue-50'
                        : 'border-[var(--border-color)] hover:border-[var(--primary-color)]'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedProduct && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Price Comparison</h3>
                <div className="space-y-4">
                  {selectedProduct.stores.map((store, index) => (
                    <div key={index} className="card">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                            <div className="icon-store text-xl text-[var(--text-secondary)]"></div>
                          </div>
                          <div>
                            <h4 className="font-semibold">{store.name}</h4>
                            <div className="flex items-center text-sm text-[var(--text-secondary)]">
                              <span className="mr-2">Rating: {store.rating}</span>
                              <span>Shipping: {store.shipping}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[var(--primary-color)]">
                            ₹{store.price.toLocaleString('en-IN')}
                          </div>
                          <button className="btn-primary mt-2 text-sm">
                            View Deal
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('PriceComparison component error:', error);
    return (
    <div className="p-6 text-gray-500">
      No data yet
    </div>
  );
  }
}

export default PriceComparison;
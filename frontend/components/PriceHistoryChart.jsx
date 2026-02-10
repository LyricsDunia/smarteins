import React from 'react';
function PriceHistoryChart({ productId, productName }) {
  try {
    const [priceHistory, setPriceHistory] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
      if (productId) {
        fetchPriceHistory();
      }
    }, [productId]);

    React.useEffect(() => {
      if (priceHistory.length > 0 && chartRef.current) {
        renderChart();
      }
      
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [priceHistory]);

    const fetchPriceHistory = async () => {
      setIsLoading(true);
      try {
        // Generate mock price history for demonstration
        const history = [];
        const basePrice = Math.floor(Math.random() * 50000) + 20000;
        
        for (let i = 30; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          const variation = (Math.random() - 0.5) * 0.15;
          const price = Math.floor(basePrice * (1 + variation));
          
          history.push({
            date: date.toISOString().split('T')[0],
            price: price,
            retailer: 'Average'
          });
        }
        
        setPriceHistory(history);
      } catch (error) {
        console.error('Error fetching price history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const renderChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const ChartJS = window.Chart;
      
      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: priceHistory.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          }),
          datasets: [{
            label: 'Price (₹)',
            data: priceHistory.map(item => item.price),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: `Price History - ${productName || 'Product'}`,
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: function(value) {
                  return '₹' + value.toLocaleString('en-IN');
                }
              }
            }
          },
          elements: {
            point: {
              radius: 3,
              hoverRadius: 6
            }
          }
        }
      });
    };

    if (!productId) return null;

    return (
      <div className="card mt-6" data-name="price-history-chart" data-file="components/PriceHistoryChart.jsx">
        <h3 className="text-xl font-semibold mb-4">Price History (Last 30 Days)</h3>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
          </div>
        ) : (
          <div className="relative h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        )}
        
        {priceHistory.length > 0 && (
          <div className="mt-4 text-sm text-[var(--text-secondary)]">
            <div className="flex justify-between">
              <span>Lowest: ₹{Math.min(...priceHistory.map(h => h.price)).toLocaleString('en-IN')}</span>
              <span>Highest: ₹{Math.max(...priceHistory.map(h => h.price)).toLocaleString('en-IN')}</span>
              <span>Current: ₹{priceHistory[priceHistory.length - 1]?.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('PriceHistoryChart component error:', error);
    return null;
  }
}

export default PriceHistoryChart;
// Price API utility for fetching real-time prices from affiliate sites
const priceAPI = {
  async fetchPrices(productId, productName) {
    try {
      // Simulate API call to multiple retailers
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockPrices = [
        {
          retailer: 'Amazon India',
          price: Math.floor(Math.random() * 10000) + 25000,
          shipping: Math.random() > 0.5 ? 'Free' : '₹99',
          inStock: Math.random() > 0.1,
          rating: (Math.random() * 1 + 4).toFixed(1),
          affiliateLink: `#amazon-${productId}`,
          lastUpdated: new Date().toISOString()
        },
        {
          retailer: 'Flipkart',
          price: Math.floor(Math.random() * 10000) + 26000,
          shipping: Math.random() > 0.3 ? 'Free' : '₹149',
          inStock: Math.random() > 0.15,
          rating: (Math.random() * 1 + 4).toFixed(1),
          affiliateLink: `#flipkart-${productId}`,
          lastUpdated: new Date().toISOString()
        },
        {
          retailer: 'Reliance Digital',
          price: Math.floor(Math.random() * 10000) + 27000,
          shipping: '₹199',
          inStock: Math.random() > 0.2,
          rating: (Math.random() * 1 + 4).toFixed(1),
          affiliateLink: `#reliance-${productId}`,
          lastUpdated: new Date().toISOString()
        },
        {
          retailer: 'Croma',
          price: Math.floor(Math.random() * 10000) + 25500,
          shipping: Math.random() > 0.4 ? 'Free' : '₹99',
          inStock: Math.random() > 0.25,
          rating: (Math.random() * 1 + 4).toFixed(1),
          affiliateLink: `#croma-${productId}`,
          lastUpdated: new Date().toISOString()
        }
      ];
      
      return {
        success: true,
        prices: mockPrices.sort((a, b) => a.price - b.price),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Price fetch error:', error);
      return {
        success: false,
        error: 'Unable to fetch current prices'
      };
    }
  },

  async trackPriceHistory(productId, days = 30) {
    try {
      // Generate mock price history data
      const history = [];
      const basePrice = Math.floor(Math.random() * 500) + 200;
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        const price = Math.floor(basePrice * (1 + variation));
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: price,
          retailer: 'Average'
        });
      }
      
      return {
        success: true,
        history: history,
        trend: this.calculateTrend(history),
        recommendation: this.getPriceRecommendation(history)
      };
    } catch (error) {
      console.error('Price history error:', error);
      return { success: false };
    }
  },

  calculateTrend(history) {
    if (history.length < 2) return 'stable';
    
    const recent = history.slice(-7); // Last 7 days
    const older = history.slice(-14, -7); // Previous 7 days
    
    const recentAvg = recent.reduce((sum, item) => sum + item.price, 0) / recent.length;
    const olderAvg = older.reduce((sum, item) => sum + item.price, 0) / older.length;
    
    const change = (recentAvg - olderAvg) / olderAvg;
    
    if (change > 0.05) return 'rising';
    if (change < -0.05) return 'falling';
    return 'stable';
  },

  getPriceRecommendation(history) {
    const trend = this.calculateTrend(history);
    const currentPrice = history[history.length - 1].price;
    const avgPrice = history.reduce((sum, item) => sum + item.price, 0) / history.length;
    
    if (trend === 'falling' || currentPrice < avgPrice * 0.95) {
      return {
        action: 'buy',
        message: 'Good time to buy! Price is below average.',
        confidence: 'high'
      };
    } else if (trend === 'rising' || currentPrice > avgPrice * 1.05) {
      return {
        action: 'wait',
        message: 'Consider waiting. Price might drop soon.',
        confidence: 'medium'
      };
    }
    
    return {
      action: 'neutral',
      message: 'Price is stable. Buy when ready.',
      confidence: 'medium'
    };
  },

  async setUpPriceAlert(productId, targetPrice, userEmail) {
    try {
      // Simulate setting up price alert
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        alertId: `alert_${productId}_${Date.now()}`,
        message: 'Price alert set successfully!'
      };
    } catch (error) {
      console.error('Price alert error:', error);
      return {
        success: false,
        error: 'Unable to set price alert'
      };
    }
  }
};

window.priceAPI = priceAPI;
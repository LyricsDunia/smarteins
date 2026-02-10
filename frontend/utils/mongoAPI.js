// MongoDB API Utility for Browser-based Operations
const mongoAPI = {
  // Base API endpoint - adjust for your backend
  baseURL: '/api',
  
  // Generic API request function
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options
      };
      
      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }
      
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('MongoDB API request failed:', error);
      // Fallback to mock data for development
      return this.getMockData(endpoint, options);
    }
  },

  // Products API
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/products${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  },

  async getProduct(productId) {
    return await this.request(`/products/${productId}`);
  },

  async createProduct(productData) {
    return await this.request('/products', {
      method: 'POST',
      body: productData
    });
  },

  async updateProduct(productId, updateData) {
    return await this.request(`/products/${productId}`, {
      method: 'PUT',
      body: updateData
    });
  },

  // Price History API
  async getPriceHistory(productId, days = 30) {
    return await this.request(`/price-history/${productId}?days=${days}`);
  },

  async addPriceEntry(productId, priceData) {
    return await this.request(`/price-history/${productId}`, {
      method: 'POST',
      body: priceData
    });
  },

  // Reviews API
  async getReviews(productId) {
    return await this.request(`/reviews?productId=${productId}`);
  },

  async createReview(reviewData) {
    return await this.request('/reviews', {
      method: 'POST',
      body: reviewData
    });
  },

  // Missing Products API
  async reportMissingProduct(productQuery) {
    return await this.request('/missing-products', {
      method: 'POST',
      body: {
        query: productQuery,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
    });
  },

  // Mock data fallback for development
  getMockData(endpoint, options = {}) {
    if (endpoint.includes('/products')) {
      return {
        success: true,
        data: [
          {
            _id: '1',
            name: 'iPhone 15 Pro',
            category: 'smartphones',
            price: 134900,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
            specifications: {
              processor: 'A17 Pro',
              camera: '48MP',
              storage: '128GB'
            },
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            name: 'Samsung Galaxy S24 Ultra',
            category: 'smartphones',
            price: 129900,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
            specifications: {
              processor: 'Snapdragon 8 Gen 3',
              camera: '200MP',
              storage: '256GB'
            },
            createdAt: new Date().toISOString()
          }
        ]
      };
    }
    
    return { success: false, error: 'Mock data not available for this endpoint' };
  }
};

window.mongoAPI = mongoAPI;
// MongoDB Database Configuration
const mongoConfig = {
  // Connection string - replace with your MongoDB URI
  connectionString: process.env.MONGODB_URI || 'mongodb://localhost:27017/smarteins_db',
  
  // Database name
  dbName: 'productlist',
  
  // Collection names
  collections: {
    products: 'products',
    users: 'users',
    reviews: 'reviews',
    priceHistory: 'price_history',
    missingProducts: 'missing_products',
    emailAlerts: 'email_alerts'
  },
  
  // Connection options
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

// MongoDB connection utility
class DatabaseConnection {
  constructor() {
    this.client = null;
    this.db = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      if (typeof window !== 'undefined') {
        // Browser environment - use API endpoints
        return true;
      }
      
      const { MongoClient } = require('mongodb');
      this.client = new MongoClient(mongoConfig.connectionString, mongoConfig.options);
      
      await this.client.connect();
      this.db = this.client.db(mongoConfig.dbName);
      this.isConnected = true;
      
      console.log('Connected to MongoDB successfully');
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      this.isConnected = false;
      return false;
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.close();
        this.isConnected = false;
        console.log('Disconnected from MongoDB');
      }
    } catch (error) {
      console.error('MongoDB disconnect error:', error);
    }
  }

  getCollection(collectionName) {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db.collection(collectionName);
  }
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mongoConfig, DatabaseConnection };
}

// Make available globally for browser environment
if (typeof window !== 'undefined') {
  window.mongoConfig = mongoConfig;
  window.DatabaseConnection = DatabaseConnection;
}
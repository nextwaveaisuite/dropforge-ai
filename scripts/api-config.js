// API Configuration
// Automatically detects environment and uses correct API URL

const API_CONFIG = {
  // Production API URL (replace with your deployed backend URL)
  production: 'https://your-api.vercel.app',
  
  // Development API URL
  development: 'http://localhost:3000',
  
  // Get current API URL based on environment
  getBaseURL() {
    // Check if running locally
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.development;
    }
    return this.production;
  },
  
  // API endpoints
  endpoints: {
    validateProduct: '/api/validation/validate-product',
    validateBatch: '/api/validation/validate-batch',
    searchProducts: '/api/products/search',
    getProduct: '/api/products',
    saveProduct: '/api/products',
    getSuppliers: '/api/suppliers',
    createStore: '/api/stores',
    getUserStores: '/api/stores/user'
  },
  
  // Make API request
  async request(endpoint, options = {}) {
    const baseURL = this.getBaseURL();
    const url = `${baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
      const response = await fetch(url, finalOptions);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
  
  // Convenience methods
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}

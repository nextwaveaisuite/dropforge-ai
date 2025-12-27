// ===================================================
// AliExpress API Configuration
// ===================================================
// YOUR CREDENTIALS ARE CONFIGURED BELOW
// ===================================================
const ALIEXPRESS_CONFIG = {
  // Your AliExpress App Key
  APP_KEY: '524060',
  
  // Your AliExpress App Secret
  APP_SECRET: 'GQPY8AF3D92as8l1BsRKqsuoagkxeBWl',
  
  // AliExpress API Base URL
  API_BASE_URL: 'https://api-sg.aliexpress.com/sync',
  
  // API Endpoints
  ENDPOINTS: {
    PRODUCT_SEARCH: '/aliexpress.ds.product.get',
    PRODUCT_DETAILS: '/aliexpress.ds.product.get',
    RECOMMEND_FEED: '/aliexpress.ds.recommend.feed.get'
  }
};

// Export for Node.js backend
if (typeof module !== 'undefined' && module.exports ) {
  module.exports = ALIEXPRESS_CONFIG;
}

// Export for browser (if needed)
if (typeof window !== 'undefined') {
  window.ALIEXPRESS_CONFIG = ALIEXPRESS_CONFIG;
}

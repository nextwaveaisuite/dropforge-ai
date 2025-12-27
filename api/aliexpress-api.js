// ===================================================
// AliExpress API Handler
// Handles authentication, signature generation, and API calls
// ===================================================

const crypto = require('crypto');
const https = require('https' );
const config = require('./api-config');

class AliExpressAPI {
  constructor() {
    this.appKey = config.APP_KEY;
    this.appSecret = config.APP_SECRET;
    this.baseUrl = config.API_BASE_URL;
  }

  // ===================================================
  // Generate Signature for AliExpress API
  // ===================================================
  generateSignature(params) {
    // Sort parameters
    const keys = Object.keys(params).sort();
    let signStr = '';

    for (const key of keys) {
      signStr += key + params[key];
    }

    // Add app secret at beginning and end
    signStr = this.appSecret + signStr + this.appSecret;

    // Generate MD5 hash
    const signature = crypto
      .createHash('md5')
      .update(signStr)
      .digest('hex')
      .toUpperCase();

    return signature;
  }

  // ===================================================
  // Make API Request
  // ===================================================
  makeRequest(endpoint, params) {
    return new Promise((resolve, reject) => {
      try {
        // Add common parameters
        const requestParams = {
          app_key: this.appKey,
          timestamp: Math.floor(Date.now() / 1000),
          format: 'json',
          v: '2.0',
          ...params
        };

        // Generate signature
        const signature = this.generateSignature(requestParams);
        requestParams.sign = signature;

        // Build query string
        const queryString = Object.keys(requestParams)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`)
          .join('&');

        const url = `${this.baseUrl}${endpoint}?${queryString}`;

        console.log(`📡 API Request: ${endpoint}`);

        // Make HTTPS request
        https.get(url, (res ) => {
          let data = '';

          res.on('data', chunk => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              const response = JSON.parse(data);
              
              if (response.result && response.result.success) {
                resolve(response.result);
              } else {
                reject(new Error(response.result?.error_message || 'API Error'));
              }
            } catch (e) {
              reject(new Error('Failed to parse API response'));
            }
          });
        }).on('error', (err) => {
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // ===================================================
  // Search Products
  // ===================================================
  async searchProducts(keyword, page = 1, pageSize = 20) {
    try {
      const params = {
        keywords: keyword,
        page_no: page,
        page_size: pageSize,
        sort: 'SALE_PRICE_ASC',
        fields: 'product_id,product_title,product_main_image_url,product_price,product_sales,product_rating,product_review_count'
      };

      const result = await this.makeRequest('/aliexpress.ds.product.get', params);

      // Format results
      const products = result.products || [];
      return {
        total: result.total_count || 0,
        page,
        pageSize,
        products: products.map(p => ({
          id: p.product_id,
          title: p.product_title,
          image: p.product_main_image_url,
          price: parseFloat(p.product_price),
          sales: parseInt(p.product_sales) || 0,
          rating: parseFloat(p.product_rating) || 0,
          reviews: parseInt(p.product_review_count) || 0,
          trafficLight: this.calculateTrafficLight({
            reviews: parseInt(p.product_review_count) || 0,
            rating: parseFloat(p.product_rating) || 0,
            sales: parseInt(p.product_sales) || 0
          })
        }))
      };
    } catch (error) {
      console.error('❌ Search Error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Product Details
  // ===================================================
  async getProductDetails(productId) {
    try {
      const params = {
        product_id: productId,
        fields: 'product_id,product_title,product_description,product_price,product_sales,product_rating,product_review_count,product_main_image_url,product_images'
      };

      const result = await this.makeRequest('/aliexpress.ds.product.get', params);

      if (result.products && result.products.length > 0) {
        const p = result.products[0];
        return {
          id: p.product_id,
          title: p.product_title,
          description: p.product_description,
          price: parseFloat(p.product_price),
          sales: parseInt(p.product_sales) || 0,
          rating: parseFloat(p.product_rating) || 0,
          reviews: parseInt(p.product_review_count) || 0,
          mainImage: p.product_main_image_url,
          images: p.product_images || [],
          trafficLight: this.calculateTrafficLight({
            reviews: parseInt(p.product_review_count) || 0,
            rating: parseFloat(p.product_rating) || 0,
            sales: parseInt(p.product_sales) || 0
          })
        };
      }

      throw new Error('Product not found');
    } catch (error) {
      console.error('❌ Details Error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Calculate Traffic Light Status
  // ===================================================
  calculateTrafficLight(data) {
    const { reviews, rating, sales } = data;
    let status = 'RED';
    let score = 0;

    // Review count: 3,000-7,000 is sweet spot
    if (reviews >= 3000 && reviews <= 7000) {
      score += 40;
      status = 'GREEN';
    } else if (reviews >= 1500 && reviews <= 10000) {
      score += 20;
      status = 'AMBER';
    }

    // Rating: 4.5+ is excellent
    if (rating >= 4.5) {
      score += 30;
      if (status === 'RED') status = 'AMBER';
    } else if (rating >= 4.0) {
      score += 15;
    }

    // Sales: 100+ is good
    if (sales >= 100) {
      score += 30;
      if (status === 'AMBER') status = 'GREEN';
    } else if (sales >= 50) {
      score += 15;
    }

    return {
      status,
      score: Math.min(100, score),
      recommendation: status === 'GREEN' ? 'Excellent! Ready to build' : status === 'AMBER' ? 'Research more before building' : 'Do not build'
    };
  }
}

// Export singleton instance
module.exports = new AliExpressAPI();
